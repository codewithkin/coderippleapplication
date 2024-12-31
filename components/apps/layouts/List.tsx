import type { App } from "@/app/dashboard/apps/page";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Chrome, Download, Eye, RotateCcw } from "lucide-react";
import Link from "next/link";

const AppComponent = ({app}: {app?: App}) => (
    <article className="w-full shadow-md rounded-md bg-white py-2 px-4 flex gap-4 items-center justify-around">
        <p>{app?.appName}</p>
        <p>{app?.framework}</p>
        <p>{app?.dateCreated.toDateString()}</p>
        {
            app?.status === "successful" ?
            <Chip className="text-white" color="success">{app?.status}</Chip> :
            <Chip color="danger">{app?.status}</Chip>
        }
        {
            app?.webAppUrl &&
                <Link href={app?.webAppUrl} target="_blank">
                    <Chip color="primary" className="hover:cursor-pointer" startContent={<Chrome />}>{app?.webAppUrl}</Chip>
                </Link>
        }
        <article className="flex gap-2  items-center">
            {
                app.status === "successful" ?
                <Button 
                as="a"  
                target="_blank" 
                rel="noreferrer"
                href={app?.apkUrl || app?.aabUrl || "#"}
                download 
                size="sm" color="primary">
                    <Download size={18} color="white" />
                </Button> :
                <Button 
                as="a"  
                target="_blank" 
                color="secondary"
                href={`/dashboard/apps/new?appId=${app?.id}`}
                size="sm" color="primary">
                    <RotateCcw size={18} color="white" />
                </Button>
            }
            <Tooltip content="View Details">
                <Link href={`/dashboard/apps/${app?.id}`} className="rounded-md" >
                    <Eye />
                </Link>
            </Tooltip>
        </article>
    </article>
)   

export default function ListView ({apps}: {apps?: App[]}) {
    return (
        <article>
            {apps && apps.length > 0 ? apps?.map(app => (
                <Link download={app?.appName} href={app?.apkUrl || "#"} className="my-4 w-full grid gap-2" key={app.id}>
                    <AppComponent key={app.id} app={app} />
                </Link>
            )) :
            <h2 className="text-xl text-gray-400 font-semibold text-center">No apps yet...</h2>
            }
        </article>
    )
}