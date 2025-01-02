import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "App information",
}

export default function RootMainLayout({children}: {children: ReactNode}) {
    return children
}