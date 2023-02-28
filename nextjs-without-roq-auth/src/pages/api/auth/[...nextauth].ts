import NextAuth from 'next-auth'
import { Platform } from '@roq/nextjs';
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import * as process from 'process';
import { routes } from '../../../routes';

const prisma = new PrismaClient();
const platform = new Platform({
    host: process.env.ROQ_PLATFORM_URL,
    apiKey: process.env.ROQ_API_KEY,
    environmentId: process.env.ROQ_ENVIRONMENT_ID
});
export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
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
            async authorize(credentials) {
                const { email, password, name, metaData } = credentials;
                const user = await prisma.user.findUnique({
                    where: { email }
                })
                if (!user && name) {
                    const [firstName, lastName] = name.split(' ');
                    const userCreate = await prisma.user.create({
                        data: {
                            email,
                            password: await hash(password, 12),
                            roqUserId: email                                                                                                                                                                                                                                                                                                                                                                                                                                     ,
                            name,
                        },
                    })
                        const roqUser = await platform.asSuperAdmin().createUser({
                            user: {
                                email,
                                firstName,
                                lastName,
                                isOptedIn: true,
                                active: true,
                                locale: 'en-US',
                                reference: userCreate.id,
                            }
                        });
                        await prisma.user.update({
                            where: { id: userCreate.id },
                            data: { roqUserId: roqUser?.createUser?.id }
                        });
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
            const rightNow = new Date();
            const expires = new Date(session.expires);
            const expiry = Math.abs((expires.getTime() - rightNow.getTime()) / 1000);
            const { roqUserId } = await prisma.user.findUnique({ where: { email: session.user.email } });
            return {
                ...session,
                user: {
                    ...session.user,
                    roqToken: await platform.authorization.createUserToken(roqUserId, `${expiry}s`),
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
    }
});
