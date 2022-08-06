import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/solid";
// import Image from "next/image";
const HeaderForm = () => {
  return (
    <div className="w-full p-2 border-b border-gray-200 ">
      <div className="w-full space-x-3  flex ">
        <img
          width="50"
          height="50"
          loading="lazy"
          src="https://d1fdloi71mui9q.cloudfront.net/25oCZvSZTV684Q2YtnH4_uOYjRPFk5d2tXO11"
          alt="profile-pic"
          className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
        />
        <div className="flex-1  divide-y divide-gray-200">
          <div className="">
            <textarea
              placeholder="Whats happening"
              className="min-h-[50px] w-full text-gray-70 placeholder-gray-700 tracking-wide border-none focus:ring-0 text-lg"
            />
          </div>
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center">
              <EmojiHappyIcon className="h-10 hoverEffect w-10 p-2 hover:bg-sky-100 text-sky-500" />
              <PhotographIcon className="h-10 hoverEffect w-10 p-2 hover:bg-sky-100 text-sky-500" />
            </div>
            <button
              disabled
              className="bg-blue-400 px-4 py-1.5 rounded-full text-white font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderForm;
