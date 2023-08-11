import React from "react";

const UserProfile = ({ params }: any) => {
    return (
        <div className="min-h-screen h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold ">
                UserProfile PAGE WITH NUMBER{" "}
                <span className="bg-orange-600 p-2">{params.id}</span>
            </h1>
        </div>
    );
};

export default UserProfile;
