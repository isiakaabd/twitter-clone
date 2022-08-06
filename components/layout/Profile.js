import React from "react";
// import Image from "next/image";
import logo from "components/images/logo.svg";
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
const Profile = () => {
  return (
    <div className=" hoverEffect flex mt-auto items-center justify-center w-full">
      <div className="text-gray-700 flex items-center justify-center xl:justify-start">
        <img
          width="50"
          height="50"
          loading="lazy"
          src="https://d1fdloi71mui9q.cloudfront.net/25oCZvSZTV684Q2YtnH4_uOYjRPFk5d2tXO11"
          alt="profile-pic"
          className="h-10 w-10 rounded-full"
        />
        <div className="leading-5 hidden xl:inline">
          <h1 className="font-bold">John Doe</h1>
          <p className="text-gray-500">@johndoe</p>
        </div>
      </div>
      <DotsCircleHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
    </div>
  );
};
export default Profile;
