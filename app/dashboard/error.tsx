"use client";

import { Button } from "@nextui-org/button";

export default function ErrorComponent ({refresh}: {refresh: () => void}) {
    return (
        <article className="p-4 w-screen h-screen overflow-y-scroll flex flex-col justify-center items-center">
            <h3 className="text-2xl font-semibold">An error occured</h3>
            <p className="text-gray-500 text-sm">Something went wrong, please refresh the page</p>
            <Button color="primary" onClick={refresh}>Refresh</Button>
        </article>
    )
}