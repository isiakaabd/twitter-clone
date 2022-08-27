import { memo } from "react";
import { sideMenu } from "components/helpers/sideMenu";
import Image from "next/image";
import { Profile } from "components/layout";
import logo from "components/images/logo.svg";
import { useSession, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    // <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
    <div className="hidden sm:flex flex-col p-4 xl:items-start h-full fixed">
      <div className="hoverEffect p-0 flex items-center justify-center hover:bg-blue-100 xl:p-1">
        <Image width="50" height="50" src={logo} alt="twitter-logo" />
      </div>
      <div className="mt-4 mb-2.5 xl:items-start">
        <AnimatePresence>
          {sideMenu.slice(session ? 1 : 0, session ? 7 : 2).map((item) => {
            const { id, name, Icon } = item;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div
                  key={id}
                  className="hoverEffect flex items-center justify-center xl:justify-start text-lg space-x-3 text-gray-700"
                >
                  <Icon className="h-7" />
                  <span className={`${id === 1 && "font-bold"} md:hidden`}>
                    {name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {session ? (
        <>
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 shadow-md font-bold hover:brightness-95 text-lg md:hidden">
            Tweet
          </button>
          <Profile />
        </>
      ) : (
        <button
          onClick={signIn}
          className="bg-blue-400 mt-2 text-white rounded-full w-36 h-12 shadow-md font-bold hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default memo(Sidebar);
