import nodemailer from 'nodemailer';
import generateEmailHTML from '@/components/generateEmailHTML'; // Import the function instead of the component

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // Set to false to disable SSL/TLS
      requireTLS: true, // Use TLS encryption
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Render the email template with dynamic data to string
    const emailHTML = generateEmailHTML({
      title: 'Thanks for signing up!',
      logoSrc: 'https://i.ibb.co/q0qFGBR/Email.png',
      verificationToken: verificationToken,
      heading: 'Please confirm your subscription',
      description: 'You will be always my first choice.',
      buttonText: 'Confirm',
      companyInfo: 'Fungibles',
    });

    // Define the email options
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Verify your email address',
      html: emailHTML, // Use the rendered email template as HTML
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export default sendVerificationEmail;
