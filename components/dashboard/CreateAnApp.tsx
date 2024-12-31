import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";

export default function CreateAnApp() { 
    return (
        <Card
        className="bg-gradient-to-tr from-pink-500 to-purple-900 text-white py-4 md:px-8 px-4 my-4 md:max-w-lg"
        >
            <CardHeader className="text-xl font-semibold p-0">Let's get started</CardHeader>
            <CardBody className="p-0">
                <p>CodeRipple uses your web app's code to create a mobile app that you can deploy to the Google playstore or install on your own device. Click the button below to create a new mobile app.</p>
            </CardBody>

            <article className="flex gap-2 items-center">
                <Link 
                className="font-semibold bg-white text-slate-700 rounded-md py-2 px-4 mt-2 max-w-fit "
                href="/dashboard/apps/new">
                    Create a new app
                </Link>
                <Link 
                className="font-semibold border-2 text-white border-white  rounded-md py-2 px-4 mt-2 max-w-fit"
                href="/dashboard/apps">
                    View existing apps
                </Link>
            </article>
        </Card>
    )
}