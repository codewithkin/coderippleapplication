import { findToken, updateCredits, updateTotalSpent } from "@/lib/actions";
import Link from "next/link";

export default async function Page({
    searchParams: { customer_session_token, checkout_id, },
  }: {
    searchParams: {
      customer_session_token: string,
      checkout_id: string,
    }
  }) {

    if (!customer_session_token) {
      return (
      <article className="p-4 w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-600">An error occured</h2>
        <p className="text-gray-400">We couldn't process your payment</p>
        <Link 
          className="bg-red-500 mt-4 text-white rounded-lg px-4 py-2"
          href="/dashboard">Back Home</Link>
      </article>
      )
    }

    const token = await findToken(checkout_id);

    // Update the user's totalSpent
    await updateTotalSpent(5);

    // Update the user's credits
    const success = await updateCredits(1, customer_session_token, token?.token);

    if(!success) {
      return (
        <article className="p-4 w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-red-600">An error occured</h2>
          <p className="text-gray-400">We couldn't process your payment</p>
          <Link 
          className="bg-red-500 mt-4 text-white rounded-lg px-4 py-2"
          href="/dashboard">Back Home</Link>
        </article>
      )
    } else {
      return (
          <article className="p-4 w-screen h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold text-green-500">Payment received Succesfully</h2>
            <p className="text-gray-400">Your credits have been updated</p>
            <p className="text-sm">Checkout id: </p>
            <Link 
            className="bg-blue-500 mt-4 text-white rounded-lg px-4 py-2"
            href="/dashboard/my-account">Create a new app</Link>
          </article>
        )
    }
  }