import { App } from "@/app/dashboard/apps/page";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";

function AppCard ({app}: {app: App}) {
    return (
        <Card  className="text-center grid">
            <CardHeader className="text-xl font-semibold">
                {app.appName}
            </CardHeader>
            <CardBody>
                <Chip className={app.status === "successful" || app.status === "failed" ? "text-white" : "text-black"} color={app.status === "successful" ? "success" : app.status === "failed" ? "danger" : "default"}>
                    {app.status}
                </Chip>
                <p className="text-gray-400">{app.appDescription}</p>

                <article className="grid gap-1 mt-2">
                    {
                        app.status === "successful" ?
                        <Button
                            as="a"
                            download
                            radius="lg"
                            target="_blank"
                            href={app.apkUrl || app.apkUrl || "#"}
                        >Download</Button> :
                        <Button
                        as="a"
                        radius="lg"
                        color="primary"
                        target="_blank"
                        href={`/dashboard/apps/new?appId=${app.id}`}
                        >Retry Build</Button>
                    }

                    <Link 
                    className="bg-sky-400 rounded-lg hover:bg-sky-600 transition duration-500 text-white font-semibold flex justify-center items-center py-2"
                    href={`/dashboard/apps/${app.id}`}>
                        View Details
                    </Link>
                </article>
            </CardBody>
        </Card>
    )
}

export default function CardsView ({apps}: {apps: App[]}) {

    return (
        <article className="grid md:grid-cols-4 gap-4 my-8">
            {
                apps.length > 0 ? apps.map(app => (
                    <AppCard app={app} />
                )) :
                <h2 className="text-xl text-gray-400 font-semibold text-center">No apps yet</h2>
            }
        </article>
    )
}