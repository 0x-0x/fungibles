"use client";
import toast from "react-hot-toast";

export default function EmailVerification() {
  const handleVerification = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    try {
      verifyEmail(token).then(() => {
        setTimeout(() => {
          window.location.assign("/");
        }, 1000);
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
            Thanks For Joining{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Fungibles
            </span>{" "}
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600">
            You will always have a upper hand!
          </p>
          <button
            type="submit"
            onClick={handleVerification}
            className="z-10 rounded-md bg-green-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Verify
          </button>
        </div>
        <div className="mt-auto"></div>
      </div>
    </section>
  );
}

async function verifyEmail(token: any): Promise<unknown> {
  const response = await fetch("/api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (response.status == 400) {
    toast.error("Invalid or expired verification token", {
      position: "top-center",
    });
  } else if (response.status == 201) {
    toast.success("Now, You are one amoung us!", {
      position: "top-center",
    });
  }

  return response;
}
