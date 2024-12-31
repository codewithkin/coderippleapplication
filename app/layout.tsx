import "@/styles/globals.css";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "./providers";
import localFont from "next/font/local";
import  { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: "400"
})

export const noize = localFont({
    src: "../fonts/NoizeSportFreeVertionRegular-MVwye.ttf",
    variable: "--font-noize",
    weight: "500"
});


const metadata: Metadata = {
  title: "CodeRipple",
  description: "Turn your web apps into fully functional mobile apps with the click of a button."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className=""
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <main className="overflow-hidden">
              {children}
            </main>
        </Providers>
        <Toaster closeButton richColors/>
      </body>
    </html>
  );
}
