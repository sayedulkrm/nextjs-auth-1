import { connnectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connnectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        console.log(user);

        return NextResponse.json({
            success: true,
            message: `Welcome Back ${user.name}!`,
            user,
        });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            {
                error: error.message,
                success: false,
            },
            { status: 400 }
        );
    }
}
