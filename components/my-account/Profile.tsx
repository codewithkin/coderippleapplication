import { poppins } from "@/app/layout";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Contact, DoorOpen, LogOut, Mail, Pencil, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { prisma } from "@/prisma";
import { signOut } from "@/auth";
import Logout from "../auth/Logout";
import { deleteUser, getUser } from "@/lib/actions";
import DeleterUser from "./DeleteUser";

// Create an app type
export type App = {
    id: string;
    appName: string;
    dateCreated: Date;
    apkUrl: string | null;
    aabUrl: string | null;
    appIconUrl: string | null;
    appDescription: string | null;
    webAppUrl: string | null;
    status: string | boolean | "pending" | "successful" | "failed";
    framework: string | null;
    userId: string | undefined;
}

export default async function Profile() {
    const user = await getUser();
    if(user === undefined) return null;

    // Destructure the necessary fields from the user
    const {image, name, createdOn, credits, totalSpent, email} = user;

    // Get all of the user's apps
    const apps = await prisma.app.findMany({where: {userId: user.id}});

    // TODO: Delege
    // Get all of the apps (testing purposes)
    const ap = await prisma.app.findMany();

    //  Create a fallback for the profile picture 
    const fallBack = email[0];

    // Calculate the days since signup
    const currentDate = new Date();
    console.log(user);
    const daysSinceSignUp = createdOn.getDate() - currentDate.getDate()

    return (
        <article className={`${poppins.className}`}>
            <article className="flex gap-4 items-center w-full justify-between">
                <article className="flex gap-2 items-center">
                        {/* Avatar */}
                        <Avatar color="blue">
                            <AvatarImage src={image || "https://wallpapercave.com/uwp/uwp4417165.jpeg"} />
                            <AvatarFallback>{fallBack}</AvatarFallback>
                        </Avatar>

                        {/* Name and email */}
                        <article className="grid">
                            <h2 className="text-xl font-semibold">{name}</h2>
                            <p className="text-gray-400 flex gap-1 items-center">
                                <Mail />
                                {email}
                            </p>
                        </article>
                </article>

                {/* Status */}
                <article className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-full">
                    <h4>Status: </h4>

                    <article className="flex items-center gap-1 text-green-500">
                        <article className="w-4 h-4 rounded-full bg-green-500"></article>
                        <p>Systems Online</p>
                    </article>
                </article>
            </article>

            <article className="flex gap-1 items-center">
                <Logout />
                <DeleterUser />
            </article>

            <Divider 
                className="my-2"
            />

            <article className="grid gap-4 py-6 ">
                <article className="grid grid-cols-2 items-center">
                    <p className="text-gray-400">Email</p>

                    <article className="flex gap-2 items-center">
                        <Mail />
                        <p>{email}</p>
                    </article>
                </article>

                <article className="grid grid-cols-2 items-center">
                    <p className="text-gray-400">Name</p>

                    <article className="flex gap-2 items-center">
                        <Contact />
                        <p>{name}</p>
                    </article>
                </article>
            </article>

            <Divider 
                className="my-2"
            />

            <article className="flex gap-16 justify-around py-6">
                <article className="grod gap-2">
                    <h5 className="text-gray-400">Total Apps</h5>
                    <p className="text-2xl font-semibold">{apps?.length}</p>
                </article>

                <article className="grod gap-2">
                    <h5 className="text-gray-400">Total Amount Spent</h5>
                    <p className="text-2xl font-semibold">${totalSpent}</p>
                </article>

                <article className="grod gap-2">
                    <h5 className="text-gray-400">Days since sign-up</h5>
                    <p className="text-2xl font-semibold">{daysSinceSignUp}</p>
                </article>

                <article className="grod gap-2">
                    <h5 className="text-gray-400">Credits</h5>
                    <p className="text-2xl font-semibold">{credits}</p>
                </article>
            </article>

            <Divider 
                className="my-2"
            />
        </article>
    )
}