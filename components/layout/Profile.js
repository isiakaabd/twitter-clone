import logo from "components/images/logo.svg";
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className=" hoverEffect flex mt-auto items-center justify-center w-full">
      <div className="text-gray-700 flex items-center space-x-1 justify-center xl:justify-start">
        <img
          onClick={signOut}
          src={session?.user?.image}
          alt={`${session.user.name}'s profile picture`}
          className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
        />
        <div className="leading-5 hidden xl:inline">
          <h1 className="font-bold">{session.user.name}</h1>
          <p className="text-gray-500">{`@${session.user.username}`}</p>
        </div>
      </div>
      <DotsCircleHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
    </div>
  );
};
export default Profile;
