import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { UserService } from 'server/services/user.service';
import { routes } from '../../../routes';
import { serverConfig } from 'config';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    secret: serverConfig.auth.secret,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'email'
                },
                name: {
                    label: 'Name',
                    type: 'text',
                    placeholder: 'Name'
                },
                metaData: {
                    label: 'MetaData',
                    type: 'text',
                    placeholder: 'JSON Meta Data Object'
                },
                lazySync: {
                    label: 'lazySync',
                    type: 'boolean',
                    placeholder: 'Lazy sync to Platform'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, { query }) {
                const { email, password, name, metaData } = credentials;
                const user = await prisma.user.findUnique({
                    where: { email }
                })
                if (!user && query.signUp === 'true') {
                    const metaObj = JSON.parse(metaData || '{}');
                    const type = metaObj?.type || 'user';
                    const [firstName, lastName] = name.split(' ');
                    const userCreate = await prisma.user.create({
                        data: {
                            email,
                            password: await hash(password, 12),
                            roqUserId: email,
                            name,
                            type,
                        },
                    })
                    const roqUser = await UserService.registerAsUser({
                        email,
                        firstName,
                        lastName,
                        reference: userCreate.id,
                    });
                    await prisma.user.update({
                        where: { id: userCreate.id },
                        data: {
                            roqUserId: roqUser?.id,
                        }
                    });
                    await UserService.addMetaData(roqUser.id, { type });
                    await UserService.welcomeUser(roqUser.id);
                    return {
                        id: userCreate.id,
                        email
                    }
                }
                if (user) {
                    const isValid = await compare(password, user.password);
                    if (!isValid) {
                        throw new Error('Wrong credentials. Try again.')
                    }
                    return user
                }
                throw new Error('Wrong credentials. Try again.')
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            const { roqUserId } = await prisma.user.findUnique({ where: { email: session.user.email } });
            return {
                ...session,
                user: {
                    ...session.user,
                    roqUserId,
                    roqToken: await UserService.createToken(roqUserId, session.expires),
                }
            }
        }
    },
    events: {
        signIn({
                   user,
                   isNewUser,
               }) {
        }
    },
    pages: {
        signIn: routes.frontend.authentication.simple,
        signOut: routes.frontend.authentication.simple,
        error: routes.frontend.authentication.simple
    },
};
export default NextAuth(authOptions);
