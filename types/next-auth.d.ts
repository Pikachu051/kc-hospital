import NextAuth from "next-auth"
import { UserRole } from ".prisma/client"

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