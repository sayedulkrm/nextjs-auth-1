import Link from "next/link";
import React from "react";

const Home = () => {
    return (
        <div className="min-h-screen w-full flex flex-col gap-5 justify-center items-center">
            <h1 className="text-4xl p-4 bg-red-500 font-bold">
                This is Home Page
            </h1>
            <Link
                href={"/profile"}
                className="bg-orange-500 p-4 text-white rounded-md hover:bg-orange-700"
            >
                Get Start
            </Link>
        </div>
    );
};

export default Home;
