// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/dbConnection";

export const runtime = "nodejs";         // stable crypto on Vercel
export const dynamic = "force-dynamic";  // avoid caching issues

export const authOptions = {
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // 30 days
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // ✅ Google OAuth (required for /api/auth/signin/google to resolve)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // allowDangerousEmailAccountLinking: true, // optional
    }),

    // ✅ Credentials (email OR username via "identifier")
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const rawId = (credentials?.email || credentials?.identifier || "").trim();
        const password = credentials?.password || "";
        if (!rawId || !password) return null;

        const isEmail = /^\S+@\S+\.\S+$/.test(rawId);
        const query = isEmail ? { email: rawId.toLowerCase() } : { username: rawId };

        const db = await getDb();
        const user = await db.collection("users").findOne(query);
        if (!user || !user.passwordHash) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user._id.toString(),
          name: user.name || (user.email ? user.email.split("@")[0] : "User"),
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],

  callbacks: {
    // Ensure a DB user exists for Google sign-ins; create if missing
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const db = await getDb();
        const users = db.collection("users");
        const email = profile?.email?.toLowerCase();
        if (!email) return false;

        await users.updateOne(
          { email },
          {
            $setOnInsert: {
              email,
              role: "user",
              createdAt: new Date(),
            },
            $set: {
              name: profile?.name || email.split("@")[0],
              image: profile?.picture || null,
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );
      }
      return true;
    },

    async jwt({ token, user }) {
      // On first sign-in, copy fields from returned user
      if (user) {
        token.id = user.id || token.id;
        token.email = user.email || token.email;
        if (user.role) token.role = user.role;
      }

      // If role not set (e.g., Google), fetch from DB by email
      if (!token.role && token.email) {
        const db = await getDb();
        const doc = await db.collection("users").findOne({ email: token.email.toLowerCase() });
        if (doc?.role) token.role = doc.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (!session.user) session.user = {};
      if (token?.id) session.user.id = token.id;
      if (token?.role) session.user.role = token.role;
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Keep internal redirects, default others to /products
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/products`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


