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
    apiKey: process.env.ROQ_API_KEY,
    environmentId: process.env.ROQ_ENVIRONMENT_ID
});
export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 30,
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
                const { email, password, name, lazySync, metaData } = credentials;
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
                    if (!lazySync) {
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
                    }
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
                    // roqToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3FFbnZpcm9ubWVudElkIjoiMjZkOTk1OTQtNWFiZS00MWI3LWE4ZjgtYzU0ZTYxODM5YTNkIiwicm9xVXNlcklkIjoiNGUzODQ1ZGQtNTMyNi00YWZkLWI2NzYtNzE0NTQyZmM1YTM0Iiwibm90aWZpY2F0aW9uVG9rZW4iOiJiMzE3MmNjMDFlMTk2YjY0MTI4MTdmM2YyNjdhNTljNTgyN2Q5NjBjNzRlMDZhOTc2ZDYxYmIwYjRkOTYxZDc2NGYyNDM2ZWNiMzk2YmE0OWRkZDZlYWI2MTNmZmU5NmYwZDM5Nzk5MGE2ZWY4ZGVhNGUyYjZkNDkzNWY4Y2ZlYmRjMmZlZGM0NjNlNGY4MGFiOGEwNzAyNGQ0OTQ0ZmY0YzA3YWVlMDhiYWIxYTRkMWI4YjdkZTFlNWJhYmJlNTg0M2VkZTczMGFkOWEzNDdkYzU3MWZjYTQxODRiZGJjMGIyOGJmZjAxOWM2NmJmYjM5OTc3YTg1YTYzNGUwNzUzNGNjY2UxN2YyN2ZmZGZhMzdjOGE2MjhhNjI3YWEzNzdiZjZmMjE3NmMxY2FlN2I0ZTdlZWI3MDg1M2NlOTZkMmFkODg5ZWIwNGI1NjFkM2U4M2FjNGI3NmIxMmFiMGY1MzIzZDFmOTA0NmY4MWU4YzAwOTg3OWI5MzYzMDA2ZDNkNGYyZDdhODcxODJiNzNmZjJhNTgyMTkwOTE2ZmVhZDE2MWY3NzkyZWI4MmNiNjUzMDUyMjM5YTIzODRmOTlmYjNiZGU2ZjFiMzMxYjQwN2M3YjYyYTJmMTBlNDY5YjdiMzA2MWZlNDYxZTliMWRiMGI4Y2YzMTMwNWJhMTIyZTk3NTQ1NjAzYjA0ZmY4NmRkOWFjY2MwOTU3MzBiYTM3NTMyODFkMTMwZTBhZWYzMTNmY2Y2OTQzOGM4OTU0YzE5NjMwYTg4ODFlYWViMjA0MmZhMzM5OTQwYTNjMmY1MjQ3ZmRlNzEyOGEzNTgzMjE5ODc3ZTFhYjY0ZjQ1NmI4NmFjYzIxOGVhOTBkOGM0OWQxZTMxMzM0YzFjOWE5ZGIxZDhlZmY2N2E1NGE5M2RhN2QwN2Q0NGI2NjY0NzdlNTEwNTgxYzQ4MjkwY2Y3YTA0ZTQ0ODE3MDk3YjRlZTAzMzQ1Mzg5YWRjMTkyMWEzMmQxOWFiMjNiMTIxMzQ2ZjhmZjY4OTA4ZjBjMWYxODdjYjMyMTA3MjRlNTYzNDk1MGU0MTYxMTM4OGJiOWI2MDFlYjJkODdiNjNmMmMyNDQxNjgyMjkxNDVjZDk3ZDYxOWUzODU2NmU2ODZiMDE2MjE1OWEyOWViZmRjMGVjYzk0ZGE3NWE5ZmE0YThmZDhiMDNhYzMwOGJjOWY1ZjFiZGUyMmM0ZTU1OTZhNzI3MGZhMWQwZTk0MzRjMDliNmU5NzhiYzEzZjRkMmQ0NWNjMTF8Y2U5OTA2OWQxMTUyZmI4M2I5MzIwY2FjNjQxN2U0MjQiLCJ0ZW5hbnRJZCI6IjdmOGVjNDljLTVkMDUtNDQ0OS1iMDgxLTYwNzY0NDJlMWNkOCIsImlhdCI6MTY3NzA2MDM4OCwiZXhwIjoxNjc5NjUyMzg4fQ.w7zmKqyVup8FbGHQx4tzrI8YRvlS7mSHqTgBFFfRHao',
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
