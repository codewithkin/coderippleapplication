import { prisma } from "@/prisma";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { App } from "@prisma/client";
import Image from "next/image";

export default async function SingleApp ({params}: {params: {slug: string}}) {
    // Get appId from query params
    const { slug } = params;

    // Get the app's data using the id
    const app: App = await prisma.app.findUnique({
        where: {
            id: slug
        }
    });

    if(!app) return new Error("App not found");

    const { appName, appDescription, appIconUrl, webAppUrl, apkUrl, aabUrl, status, dateCreated } = app;

    return (
        <article className="p-10 flex flex-col justify-center items-center h-screen w-screen">
            <Image
                src={appIconUrl || "/images/branding/icon.png"}
                width={75}
                height={75}
                alt={`${appName} icon`}
            />
            <article className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold text-center uppercase">{ appName }</h2>
                <p className="text-gray-400">{ appDescription }</p>
                <article className="flex gap-2 items-center justify-center">
                    <Chip 
                    radius="full"
                    color={
                        status === "pending" ? "warning" : status === "successful" ? "success" : "danger"
                    }>{status}</Chip>
                    <Chip 
                    radius="full"
                    color="secondary">{ dateCreated.toDateString() }</Chip>
                </article>
                {
                    status === "successful" ?
                    <Button 
                    as={"a"} 
                    color="primary" 
                    href={apkUrl || aabUrl || "#"}
                    radius="full"
                    className="my-2"
                    target="_blank" 
                    rel="noreferrer"
                    download
                    >
                        Download APK
                    </Button> :
                    <Button 
                    as="a"
                    color="secondary" 
                    href={`/dashboard/apps/new?appId=${app?.id}`}
                    radius="full"
                    className="my-2"
                    >
                        Retry build
                </Button>
                }
            </article>
        </article>
    )
}