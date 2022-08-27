import { useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
const AddUsers = ({ data }) => {
  const [number, setNumber] = useState(5);

  return (
    <div className="sticky top-16  p-2 bg-gray-100 rounded-lg ">
      <h4 className="text-xl  px-4 font-bold tracking-wide">Who to follow</h4>
      <AnimatePresence>
        {data.slice(0, number).map((item) => {
          const { login, picture, name } = item;
          return (
            <motion.div
              key={login?.uuid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div
                key={login?.uuid}
                className="px-4 py-2   hover:bg-gray-200 cursor-pointer transition duration-200 ease-out flex items-center  border-b border-gray-50"
              >
                <img
                  src={picture?.thumbnail}
                  className="rounded full"
                  width="40"
                  height="40"
                  alt={name?.first}
                />
                <div className="ml-4 flex-1 leading-5">
                  <h4 className="font-bold hover:underline text-[14px] truncate">
                    {login?.username}
                  </h4>
                  <h5 className="text-[13px] text-gray-500 truncate">
                    {`${name?.first} ${name?.last}`}
                  </h5>
                </div>
                <button className="bg-black text-white rounded-full text-sm px-3.5 py-1.5  font-bold">
                  Follow
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <span
        onClick={() => setNumber(number + 5)}
        role="button"
        className="text-blue-300 px-4 pb-3 hover:text-blue-400 cursor-pointer mt-4"
      >
        Show more
      </span>
    </div>
  );
};

export default AddUsers;
AddUsers.propTypes = {
  data: PropTypes.array,
};
