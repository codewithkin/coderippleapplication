"use client";
import { signUserOut } from "@/lib/actions";
import { Button } from "@nextui-org/button";
import { LogOut } from "lucide-react";

export default function Logout () {
    return (
        <Button
                variant="shadow"
                color="primary"
                radius="sm"
                startContent={<LogOut size={17} />}
                className="my-2 font-semibold"
                onClick={async () => await signUserOut()}
            >
            
            Logout
        </Button>
    )
}