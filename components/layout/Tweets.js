import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import {
  ChatIcon,
  ChartBarIcon,
  TrashIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/solid";
import PropTypes from "prop-types";

const Tweets = ({ tweet }) => {
  const { id, image, username, name, text, time } = tweet;
  return (
    <div className="flex space-x-2 p-3 cursor-pointer border-b border-gray-200">
      <div>
        <img alt={name} className="h-11 w-11 rounded-full" src={image} />
      </div>
      <div className=" flex-1 w-full flex flex-col">
        <div className="flex items-center justify-between w-full">
          {/* <div className="flex  flex-col flex-1"> */}
          <div className="flex   space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{username}</span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {time}
            </span>
          </div>
          {/* </div> */}
          <div>
            <DotsCircleHorizontalIcon className="h-10  w-10 hoverEffect hover:bg-sky-100 p-2 hover:text-sky-500" />
          </div>
        </div>
        <h3 className="mb-2 text-gray-800 text-[15px] sm:text-[16px]">
          {text}
        </h3>
        <img
          className="w-full mr-2 rounded-2xl object-cover p-2"
          src={image}
          alt="user"
        />

        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon className="h-9 w-9 p-2  hoverEffect hover:text-sky-blue-500 hover:bg-sky-100" />
          <ShareIcon className="h-9 w-9  p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 w-9  p-2 hoverEffect hover:text-red-600 hover:bg-sky-100" />
          <HeartIcon className="h-9 w-9  p-2 hoverEffect hover:text-red-600 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 p-2  hoverEffect hover:text-sky-blue-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

Tweets.propTypes = {
  tweet: PropTypes.object.isRequired,
};
export default Tweets;
