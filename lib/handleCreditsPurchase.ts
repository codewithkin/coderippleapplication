import { api } from "@/polar";
import { createToken } from "./actions";

export const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    // Initiate a new payment
        var checkout = await api.checkouts.custom.create({
            productPriceId: "d72f0af8-0d49-4ac5-9d57-44dad5de793b", // TODO: Remove this
            successUrl: "http://localhost:3000/confirmation?checkout_id={CHECKOUT_ID}",
        });

        // Create a new token
        await createToken(checkout.id);

        // Redirect the user to the checkout url
        window.location.href = checkout.url;
}