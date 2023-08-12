"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
    const router = useRouter();

    const [userData, setUserData]: any = useState(null);

    const handleLogout = async () => {
        try {
            const { data } = await axios.get("/api/users/logout");
            toast.success(data.message);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const { data } = await axios.get("/api/users/me");
        console.log(data.user);
        setUserData(data.user);
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="min-h-screen w-full flex justify-start items-center flex-col gap-3">
            <h1 className="text-4xl w-full p-5 font-bold text-left">
                Profile Page
            </h1>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <div className="flex flex-col gap-3">
                <p className="text-xl">Id: {userData?._id}</p>
                <p className="text-xl">Name: {userData?.name}</p>
                <p className="text-xl">Email: {userData?.email}</p>
            </div>

            <button
                onClick={handleLogout}
                className="p-4 text-center font-bold bg-red-400 hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;
