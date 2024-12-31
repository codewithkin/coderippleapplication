"use server";
import { App } from "@/app/dashboard/apps/page";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { Polar } from "@polar-sh/sdk";
import { redirect } from "next/navigation";
import { notification } from "@/components/dashboard/NotificationsDrawer";
import { auth, signOut } from "@/auth";

export async function signUserOut () {
    try {
        await signOut();

        // Redirect to the signin page
        redirect("/auth/signin");
    } catch (e) {
        console.log("An error occured while signing out: ", e);
    }
}

export async function deleteUser () {
    try {
        const session = await auth();
        const {email} = session?.user;

        await prisma.user.delete({
            where: {
                email
            }
        });

        await signUserOut();
    } catch (e) {
        console.log("An error occured while deleting user: ", e);
    }
}

export async function findToken (checkoutId: string) {
    try {
        const token = await prisma.token.findFirst({
            where: {
                token: checkoutId
            }
        });

        return token;
    } catch (e) {
        console.log("An error occured while finding token: ", e);  

        return;
    }
}

export async function findApp (id: string) {
    try {
        const app = await prisma.app.findFirst({
            where: {
                id
            }
        });

        return app;
    } catch (e) {
        console.log("An error occured while finding app: ", e);

        return;
    }
}

export async function updateTotalSpent (amount: number) {
    try {
        const session = await auth();
        const {email} = session?.user;

        await prisma.user.update({
            where: {
                email
            },
            data: {
                totalSpent: {
                    increment: amount
                }
            }
        })
    } catch (e) {
        console.log("An error occured while updating total spent: ", e);

        return;
    }
}

export async function createToken (checkoutId: string) {
    try {
        const session = await auth();

        await prisma.token.create({
            data: {
                token: checkoutId,
                used: false,
                userId: session?.user?.id,
                user: {
                    connect: {
                        email: session?.user?.email
                    }
                }
            }
        })

        return true
    } catch (e) {
        console.log("An error occured while creating token: ", e);

        return;
    }
}

export async function updateCredits (increment: number, checkoutId: string, tokenId?: string) {
    if(!tokenId) return false;

    try {
        const session = await auth();
        const email = session?.user?.email;

        if(!email) return;

        // Verify token is not used
        const token = await prisma.token.findFirst({
            where: {
                token: tokenId
            }
        });

        console.log("Is the token used :", token?.used);

        if (token?.used) {
            return false;
        }

        await prisma.user.update({
            where: {
                email
            },
            data: {
                credits: {
                    increment
                }
            }
        })

        // Mark the token as used
        await prisma.token.update({
            where: {
                token: tokenId
            },
            data: {
                used: true
            }
        })

        // Create a notification
        await prisma.notification.create({
            data: {
                status: "success",
                description: `You have been credited with ${increment} credits`,
                type: "success",
                title: "Credits updated",
                action: "/dashboard/my-account",
                buildNotification: false,
                user: {
                    connect: {
                        email
                    }
                }
            }
        });

        return true;
    } catch (e) {
        console.log("An error occured while updating credits: ", e);

        return false;
    }
}

export async function startCheckout (accessToken: string = process.env.POLAR_KEY || "", productPriceId: string = "d72f0af8-0d49-4ac5-9d57-44dad5de793b") {
    const polar = new Polar({
        accessToken,
        server: "sandbox"
    });

    const checkout = await polar.checkouts.custom.create({
        productPriceId,
    });

    return redirect(checkout.url);
}

// Create a new app in the database
export const createApp = async (appData: App) => {

    const session = await auth();
    const email = session?.user.email
    appData.userEmail = email;

    if(!session || !session.user) return null;

    try {
        const app = await prisma.app.create({
            data: {
                appName: appData.appName,
                apkUrl: appData.apkUrl,
                status: "pending",
                appIconUrl: appData.appIconUrl,
                appDescription: appData.appDescription,
                webAppUrl: appData.webAppUrl,
                userId: appData.userId,
                framework: appData.framework,
                user: {
                connect: {
                    email
                }
            }
            }
        });

        // Reload the apps page and the dashboard
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/apps");

        return {
            id: app.id, 
            success: true,
            message: "Success"
        }
    } catch (e) {
        console.log("An error occured while creating app: ", e);

        return {
            success: false,
            message: "An error occured"
        }
    }
}

export const updateApp = async (id: string, data: Partial<App>) => {
    try {
        const app = await prisma.app.update({
            where: {
                id
            },
            data
        });

        revalidatePath("/dashboard/apps");
        revalidatePath("/dashboard");

        return {
            success: true,
            message: "App updated successfully"
        }
    } catch (e) {
        console.log("An error occured while updating app: ", e);

        return {
            success: false,
            message: "Failed to update app"
        }
    }
}

// Create a new notification
export const addNewNotification = async ({
    status,
    description,
    type,
    title,
    action,
    buildNotification,
}: notification) => {
    try {
        const session = await auth();
        const email = session.user.email;

        // Get notification from server
        const data = await prisma.notification.create({
            data: {
                status,
                description,
                type,
                title,
                action,
                buildNotification,
                user: {
                    connect: {
                        email
                    }
                }
            } as unknown as notification
        });

        revalidatePath("/dashboard/apps");
        revalidatePath("/dashboard");

        // Return notification
        return {
            success: true,
            data,
            message: "Notification created successfully"
        }
    } catch (e) {
        console.log("An error occured while adding the notification: ", e);

        // Return notification
        return {
            success: true,
            data: null,
            message: "Failed to create notification"
        }
    }
}

export const decreaseUserCredits = async () => {
    try {
        const session = await auth();
        const email = session?.user?.email;

        await prisma.user.update({  
            where: {
                email
            },
            data: {
                credits: {
                    decrement: 1
                }
            }
        });
    } catch (e) {
        console.log("An error occured while decreasing user credits: ", e);
    }
}

export const getUserCredits = async () => {
    try {
        const session = await auth();
        const email = session?.user?.email;

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        return {
            success: true,
            credits: user?.credits
        }
    } catch (e) {
        console.log("An error occured while getting user credits: ", e);

        return {
            success: false
        };
    }
}