import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Create a new app",
}

export default function RootMainLayout({children}: {children: ReactNode}) {
    return children
}