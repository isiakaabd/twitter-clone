import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { AddUsers } from "components/layout";
import PropTypes from "prop-types";
import { useEffect } from "react";
import parse from "html-react-parser";
import { AnimatePresence, motion } from "framer-motion";
const Widget = ({ data, news }) => {
  const [state, setState] = useState(5);
  const [newState, setNewState] = useState([]);
  useEffect(() => {
    setNewState(news);
  }, [news]);

  const M = ({ text, author, image, url }) => {
    return (
      <a
        href={url}
        target="_blank"
        without
        rel="noreferrer"
        className="px-4 py-2 space-x-1 hover:bg-gray-200 cursor-pointer transition duration-200 flex items-center justify-between border-b border-gray-50"
      >
        <div className="space-y-0.5">
          <h5 className="font-bold-sm text-sm">{parse(text)}</h5>
          <span className="text-xs font-medium text-gray-500">{author}</span>
        </div>

        <img
          alt={author}
          className="h-[70px] rounded-xl object-contain w-[70px]"
          src={image}
        />
      </a>
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
        <h1 className="text-xl  px-4 font-bold tracking-wide">
          What&apos;s happening
        </h1>
        <AnimatePresence>
          {newState.slice(0, state).map((item, index) => {
            const { description, source, urlToImage, url } = item;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <M
                  key={index}
                  text={description}
                  author={source?.name}
                  image={urlToImage}
                  url={url}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
        <span
          onClick={() => setState(state + 5)}
          role="button"
          className="text-blue-300 px-4 hover:text-blue-400 cursor-pointer mt-4"
        >
          show more
        </span>
      </div>
      <AddUsers data={data} />
    </div>
  );
};

export default Widget;
Widget.propTypes = {
  data: PropTypes.array,
};
