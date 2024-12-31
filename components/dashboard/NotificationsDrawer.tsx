"use client";
import { Button } from '@nextui-org/button'
import { Bell } from 'lucide-react'
import React from 'react'

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotificationView from './Notification'

export type notification = {
    status: string,
    description: string,
    type: string, // "success" | "error" | "default",
    title: string,
    action: string,
    buildNotification?: true | undefined
}

const App = ({unreadNotifications}: {unreadNotifications: notification[]}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <article>
            <Button color="primary" onClick={toggleDrawer}>
                <h3 className="text-xl text-white font-semibold">{unreadNotifications.length || 0}</h3>
                <Bell />
            </Button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                enableOverlay
                className="py-4 h-full overflow-y-scroll"
            >
                <h2 className="text-xl font-semibold px-4 my-4">Your Notifications</h2>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className='px-4'>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="builds">Builds</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="">
                        {
                            unreadNotifications.length > 0 ?
                            unreadNotifications.map((notification: notification) => {
                                const { status, description, type, title, action } = notification;

                                return (
                                    <NotificationView
                                        action={action} 
                                        status={status} 
                                        description={description}
                                        type={type}
                                        title={title}
                                    />
                                )
                            }) :
                            <p className="text-center text-gray-400">No new notifications</p>
                        }
                    </TabsContent>
                    <TabsContent value="builds">
                    {
                            unreadNotifications.length > 0 ?
                            unreadNotifications.filter((not: notification) => not.buildNotification).map((notification: notification) => {
                                const { status, description, type, title, action } = notification;

                                return (
                                    <NotificationView
                                        action={action} 
                                        status={status} 
                                        description={description}
                                        type={type}
                                        title={title}
                                    />
                                )
                            }) :
                            <p className="text-center text-gray-400">No new build notifications</p>
                        }
                    </TabsContent>
                </Tabs>

            </Drawer>
        </article>
    )
}

export default App