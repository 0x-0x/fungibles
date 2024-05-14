import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import generateVerificationToken from "@/lib/generateVerificationToken";

export async function POST(req) {
  try {
    await dbConnect();

    const { email } = await req.json();

    // Generate a random verification token
    const verificationToken = generateVerificationToken();

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const emailVerified = await User.findOne({ email, emailVerified: false });
      if (emailVerified) {
        await sendVerificationEmail(email, emailVerified.verificationToken);
        return new Response(JSON.stringify({ success: true, data: emailVerified }), {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        return new Response(
          JSON.stringify({ success: false, error: "Email already exists" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    // Create a new user
    const user = new User({ email, verificationToken });
    await user.save();

    // Send verification email with the token
    await sendVerificationEmail(email, verificationToken);

    return new Response(JSON.stringify({ success: true, data: user }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
