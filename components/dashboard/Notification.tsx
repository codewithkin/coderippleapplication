import Link from "next/link";
import { notification } from "./NotificationsDrawer";
import { AlertCircle, CheckIcon, TriangleAlert } from "lucide-react";

export default function NotificationView ({type, title, status, action, description}: notification) {
        return (
            <Link href={action} className={` ${status === "unread" && "bg-gray-200" } flex gap-4 items-center p-2`}>
                {
                    type === "error" ?
                    <article className="p-2 rounded-full text-white bg-red-600">
                        <TriangleAlert />
                    </article> :
                    type === "success" ?
                    <article className="p-2 rounded-full text-white bg-green-500">
                        <CheckIcon />
                    </article> :
                    <article className="p-2 rounded-full text-gray-400 bg-white shadow-xl">
                        <AlertCircle />
                    </article>
                }

                <article className="">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-gray-500 font-light">{description}</p>
                </article>
            </Link>
        )
}