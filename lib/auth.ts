import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt'
    },
    pages: {
      signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",

          credentials: {
            username: { label: "ชื่อผู้ใช้", type: "text", placeholder: "Username" },
            password: { label: "รหัสผ่าน", type: "password", placeholder: "Password"}
          },
          async authorize(credentials) {
            if (!credentials?.username || !credentials?.password){
              return null;
            }

            const existingUser = await db.user.findUnique({
              where: { username: credentials?.username }
            });
            if (!existingUser) {
              return null;
            }

            const passwordMatch = await compare(credentials.password, existingUser.password);

            if (!passwordMatch) {
              return null;
            }

            return {
              id: `${existingUser.id}`, // or id: existingUser.id + '' to turn it to strings.
              username: existingUser.username,
              firstName: existingUser.firstName,
              lastName: existingUser.lastName,
            }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            return {
              ...token,
              firstName: user.firstName
            }
          }
          return token
        },
        async session({ session, token }){
          return {
            ...session,
            user: {
              ...session.user,
              firstName: token.firstName
            }
          }
        },
      }
}