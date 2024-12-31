"use client"
import { noize } from "@/app/layout";
import Link from "next/link";
import { Bell, Bolt, Headset, LayoutDashboard, SquareUser, TabletSmartphone } from 'lucide-react';
import { usePathname } from "next/navigation";

export default function NavBar () {
  // Get the current url
  const url = usePathname();

  return (
    <nav className="text-white bg-slate-700 md:w-1/5 md:h-full px-2 py-8 flex flex-col">
      <h3 className={` ${noize.className} text-2xl`}>CodeRipple</h3>

      <ul className="md:grid text-lg my-8 font-medium gap-4 justify-self-center">
        <li className={` ${url === "/dashboard" && "text-blue-500"} md:flex gap-2 items-center hover:text-blue-200`}>
          <LayoutDashboard />
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className={` ${url === "/dashboard/apps" && "text-blue-500"} md:flex gap-2 items-center hover:text-blue-200`}>
          <TabletSmartphone />
          <Link href="/dashboard/apps">Apps</Link>
        </li>
        <li className={` ${url === "/dashboard/my-account" && "text-blue-500"} md:flex gap-2 items-center hover:text-blue-200`}>
          <SquareUser />
          <Link href="/dashboard/my-account">My Account</Link>
        </li>
        <li className={` ${url === "/dashboard/settings" && "text-blue-500"} md:flex gap-2 items-center hover:text-blue-200`}>
          <Bolt />
          <Link href="/dashboard/settings">Settings</Link>
        </li>
      </ul>

      <li className="md:flex gap-2 items-center hover:bg-gray-300 justify-self-end bg-white text-slate-700 rounded-md p-2 font-bold">
          <Headset />
          <Link href="emailto:kinzinzombe07@gmail.com">Support</Link>
      </li>
    </nav>
  )
}