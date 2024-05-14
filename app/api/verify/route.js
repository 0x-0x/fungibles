// pages/api/verify-email.js

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    await dbConnect();

    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing verification token",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid or expired verification token",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (user.emailVerified) {
      // If email is already verified, handle accordingly
      // For example, redirect to homepage or send appropriate response
      return new Response(
        JSON.stringify({
          success: true,
          message: "Email already verified",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // If email is not yet verified, update user data
    user.emailVerified = true;
    user.verificationToken = ""; // Clear the verification token
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email verified successfully",
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
