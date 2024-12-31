import { Polar } from '@polar-sh/sdk'

export const api = new Polar({
  accessToken: "polar_pat_s2buRibXSSjYTCmhh-LaWsda7777dnlUssOg36YQCbc",
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox", // Use this option if you're using the sandbox environment - else use 'production' or omit the parameter
})