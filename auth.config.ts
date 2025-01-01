import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub({
    authorization: {
      params: {
        redirect_uri: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/auth/callback/github" : "https://app.coderipple.live/api/auth/callback/github",
      },
    },
  })],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Example: Redirect to a specific URL after sign-in
      return baseUrl + '/dashboard'; // Replace with your desired path
    }
  },
} satisfies NextAuthConfig