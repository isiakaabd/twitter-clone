import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";

const Widget = () => {
  const [state, setState] = useState(false);
  const y = Array(10).fill({
    text: "Bill Gate questions Elon Musk's goal with Twitter: 'He could make it worse' -CNBC",
    author: "CNBC",
    image:
      "https://d1fdloi71mui9q.cloudfront.net/25oCZvSZTV684Q2YtnH4_uOYjRPFk5d2tXO11",
  });
  const M = ({ text, author, image }) => {
    return (
      <div className="flex items-center border-b border-gray-50">
        <div>
          <p className="font-bold-sm text-lg">{text}</p>
          <span className="font-light">{author}</span>
        </div>
        <img alt="image" className="h-9 rounded-lg w-12" src={image} />
      </div>
    );
  };

  return (
    <div className="xl:w-[600px] ml-6 space-y-5 hidden lg:inline">
      <div className=" w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50 border-gray-100">
        <div className=" relative rounded-full flex items-center p-3 border-gray-500 ">
          <SearchIcon className="h-5  text-gray-500 z-50" />
          <input
            placeholder="Search Twitter"
            type="text"
            className="absolute pl-11 inset-0 rounded-full  focus:bg-white focus:shadow-lg  text-gray-700  border-gray-500  bg-gray-100 active:border-none"
          />
        </div>
      </div>
      <div className=" p-2 bg-gray-100 rounded-lg w-[90%] xl:w-[75%] ">
        <h1 className="text-2xl  font-bold tracking-wide">
          What&apos;s happening
        </h1>
        {y.slice(0, state ? y.length - 1 : 2).map((item, index) => {
          const { text, author, image } = item;
          return <M key={index} text={text} author={author} image={image} />;
        })}
        <p
          onClick={() => setState(!state)}
          className="text-blue-400 cursor-pointer mt-4"
        >{`show ${state ? "less" : "more"}`}</p>
      </div>
    </div>
  );
};

export default Widget;
