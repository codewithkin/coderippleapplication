import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Tooltip} from "@nextui-org/tooltip";
import { Info, Smartphone } from "lucide-react";
import Link from "next/link";
import {Progress} from "@nextui-org/progress";
import { App } from "@/app/dashboard/apps/page";

export default function Apps({apps}: {apps: App[]}) {
    const total = apps.length;
    const statuses = [
        "successful",
        "unsuccessful",
        "pending"
    ];

    return (
        <Card className="p-4 my-4 w-fit h-full">
            <article className="flex w-full justify-between">
                <CardHeader className=" px-0 text-lg font-semibold">App builds</CardHeader>

                <Tooltip content="The number of apps you've created">
                    <Info size={24}/>
                </Tooltip>
            </article>

            <Progress 
            showValueLabel={true}
            classNames={{
                indicator: "bg-gradient-to-r from-pink-200 to-purple-800"
            }}
            label="All builds"
            formatOptions={{ style: "decimal" }}
            aria-label="All bbuilds" value={apps.length} className="max-w-md my-2" size="md"/>

            <Progress 
            showValueLabel={true}
            label="Successful"
            formatOptions={{ style: "decimal" }}
            aria-label="Number of apps" value={apps.filter(app => app.status === "successful").length} className="max-w-md my-2" color="success" size="md"/>

            <Progress 
            showValueLabel={true}
            label="Failed"
            formatOptions={{ style: "decimal" }}
            aria-label="Number of apps" value={apps.filter(app => app.status === "failed").length} className="max-w-md my-2" color="danger" size="md"/>

            <Progress 
            showValueLabel={true}
            label="Pending"
            formatOptions={{ style: "decimal" }}
            aria-label="Number of apps" value={apps.filter(app => app.status === "pending").length} className="max-w-md my-2" color="default" size="md"/>
        </Card>
    )
}