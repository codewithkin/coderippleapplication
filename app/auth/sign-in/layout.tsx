import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Sign in",
}

export default function RootMainLayout({children}: {children: ReactNode}) {
    return children
}