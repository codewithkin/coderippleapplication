import { App } from "@/app/dashboard/apps/page";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Chip} from "@nextui-org/chip";
import Image from "next/image";
import { useCallback, useState } from "react";
import { redirect } from "next/navigation";


export default function AppsTableView ({apps}: {apps?: App[]}) {
    // Create columns
    const columns = [
        { name: "appName", uid: "appName" },
        { name: "framework", uid: "framework" },
        { name: "dateCreated", uid: "dateCreated" },
        { name: "status", uid: "status" },
    ]

    // Function to render custom rows
    const renderCell = useCallback((app: App, columnKey: number | string) => {
        const cellValue = app[columnKey as keyof App];

        switch (columnKey) {
            case "appName":
                return (
                    <h3 >{app.appName}</h3>
                )
            case "framework":
                switch (app.framework) {
                    case "React":
                        <Image
                            src="/icons/react.svg"
                            alt="React"
                            width={30}
                            height={30}
                        />
                    case "Vue":
                        <Image
                            src="/icons/vue.svg"
                            alt="Vue"
                            width={30}
                            height={30}
                        />
                    case "Svelte":
                        <Image
                            src="/icons/svelte.svg"
                            alt="Svelte"
                            width={30}
                            height={30}
                        />
                    case "Angular":
                        <Image
                            src="/icons/angular.svg"
                            alt="Angular"
                            width={30}
                            height={30}
                        />
                    default:
                        return cellValue
                }
            case "dateCreated":
                return (
                    <h3 >{app.dateCreated.toString()}</h3>
                )
            case "status":
                switch (app.status) {
                    case "successful":
                        return (
                            <Chip className="text-white text-sm" radius="full" color="success">Successful</Chip>
                        )
                    case "failed":
                        return (
                            <Chip radius="full" color="danger">Unsuccessful</Chip>
                        )
                    case "pending":
                        return (
                            <Chip radius="full" color="default">Pending</Chip>
                        )
                    default: 
                        return cellValue;
                }
            default:
                return cellValue;
        }
    }, [apps]);

    const selected = (e: any) => {
        console.log(e)
    }

    return (
        <article className="grid gap-2 my-2">
            <Table className="my-2" selectionMode="multiple" onSelect={selected} aria-label="Apps in a table format">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.name}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent="No apps found" items={apps}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell onClick={() => redirect(`/dashboard/apps/app/${id}`)} onSelect={selected}>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </article>
    )
}