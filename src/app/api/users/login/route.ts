import { connnectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connnectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { email, password } = await reqBody;
        if (!email || !password) {
            return NextResponse.json(
                {
                    error: "Please enter all the fields",
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 400 }
            );
        }

        // Checking the password

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 400 }
            );
        }
        // Creating Token data

        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        // Creating Token

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json(
            {
                success: true,
                message: `Welcome back ${user.name}!`,
                user,
            },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        console.log("Error loggin user" + error);
        return NextResponse.json(
            {
                error: error.message,
                success: false,
                message: "User cannot be logged in. Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}
