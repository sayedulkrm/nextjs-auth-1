import { User } from "@/models/userModels";
import { createTransport } from "nodemailer";
import bcrypt from "bcrypt";

export const sendEmail = async ({ userEmail, emailType, userId }: any) => {
    console.log("This is userID from sendMail" + userId);
    try {
        // Creating token
        const hashToken = await bcrypt.hash(userId.toString(), 10);

        // Find user by id and Update token

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    veryfiedToken: hashToken,
                    veryfiedTokenExpire: Date.now() + 3600000,
                }

                // { new: true, runValidators: true }
            );
        } else if (emailType === "RESETPASSWORD") {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpire: Date.now() + 360000,
                }

                // { new: true, runValidators: true }
            );
        }

        const transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        } as any);

        const verifyLink = `${process.env.FRONTEND_URL}/verifyemail?token=${hashToken}`;
        const resetPasswordLink = `${process.env.FRONTEND_URL}/resetpassword?token=${hashToken}`;

        const mailOptions = {
            from: process.env.MY_MAIL,
            to: userEmail,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Forget Password",
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    /* Add your CSS styles here */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                        padding: 20px;
                    }
                    .container {
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                    }
                    .header {
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    .message {
                        font-size: 16px;
                        margin-bottom: 20px;
                    }
                    .cta-button {
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        ${
                            emailType === "VERIFY"
                                ? "Verify Your Email"
                                : "Forgot Password"
                        }
                    </div>
                    <div class="message">
                        ${
                            emailType === "VERIFY"
                                ? "Click the button below to verify your email."
                                : "Click the button below to reset your password."
                        }
                    </div>
                    <a class="cta-button" href="${
                        emailType === "VERIFY" ? verifyLink : resetPasswordLink
                    }">
                        ${
                            emailType === "VERIFY"
                                ? "Verify Email"
                                : "Reset Password"
                        }
                    </a>
                </div>
            </body>
            </html>
        `,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        console.log(error.message + "Error is coming from sendEmail");
        throw new Error(error.message);
    }
};
