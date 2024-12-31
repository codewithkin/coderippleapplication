import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { redirect } from "next/dist/server/api-utils"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub({
    authorization: {
      params: {
        redirect_uri: "https://app.coderipple.live/api/auth/callback/github",
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