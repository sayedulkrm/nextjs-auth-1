import { connnectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helper/sendMail";

connnectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, password } = await reqBody;
        console.log(reqBody);
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Please enter all the fields" },
                { status: 400 }
            );
        }

        // Check if the user already has account
        let user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        user = await User.create({
            name,
            email,
            password,
        });

        console.log("Here's the USER ID" + user._id);

        // send Varifiction email

        await sendEmail({
            userEmail: email,
            emailType: "VERIFY",
            userId: user._id,
        });

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                user,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.log("Error creating user to Database.  " + error);
        return NextResponse.json(
            {
                error: error.message,
                success: false,
                message:
                    "User cannot be created. Something went wrong creating the user in the database",
            },
            { status: 500 }
        );
    }
}
