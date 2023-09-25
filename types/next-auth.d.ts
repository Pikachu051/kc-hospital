import NextAuth from "next-auth"
import { UserRole } from ".prisma/client"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        firstName: string,
        lastName: string,
        role: UserRole
    }
    interface Session {
        user: User & {
            firstName: string,
            lastName: string,
            role: UserRole
        }
        token: {
            firstName: string,
            lastName: string,
            role: UserRole
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT{
        firstName: string,
        lastName: string,
        role: UserRole
    }
}