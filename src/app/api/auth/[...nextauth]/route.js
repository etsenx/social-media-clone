import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  site: process.env.NEXTAUTH_URL || "http://localhost:3000",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await UserModel.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/auth/auth2/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      // Check if the user exists
      let existingUser = await UserModel.findOne({ email: profile?.email });

      if (!existingUser) {
        // If user doesn't exist, create a new user entry
        existingUser = await UserModel.create({
          email: profile?.email,
          name: profile?.name || profile?.login,
          oauthProviders: {
            [account.provider]: {
              id: profile?.sub || profile?.id,
              token: account?.access_token,
            },
          },
        });
      } else {
        // If user exists, update the OAuth provider details if necessary
        if (!existingUser.oauthProviders[account.provider]) {
          existingUser.oauthProviders[account.provider] = {
            id: profile?.sub || profile?.id,
            token: account?.access_token,
          };
          await existingUser.save();
        }
      }

      // If the user does not have a password set, return a flag
      if (!existingUser.password) {
        user.needsPasswordSetup = true;
      }

      return true;
    },
    async jwt({ token, account }) {
      if (user?.needsPasswordSetup) {
        token.needsPasswordSetup = true;
      }

      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token?.needsPasswordSetup) {
        session.needsPasswordSetup = true;
      }

      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
