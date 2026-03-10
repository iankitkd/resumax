import type { NextAuthConfig } from "next-auth";

const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  providers: [],
} satisfies NextAuthConfig;

export default authConfig;
