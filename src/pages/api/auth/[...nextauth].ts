import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { syncUser } from "@/lib/weavy";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials, _) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        if (!username || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        // sync user data to Weavy
        await syncUser({id: user.id, name: user.name, email: user.email})
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {                  
        if (user){          
          token.id = user.id;
        } 
        return token;
    },
    async session({ session, token, user }) {            
      session.user.id = token.id;                  
      return session;
    }
  },

});