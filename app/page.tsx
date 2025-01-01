"use client"

export default function EntryPoint() {
  // redirect the user to the dashboard if they are already signed in
  if(typeof window !== "undefined") {
    window.location.href = "/dashboard";
  }

  return (
    <section>
    </section>
  );
}
