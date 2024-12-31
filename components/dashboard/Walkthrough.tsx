import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Newspaper, Youtube } from "lucide-react";
import Link from "next/link";

export default function Walkthroughs() { 
    return (
        <Card
        shadow="lg"
        className=" text-black py-4 md:px-8 px-4 my-4 md:max-w-lg"
        >
            <CardHeader className="text-xl font-semibold p-0">Having trouble getting started ?</CardHeader>
            <CardBody className="p-0">
                <p className="text-gray-500">Check out the CodeRipple Youtube channel. We have a ton of video walkthroughs to help you get started.</p>
            </CardBody>

            <article className="flex gap-2 items-center">
                <Link 
                className="font-semibold bg-red-600 text-white rounded-md py-2 px-4 mt-2 max-w-fit flex gap-2 items-center"
                href="youtube.com">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                    Youtube
                </Link>
                <Link 
                className="font-semibold text-white bg-black  rounded-md py-2 px-4 mt-2 max-w-fit flex gap-2 items-center"
                href="/dashboard/apps">
                    <Newspaper />
                    Blog
                </Link>
            </article>
        </Card>
    )
}