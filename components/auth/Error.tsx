"use client";
import { toast } from "sonner";

export default function Error({ts}: {ts: string}) {
    return toast.error(ts)
}