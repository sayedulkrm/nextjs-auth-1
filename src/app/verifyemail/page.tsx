"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";

const Verify = () => {
    const [token, setToken] = useState("");

    const [verified, setVerified] = useState(false);

    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post(`/api/users/verifyemail`, { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data.error);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];

        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
                    <h1>No token</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {error ? (
                <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
                    <h1 className="text-red-500 text-3xl">
                        {" "}
                        Opss Something went wrong. Can't Verify
                    </h1>
                </div>
            ) : (
                <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
                    {verified ? (
                        <div className="text-center flex flex-col gap-3">
                            <h2 className="text-2xl font-semibold mb-4">
                                Email Verified
                            </h2>
                            <p>Your email has been successfully verified.</p>
                            <Link href="/login">
                                <button className="p-5 font-bold bg-yellow-400 mx-5  hover:bg-yellow-600 self-start">
                                    Login
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold mb-4">
                                Verifying Email
                            </h2>
                            <p>Please wait while we verify your email...</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Verify;
