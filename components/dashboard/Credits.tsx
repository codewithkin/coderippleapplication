import { Button } from "@nextui-org/button";
import Purchase from "./Purchase";
import { getUserCredits } from "@/lib/actions";

export default async function Credits () {
    // Get the user's credits
    const {credits} = await getUserCredits()

    if(!credits) return null;

    if(credits === 0) {
        return (
            <article className="p-2 text-white font-semibold w-full bg-orange-400 mb-2">
                <p className="flex gap-2 items-center justify-center ">You don't have any credits <Purchase /></p>
            </article>
        )
    }

    else if(credits > 0 && credits < 5) {
        return (
            <article className="p-2 text-white font-semibold w-full bg-orange-400 flex gap-2 items-center justify-center mb-2">
                <p className="flex gap-2 items-center justify-center ">You're running low on credits <Purchase /></p>
            </article>
        )
    }

    else if(credits > 5) {
        return (
            <article className="p-2 text-white font-semibold w-full bg-green-500 flex gap-2 items-center justify-center mb-2">
                <p className="flex gap-2 items-center justify-center ">Your credits: {credits} <Button as={"a"} color="primary" href="/dashboard/apps/new">Create an app</Button></p>
            </article>
        )
    }
}