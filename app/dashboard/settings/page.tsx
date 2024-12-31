import { Bolt, Phone } from "lucide-react";
import Link from "next/link";

export default function Settings() {
    return (
        <article className="p-4 w-full h-full overflow-y-scroll">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <p className="flex items-center gap-2 text-md text-gray-400">Edit your CodeRipple settings <Link className="text-blue-600" href="/dashboard/my-account">Profile settings</Link></p>
        
            <article className="grid grid-cols-3 items-center justify-center my-4 gap-4">
                <Link className="flex gap-4 items-center px-4 py-2 rounded-md border hover:bg-gray-300 border-gray-400" href="">
                    <Bolt size={35} />

                    <article>
                        <h4 className="font-medium">General</h4>
                        <p className="text-md text-gray-400">Change anything you don't like about coderipple</p>
                    </article>
                </Link>

                <Link className="flex gap-4 items-center px-4 py-2 rounded-md border hover:bg-gray-300 border-gray-400" href="">
                    <Phone size={30} />

                    <article>
                        <h4 className="font-medium">App settings</h4>
                        <p className="text-md text-gray-400">Default settings for all new app generations</p>
                    </article>
                </Link>
            </article>
        </article>
    )
}