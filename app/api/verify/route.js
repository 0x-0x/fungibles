import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response(JSON.stringify({ success: false, error: 'Missing verification token' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Find the user by verificationToken
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return new Response(null, {
        status: 302, // Temporary Redirect
        headers: {
          'Location': '/', // Replace with the URL of your signup page
        },
      });
    }

    // Verify the user
    user.emailVerified = true;
    user.verificationToken = ''; // Clear the verification token
    await user.save();

    // Render the "Thank You" page
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <section class="relative bg-black min-h-screen">
            <div class="container mx-auto flex min-h-screen flex-col justify-center text-center">
              <div class="mb-auto"></div>
              <div class="py-12 lg:py-16">
                <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-500">
                  🙏 Thank you!
                </p>
                <h1 class="mb-6 text-4xl text-white font-bold lg:text-5xl">
                  Your email has been verified successfully!
                </h1>
                <p class="mx-auto mb-8 max-w-3xl text-lg text-gray-400">
                  You can now access all the features of our platform.
                </p>
              </div>
              <div class="mt-auto"></div>
            </div>
          </section>
        </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return new Response(null, {
      status: 302, // Temporary Redirect
      headers: {
        'Location': '/', // Replace with the URL of your signup page
      },
    });
  }
}