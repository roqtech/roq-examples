import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session extends DefaultSession{
        user: {
            roqUserId: string,
            roqToken: string
        } & DefaultSession["user"]
    }
}
