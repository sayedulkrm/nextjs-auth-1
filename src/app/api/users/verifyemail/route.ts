import { connnectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connnectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        // const { email } = await reqBody;

        // const user = await User.findOne({ email });

        // if (!user) {
        //     return NextResponse.json(
        //         {
        //             message: "User not found",
        //         },
        //         { status: 400 }
        //     );
        // }

        const { token } = reqBody;

        console.log("Here is the token " + token);

        const user = await User.findOne({
            veryfiedToken: token,
            veryfiedTokenExpire: { $gt: Date.now() },
        });
        console.log("Here is the user from Verify Email Function  " + user);

        if (!user) {
            return NextResponse.json(
                {
                    error: "Token is not valid or expired",
                },
                { status: 400 }
            );
        }

        user.isVarified = true;
        user.veryfiedToken = undefined;
        user.veryfiedTokenExpire = undefined;

        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: "Email is verified successfully",
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(
            error.message + "Something went wrong in verify email function"
        );
        return NextResponse.json(
            {
                error: error.message,
                success: false,
            },
            { status: 400 }
        );
    }
}
