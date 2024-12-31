import { auth } from "@/auth";
import AppsData from "@/components/apps/AppsData";
import { prisma } from "@/prisma";

export type App = {
    id: string;
    appName: string;
    dateCreated: Date;
    apkUrl: string | null;
    aabUrl: string | null;
    appIconUrl: string | null;
    appDescription: string | null;
    webAppUrl: string | null;
    status: string | boolean | "pending" | "successful" | "unsuccessful";
    framework: string | null;
    userId: string;
}

export default async function Apps() {
    const session = await auth();
    if(!session || !session.user) return null;
    const id = session.user.id

    // Get the apps belonging to the current user
    const apps: App[] = await prisma.app.findMany({where: {userId: id}})
    
    return (
        <article className="p-4 w-full h-full overflow-y-scroll">
            <h3 className="text-2xl font-semibold">App data</h3>

            <AppsData apps={apps} />
        </article>
    )
}