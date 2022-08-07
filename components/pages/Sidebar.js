import React from "react";
import { sideMenu } from "components/helpers/sideMenu";
import Image from "next/image";
import { Profile } from "components/layout";
import logo from "components/images/logo.svg";
const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      <div className="hoverEffect p-0 flex items-center justify-center hover:bg-blue-100 xl:p-1">
        <Image width="50" height="50" src={logo} alt="twitter-logo" />
      </div>
      <div className="mt-4 mb-2.5 xl:items-start">
        {sideMenu.map((item) => {
          const { id, name, Icon } = item;
          return (
            <div
              key={id}
              className="hoverEffect flex items-center justify-center xl:justify-start text-lg space-x-3 text-gray-700"
            >
              <Icon className="h-7" />
              <span className={`${id === 1 && "font-bold"} hidden xl:inline`}>
                {name}
              </span>
            </div>
          );
        })}
      </div>
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 shadow-md font-bold hover:brightness-95 text-lg hidden xl:inline">
        Tweet
      </button>
      <Profile />
    </div>
  );
};

export default Sidebar;