"use client";
import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [submitButton, setSubmitButton] = useState(false);

    const onSignupSubmit = async (e: any) => {
        e.preventDefault();
        console.log(user);

        try {
            setSubmitButton(true);
            const { data } = await axios.post("/api/users/signup", user);
            console.log(data);
            toast.success(data.message);
            router.push("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error);
        } finally {
            setSubmitButton(false);
            setUser({
                name: "",
                email: "",
                password: "",
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen gap-5 h-full w-full justify-center items-center">
            <h1 className="text-4xl font-bold my-10">Welcome to Signup</h1>
            <form
                className="flex flex-col gap-4 w-6/12"
                onSubmit={onSignupSubmit}
            >
                <div className="flex flex-col gap-4">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        className="border p-4 text-black"
                        type="text"
                        placeholder="Name"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="border p-4 text-black"
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="border p-4 text-black"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                </div>
                <button
                    disabled={submitButton}
                    type="submit"
                    className="border p-4 bg-purple-700 text-white font-bold hover:bg-red-700 duration-300 "
                >
                    {submitButton ? "Signing Up..." : "Signup"}
                </button>
            </form>
            <p>
                Already Signup? Go to{" "}
                <Link
                    href="/login"
                    className="font-bold underline text-purple-700"
                >
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Signup;
