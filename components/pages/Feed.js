import { SparklesIcon } from "@heroicons/react/outline";
import { HeaderForm, Tweets } from "components/layout";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, memo, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Feed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setTweets(snapshot.docs);
        }
      ),
    []
  );
  return (
    <div className="sm:flex-1 md:flex-2 xl:min-w-7xl md:border-r md:border-l border-0 w-full">
      {/* <div className="sm:ml-[75px] xl:ml-[360px] w-[900px]  xl:min-w-7xl border-r border-l flex-2"> */}
      <div className="flex sticky items-center p-3 top-0 z-30 bg-white border-b border-gray-200 ">
        <p className="text-lg flex-1 sm:text-xl font-bold cursor-pointer">
          Home
        </p>
        <div className="hoverEffect flex items-center px-0 justify-center w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <HeaderForm />
      <AnimatePresence>
        {tweets?.map((tweet) => (
          <motion.div
            key={tweet.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* <Tweets key={tweet.id} id={tweet?.id} tweet={tweet?.data()} /> */}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
// const Feed = () => {
//   return <div className="flex-2 bg-red-300">This is life</div>
// }
export default memo(Feed);
