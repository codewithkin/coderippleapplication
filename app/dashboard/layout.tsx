import NavBar from "@/components/navbar";
import { ReactNode } from "react";

export default function RootMainLayout({children}: {children: ReactNode}) {
    return (
        <section className="md:flex h-screen">
            <NavBar />
            {children}
        </section>
    )
}