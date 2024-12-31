import { auth } from "@/auth";
import Profile from "@/components/my-account/Profile";
import { prisma } from "@/prisma";
import { ScatterPointItem } from "recharts/types/cartesian/Scatter";

export default async function MyAccount() {
    // Create a user type on the Session object
    type User = {
        name: string;
        email: string;
        image: string;
    }

    // Get the user's session
    const {user} = await auth();
    const email = user.email;

    // Check if the user is authenticated
    if (!user) {
        return (
            <article className="p-4 w-full h-full overflow-y-scroll">
                <h1>Not authenticated</h1>
            </article>
        )
    }

    return (
        <article className="p-4 w-full h-full overflow-y-scroll">
            <Profile email={email} />
        </article>
    )
}