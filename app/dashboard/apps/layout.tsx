import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Your Apps",
}

export default function RootMainLayout({children}: {children: ReactNode}) {
    return children
}