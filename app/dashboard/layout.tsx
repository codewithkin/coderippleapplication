import NavBar from "@/components/navbar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Your dashboard",
}

export default function RootMainLayout({children}: {children: ReactNode}) {
    return (
        <section className="md:flex h-screen">
            <NavBar />
            {children}
        </section>
    )
}