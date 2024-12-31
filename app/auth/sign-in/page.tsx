import Image from "next/image";

import SignInWithGithubButton from "../../../components/auth/sign-in-with-github";

import { noize } from "@/app/layout";

const imageUrl = "/images/design/galaxy.jpg";

export default function SignIn() {

    return (
        <section
        className="grid gap-4 md:flex w-screen overflow-hidden h-screen items-center justify-center"
        >
            {/* Trigger content */}
            <section
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
            className="w-1/2 h-screen"
            >
            </section>

            <section
            className="w-1/2 h-full justify-center px-20 flex flex-col"
            >
                {/* Branding */}
                <Image
                    src="/images/branding/icon.png"
                    alt="Logo"
                    width={75}
                    height={75}
                />
                
                <article>
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Welcome to <span  className={` ${noize.className} text-blue-600`}>CodeRipple</span>
                    </h2>
                    <p className="text-gray-400 text-center">Please sign in to continue</p>
                </article>

                <SignInWithGithubButton />
            </section>
        </section>
    );
}

export const dynamic = "force-dynamic"