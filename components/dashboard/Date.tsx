// Make it a client component so that it shows the client time, not server time
"use client"

export default function DateDetails() {
    // Get the current date
    const date: Date = new Date() as any

    // Extract the current day of the month
    const dayOfTheMonth = date.getDate();

    // Extract the current day of the week
    const dayOfTheWeek = date.getDay();

    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get the current month
    const month = date.toLocaleString("default", { month: "long" });
    return (
        <article className="p-4 rounded-full shadow-lg flex gap-2 bg-gray-200 w-fit">
            <article className="bg-black p-2 text-white font-semibold rounded-full text-2xl">
                {dayOfTheMonth}
            </article>

            <article className="grid">
                <p className="font-semibold ">{daysOfTheWeek[dayOfTheWeek]}</p>
                <p className="font-semibold text-gray-500">{month}</p>
            </article>
        </article>
    )
}