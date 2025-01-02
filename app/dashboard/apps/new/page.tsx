"use client";
import { App } from "@/components/my-account/Profile";
import ImageUpload from "@/components/ui/ImageUpload";
import { addNewNotification, createApp, createToken, decreaseUserCredits, findApp, getUserCredits, startCheckout, updateApp } from "@/lib/actions";
import { handlePayment } from "@/lib/handleCreditsPurchase";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import { Chrome, Github, GithubIcon, House, Newspaper, Smartphone, PencilRuler, PackageOpen, BookUser, IdCard, CalendarDays, Folder, Hammer } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewAppForm({searchParams}: {searchParams: {appId: string}}) {
    // Handle loading state
    const [loading, setLoading] = useState<boolean>(false);
    const [fileUrl, setFileUrl] = useState<string | null>();

    // If this is a retry request, get the app's id from searchParams
    // const {appId} = searchParams;

    // Get the app's data
    // const retryAppData: App = findApp(appId);

    const handleAppCreation = async (event: React.FormEvent) => {
        try {
            // Prevent the form from being cleared when submitted
            event.preventDefault();

            // Show the loading spinner and disable the button
            setLoading(true);

            // Get the user's credits
            const {credits} = await getUserCredits();
            if(!credits) await handlePayment(event);

            await decreaseUserCredits();

            // Make sure the user has credits
            if(credits < 1) {
                return toast.error("You don't have enough credits to create an app", {
                    action: <Button onClick={handlePayment} color="primary">Buy credits</Button>
                });
            }

            // Parse form data into a transferable format
            const formData = new FormData(event.target as HTMLFormElement);
            const values = Object.fromEntries(formData.entries()); 

            // TODO: Remove this
            // console.log(values);

            // Initiate a new payment
            /* const checkout = await startCheckout();

            if(checkout.status === "error") {
                return toast.error("An error occured while processing your payment, please try again.");
            } */

            // Let the user know the build process has begun
            toast.info("Build started", {
                description: "We'll let you know when we're done."
            })

            // Add the file to the values object
            values.appIconUrl = fileUrl;

            // Run the server action to create a new app db entry
            var {id, success} = await createApp(values);

            if(!success) {
                // Create a new notification
                await addNewNotification({
                    status: "unread",
                    title: "App build failed",
                    description: "Build for your app failed.",
                    type: "error",
                    action: "/dashboard/apps",
                    buildNotification: true
                });

                // Update the app's status to failed
                await updateApp(id, { status: "failed" })

                return toast.error("An error occured while creating your app")
            }

            // Send the app's data to the server
            const res = await fetch(process.env.NODE_ENV === "development" ? "http://localhost:8000/api/apps/build/" : "https://api.coderipple.live/api/apps/build/", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                } 
            })

            if(res.status === 200) {
                const data: App = await res.json();
                const {apkUrl} = data;

                // Update the app's status to success
                await updateApp(id, { status: "successful", apkUrl })

                // Create a new notification
                await addNewNotification({
                    status: "unread",
                    title: "App created successfully",
                    description: "Your app has been created successfully.",
                    type: "success",
                    action: "/dashboard/apps",
                    buildNotification: true
                });

                // Show a success toast
                return toast.success("App created successfully");
            } else {
                const data = await res.json();

                // Show an error toast
                toast.error("App build failed");

                // Create a new notification
                await addNewNotification({
                    status: "unread",
                    title: "App build failed",
                    description: "Build for your app failed.",
                    type: "error",
                    action: "/dashboard/apps",
                    buildNotification: true
                });

                // Update the app's status to failed
                await updateApp(id, { status: "failed" })
            }
        } catch (e) {
            console.log("An error occured while creating your app: ", e);

            // Show an error toast
            toast.error("An error occured while creating your app");

            // Create a new notification
            await addNewNotification({
                status: "unread",
                title: "App build failed",
                description: "Build for your app failed.",
                type: "error",
                action: "/dashboard/apps",
                buildNotification: true
            });

            // Update the app's status to failed
            await updateApp(id, { status: "failed" })
        } finally {
            setLoading(false);
        }
    }

    return (
        <form 
        className="px-4 py-4 md:py-12 w-full overflow-y-scroll"
        onSubmit={handleAppCreation}>
            <h3 className="text-xl font-semibold mb-4">Create a new project</h3>

           <ImageUpload
                setFileUrl={setFileUrl}
            />

            <article className="grid md:flex justify-between items-center gap-4 my-2">
                <Select className="my-2" 
                isRequired id="appType" name="appType" radius="sm"  startContent={<Smartphone size={20} />} color="primary" label="Android app type">
                            <SelectItem key="APK" value="APK">APK</SelectItem>
                            <SelectItem key="AAB" value="AAB">AAB</SelectItem>
                </Select>

                <Select className="my-2" 
                isRequired id="framework" name="framework" radius="sm"  startContent={<PencilRuler size={20} />} color="primary" label="Web app Framework">
                        <SelectItem key="Plain JavaScript" value="Plain JavaScript">Plain JavaScript</SelectItem>
                        <SelectItem key="React" value="React">React</SelectItem>
                        <SelectItem key="Vue" value="Vue">Vue</SelectItem>
                        <SelectItem key="Svelte" value="Svelte">Svelte</SelectItem>
                        <SelectItem key="Nuxt" value="Nuxt">Nuxt</SelectItem>
                        <SelectItem key="Angular" value="Angular">Angular</SelectItem>
                </Select>

                <Select className="my-2" 
                isRequired id="packageManager" name="packageManager" radius="sm"  startContent={<PackageOpen size={20} />} color="primary" label="Package Manager">
                        <SelectItem key="npm" value="npm">npm</SelectItem>
                        <SelectItem key="pnpm" value="pnpm">pnpm</SelectItem>
                        <SelectItem key="bun" value="bun">bun</SelectItem>
                        <SelectItem key="yarn" value="yarn">yarn</SelectItem>
                </Select>
            </article>

            <article className="grid gap-4 grid-cols-2 justify-center items-center">
                <Input
                    label="App name"
                    isRequired 
                    placeholder="An awesome app"
                    type="text"
                    labelPlacement="outside"
                    variant="faded"
                    radius="sm"
                    maxLength={16}
                    color="primary"
                    classNames={{
                        base: "md:min-w-xl",
                        input: "w-full",
                        label: "font-semibold"
                    }}
                    startContent={<BookUser color="gray" />}
                    name="appName"
                    
                />

                <Input
                    label="App ID"
                    isRequired 
                    placeholder="com.companyName.appName"
                    type="text"
                    labelPlacement="outside"
                    radius="sm"
                    variant="faded"
                    maxLength={32}
                    color="primary"
                    classNames={{
                        base: "md:min-w-xl",
                        input: "w-full",
                        label: "font-semibold"
                    }}
                    startContent={<IdCard color="gray" />}
                    name="appId"
                    
                />

                <Textarea
                    label="App description"
                    placeholder="This app helps people..."
                    type="text"
                    labelPlacement="outside"
                    radius="sm"
                    maxLength={200}
                    isRequired 
                    variant="faded"
                    color="primary"
                    classNames={{
                        base: "md:min-w-xl w-full",
                        input: "w-full",
                        label: "font-semibold"
                    }}
                    startContent={<Newspaper color="gray" />}
                    name="appDescription"
                    
                />

                <Input
                    label="Hosted app url"
                    isRequired 
                    placeholder="https://my-awesome-app.com"
                    type="url"
                    radius="sm"
                    labelPlacement="outside"
                    variant="faded"
                    color="primary"
                    classNames={{
                        base: "md:min-w-xl",
                        input: "w-full",
                        label: "font-semibold"
                    }}
                    startContent={<Chrome color="gray" />}
                    name="webAppUrl"
                    
                />

                <Input
                    label="Build Directory"
                    placeholder="dist"
                    type="text"
                    labelPlacement="outside"
                    radius="sm"
                    variant="faded"
                    isRequired 
                    color="primary"
                    classNames={{
                        base: "md:min-w-xl",
                        input: "w-full",
                        label: "font-semibold"
                    }}
                    startContent={<Folder color="gray" />}
                    name="buildDirectory"
                    
                />

                <Input
                    label="Build command"
                    placeholder="npm run build"
                    type="text"
                    radius="sm"
                    isRequired 
                    labelPlacement="outside"
                    variant="faded"
                    color="primary"
                    classNames={{
                        base: "md:min-w-xl",
                        input: "w-full",
                        label: "font-semibold"
                    }}
                    startContent={<Hammer color="gray" />}
                    name="buildCommand"
                    
                />

                <Input
                    label="Repository url"
                    placeholder="https://github.com/yourAccount/project"
                    type="url"
                    labelPlacement="outside"
                    radius="sm"
                    isRequired 
                    variant="faded"
                    color="primary"
                    classNames={{
                        base: "md:min-w-xl",
                        input: "w-full",
                        label: "font-semibold"
                    }}
                    startContent={<GithubIcon color="gray" />}
                    name="repoUrl"
                    
                />
            </article>

            <Button 
                color="primary" 
                radius="sm" className="my-2 flex gap-2" 
                type="submit"
                isLoading={loading}
            >
                Create my app
            </Button>
        </form>
    )
}