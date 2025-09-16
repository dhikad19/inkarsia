import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import { appendFileSync } from "fs";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        console.log("Login attempt:");
        console.log("Input password:", credentials.password);
        console.log("DB hash:", user.password);

        if (!user) {
          console.log("❌ User not found:", credentials.email);
          appendFileSync(
            "log.txt",
            `Login failed: user not found - ${credentials.email}\n`
          );
          return null;
        }

        const isValid = await user.comparePassword(credentials.password);
        console.log("✅ Password match:", isValid);
        appendFileSync("log.txt", `Password valid: ${isValid}\n`);

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
