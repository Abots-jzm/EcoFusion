import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env";
import { db } from "@/server/db";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("Please enter email and password");

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user?.hashedPassword)
          throw new Error("Incorrect username or password");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!passwordMatch) throw new Error("Incorrect username or password");

        const { hashedPassword, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: env.NODE_ENV === "development",
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    signIn: "/login",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
