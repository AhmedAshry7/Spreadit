import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const url = "/google/oauth";
        // const response = await apiHandler(url, "POST", {googleToken: account.access_token , remember_me: true});
        user.token = account.access_token;
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.data = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.data = token.data;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
