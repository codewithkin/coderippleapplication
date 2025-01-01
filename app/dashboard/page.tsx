import Apps from "@/components/dashboard/Apps";
import { AppsTimeLine } from "@/components/dashboard/AppsTimelineAreaChart";
import CreateAnApp from "@/components/dashboard/CreateAnApp";
import Credits from "@/components/dashboard/Credits";
import DateDetails from "@/components/dashboard/Date";
import NotificationsDrawer, { notification } from "@/components/dashboard/NotificationsDrawer";
import Walkthroughs from "@/components/dashboard/Walkthrough";
import { getUserApps, getUserNotifications } from "@/lib/actions";
import { prisma } from "@/prisma";

export default async function Dashboard() {
    const apps = await getUserApps();

    const unreadNotifications: notification[] = await getUserNotifications();

    return (
        <article className="p-4 w-full h-full overflow-y-scroll">
            <Credits />
            <article className="w-full flex justify-between items-center">
                <DateDetails />

                <NotificationsDrawer unreadNotifications={unreadNotifications} />
            </article>

            <article className="flex gap-2">
                 <CreateAnApp />
                 <Walkthroughs />
            </article>

            <article className="flex gap-2">
                <Apps apps={apps} />
                <AppsTimeLine apps={apps} />
            </article>
        </article>
    )
}