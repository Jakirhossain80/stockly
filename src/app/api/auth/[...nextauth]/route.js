// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/dbConnection";

export const runtime = "nodejs";         // stable crypto on Vercel
export const dynamic = "force-dynamic";  // avoid caching issues

export const authOptions = {
  pages: { signIn: "/login" }, // custom login page
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // 30 days
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // Your UI may send either "email" or "identifier" (email/username)
        email: { label: "Email", type: "email" },
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Accept both shapes: { email, password } OR { identifier, password }
        const rawId = (credentials?.email || credentials?.identifier || "").trim();
        const password = credentials?.password || "";
        if (!rawId || !password) return null;

        // Normalize email if it looks like one
        const isEmail = /^\S+@\S+\.\S+$/.test(rawId);
        const query = isEmail
          ? { email: rawId.toLowerCase() }
          : { username: rawId };

        const db = await getDb();
        const user = await db.collection("users").findOne(query);

        if (!user || !user.passwordHash) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always land on /products after sign-in/sign-out unless an internal path is given
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/products`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
