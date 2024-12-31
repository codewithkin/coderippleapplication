"use client";
import { Tooltip } from "@nextui-org/tooltip";
import { IdCard, LayoutList, Sheet } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import AppsTableView from "./layouts/Table";
import { App } from "@/app/dashboard/apps/page";
import ListView from "./layouts/List";
import Link from "next/link";
import { Filter, Plus, Search } from "lucide-react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import { Divider } from "@nextui-org/divider";
import CardsView from "./layouts/Card";

export default function AppsData({apps}: {apps: App[]}) {
    const [appData, setAppData] = useState<App[]>(apps);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<"table" | "list" | "card">("table");
    const [viewComponent, setViewComponent] = useState<ReactNode>(<AppsTableView apps={appData} />);

    const search = (e: any) => {
        e.preventDefault()
        setAppData(apps?.filter(app => app.appName.toLowerCase().includes(searchTerm.toLowerCase())))
    }

    const getView = () => {
        switch(view) {
            case "table":
                return setViewComponent(<AppsTableView apps={appData} />)
            case "list":
                return setViewComponent(<ListView apps={appData} />)
            case "card":
                return setViewComponent(<CardsView apps={appData} />)
        }
    }

    return (
        <article className="my-4">
            {/* Controls */}
            <article className="flex w-full justify-between">
                <h3 className="text-gray-500 text-lg font-semibold">All apps</h3>

                {/* Change layout from table to grid to list */}
                <article className="flex gap-2 text-gray-400">
                    <Tooltip content="Table View">
                        <Sheet onClick={() => setViewComponent(<AppsTableView apps={appData} />)} />
                    </Tooltip>
                    <Tooltip content="List View">
                        <LayoutList onClick={() => setViewComponent(<ListView apps={appData} />)} />
                    </Tooltip>
                    <Tooltip content="Card View">
                        <IdCard onClick={() => setViewComponent(<CardsView apps={appData} />)} />
                    </Tooltip>
                </article>
            </article>
            
            <article>
            {/* Search and selection controls */}
            <article className="flex justify-between items-center w-full">
                {/* Search Bar */}
                <form className="flex gap-2 w-full" onSubmit={search}>
                    <Input 
                        startContent={<Search size={18} />}
                        value={searchTerm}
                        type="search"
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                        color="primary"
                        className="md:max-w-xl min-w-sm"
                        placeholder="Search" />
                        <Button className="bg-primary text-white" color="primary" type="submit"><Search size={18} /></Button>
                </form>

                {/* Controls */}
                <article className="flex gap-2 w-full items-center justify-end">
                <Popover placement="right">
                <PopoverTrigger>
                <Button>
                    <Filter size={18}/>
                    Filter
                </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <div className="text-small font-bold">Filter Options</div>
                        <Divider />

                        <Accordion>
                            <AccordionItem key="1" aria-label="Status" title="Status">
                            <article onClick={() => setAppData(apps)} className="flex gap-2 w-full justify-between items-center hover:cursor-pointer">
                                    <article className="w-2 h-2 bg-purple-500 rounded-full">
                                    </article>

                                    <p className="hover:cursor-pointer">All</p>
                                </article>
                                <article onClick={() => setAppData(apps?.filter(app => app.status === "successful"))} className="flex gap-2 w-full justify-between items-center hover:cursor-pointer">
                                    <article className="w-2 h-2 bg-green-500 rounded-full">
                                    </article>

                                    <p className="hover:cursor-pointer">Successful</p>
                                </article>
                                <article onClick={() => setAppData(apps?.filter(app => app.status === "unsuccessful"))} className="flex gap-2 w-full justify-between items-center">
                                    <article className="w-2 h-2 bg-red-500 rounded-full">
                                    </article>

                                    <p className="hover:cursor-pointer">Unsuccesful</p>
                                </article>
                                <article onClick={() => setAppData(apps?.filter(app => app.status === "pending"))} className="flex gap-2 w-full justify-between items-center">
                                    <article className="w-2 h-2 bg-gray-500 rounded-full">
                                    </article>

                                    <p className="hover:cursor-pointer">Pending</p>
                                </article>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </PopoverContent>
                </Popover>

                    <Link className="bg-blue-500 text-white rounded-md py-2 px-4 flex gap-2" href="/dashboard/apps/new">
                        Add New
                        <Plus />
                    </Link>
                </article>
            </article>

            {/* View Component */}
            {viewComponent}
            </article>
        </article>
    )
}