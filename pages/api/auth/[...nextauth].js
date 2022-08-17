import NextAuth from "next-auth";
// import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    bookMark: "/auth/bookmarks",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.username = session.user.email.split("@")[0];
      session.user.uid = token.sub;
      return session;
    },
  },
});
