"use client";
import { handlePayment } from "@/lib/handleCreditsPurchase";
import { Button } from "@nextui-org/button";

export default function Purchase () {
    return (
        <Button onClick={handlePayment} color="primary" >Purchase credits</Button>
    )
}