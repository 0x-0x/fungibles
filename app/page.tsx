"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      toast.promise(saveSettings(email), {
        loading: "Joining Waiting List",
        success: <b>Thanks for signing Up ❤️</b>,
        error: <b>Something went wrong!</b>,
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <section className="relative min-h-screen">
      <div className="container mx-auto flex min-h-screen flex-col justify-center text-center">
        <div className="mb-auto"></div>
        <div className="py-12 lg:py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-500">
            🔥 Amazing SaaS Resources & Services!
          </p>
          <h1 className="mb-6 text-4xl font-bold lg:text-5xl">
            Join The Waitlist for{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Fungibles
            </span>{" "}
            Today!
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600">
            Something huge is comming!. You will be the first one to try it!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
              <div className="relative z-10">
                <input
                  placeholder="Your Email Address"
                  className="w-full rounded-md border bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-80"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {email && <p className="mt-1 text-sm text-red-500">{email}</p>}
              </div>
              <button
                type="submit"
                className="z-10 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Join Waitlist
              </button>
            </div>
          </form>
          <div className="relative z-10">
            <a
              href="https://www.linkedin.com/company/fungibleclub"
              className="text-sm font-semibold text-blue-500 hover:text-blue-600"
            >
              Follow Us Right here →
            </a>
          </div>
        </div>
        <div className="mt-auto"></div>
      </div>
    </section>
  );
}

async function saveSettings(email: any): Promise<unknown> {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (response.status == 301) {
    toast.success("You are already subscribed📨", {
      position: "bottom-center",
    });
  } else {
    toast.success("Please check your email 📨", {
      position: "bottom-center",
    });
  }

  return response;
}
