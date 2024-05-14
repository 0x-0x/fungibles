import nodemailer from 'nodemailer';

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

    // Define the email options
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Verify your email address',
      html: `<p>Please click the following link to verify your email address: <a href="${process.env.VERIFICATION_LINK}?token=${verificationToken}">${process.env.VERIFICATION_LINK}?token=${verificationToken}</a></p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export default sendVerificationEmail;
