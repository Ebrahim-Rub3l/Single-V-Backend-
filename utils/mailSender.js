const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const verifyMail = async (email , token) => {
    try {
  const info = await transporter.sendMail({
    from: process.env.USER, // sender address
    to: process.env.USER, // list of recipients
    subject: "Verify Your Mail", // subject line
    text: "Hello world?", // plain text body
    html:`
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif">

    <div style="width:100%;padding:40px 0;background-color:#f4f4f4">

        <div style="max-width:600px;margin:0 auto;background-color:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,.08)">

            <div style="background-color:#2563eb;padding:30px 20px;text-align:center">
                <h1 style="margin:0;color:#fff;font-size:28px">
                    Welcome to Our Website
                </h1>
            </div>

            <div style="padding:40px 30px">

                <h2 style="margin-top:0;color:#333;font-size:22px">
                    Hello ${email},
                </h2>

                <p style="color:#555;font-size:16px;line-height:1.6">
                    Thank you for creating an account with us.
                    Please verify your email address to activate your account.
                </p>

                <div style="text-align:center;margin:30px 0">

                    <a
                        href="http://localhost:5173/verification/${token}"
                        style="display:inline-block;padding:14px 30px;background-color:#2563eb;color:#fff;text-decoration:none;font-size:16px;font-weight:700;border-radius:6px"
                    >
                        Verify My Email
                    </a>

                </div>

                <p style="color:#666;font-size:14px;line-height:1.6">
                    If the button above does not work, copy and paste the following link into your browser:
                </p>

                <p style="background-color:#f3f4f6;padding:12px;border-radius:5px;word-break:break-all;font-size:13px;color:#2563eb">
                    http://localhost:5173/verification/${token}
                </p>

                <p style="color:#777;font-size:14px;line-height:1.6">
                    This verification link will expire after a certain period.
                    If you did not create this account, you can safely ignore this email.
                </p>

                <p style="color:#333;font-size:15px;margin-bottom:0">
                    Best regards,<br>
                    <strong>Our Website Team</strong>
                </p>

            </div>

            <div style="background-color:#f8f8f8;padding:20px;text-align:center">
                <p style="margin:0;color:#888;font-size:13px">
                    © 2026 Our Website. All rights reserved.
                </p>
            </div>

        </div>

    </div>

</body>
`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

const forgotMail = async (email , token) => {
    try {
  const info = await transporter.sendMail({
    from: process.env.USER, // sender address
    to: process.env.USER, // list of recipients
    subject: "Reset Password", // subject line
    text: "Hello world?", // plain text body
    html: `
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif">

    <div style="width:100%;padding:40px 0;background-color:#f4f4f4">

        <div style="max-width:600px;margin:0 auto;background-color:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,.08)">

            <!-- Header -->
            <div style="background-color:#2563eb;padding:30px 20px;text-align:center">
                <h1 style="margin:0;color:#fff;font-size:28px">
                    Reset Your Password
                </h1>
            </div>

            <!-- Content -->
            <div style="padding:40px 30px">

                <h2 style="margin-top:0;color:#333;font-size:22px">
                    Hello ${email},
                </h2>

                <p style="color:#555;font-size:16px;line-height:1.6">
                    We received a request to reset your password.
                    Please click the button below to reset your password.
                </p>

                <!-- Reset Button -->
                <div style="text-align:center;margin:30px 0">

                    <a
                        href="http://localhost:5173/resetpass/${token}"
                        style="display:inline-block;padding:14px 30px;background-color:#2563eb;color:#fff;text-decoration:none;font-size:16px;font-weight:700;border-radius:6px"
                    >
                        Reset Your Password
                    </a>

                </div>

                <p style="color:#666;font-size:14px;line-height:1.6">
                    If the button above does not work, copy and paste the following link into your browser:
                </p>

                <!-- Reset Link -->
                <p style="background-color:#f3f4f6;padding:12px;border-radius:5px;word-break:break-all;font-size:13px;color:#2563eb">
                    http://localhost:5173/resetpass/${token}
                </p>

                <p style="color:#777;font-size:14px;line-height:1.6">
                    This password reset link will expire after a certain period.
                    If you did not request a password reset, you can safely ignore this email.
                </p>

                <p style="color:#333;font-size:15px;margin-bottom:0">
                    Best regards,<br>
                    <strong>Our Website Team</strong>
                </p>

            </div>

            <!-- Footer -->
            <div style="background-color:#f8f8f8;padding:20px;text-align:center">

                <p style="margin:0;color:#888;font-size:13px">
                    © 2026 Our Website. All rights reserved.
                </p>

            </div>

        </div>

    </div>

</body>
`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

module.exports = {
    verifyMail,
    forgotMail
};