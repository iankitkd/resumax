import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import { prisma } from "@/lib/prisma"
import { signinSchema } from "@/lib/validators";
import { getUserByEmail } from "@/actions/user";
import { verifyPassword } from "@/lib/password";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signinSchema.parseAsync(credentials);

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isValid = await verifyPassword(password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub
      }
    }),
  },
})