import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt";
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    
    interface Session {
        user: {
            /** The user's id. */
            id: string | number
        } & DefaultSession["user"]
    }

    interface User {      
        id: string | number        
      }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {      
      id: number | string      
    }
  }