import { useRouter } from "next/router";
import "dotenv/config";
import Head from "next/head";
import { Tweets, Comment } from "components/layout";
import {
  doc,
  onSnapshot,
  query,
  collection,
  orderBy,
} from "firebase/firestore";
import { Sidebar, CommentModal, Widget } from "components/pages";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
const Post = ({ data, news }) => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot.data()));
  }, [id]);
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [id]
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen max-w-7xl mx-auto ">
        <Sidebar />

        <div className="sm:ml-[75px] xl:ml-[300px] w-[800px]  xl:min-w-6xl border-r border-l flex-2">
          <div className="flex sticky space-x-1 items-center p-3 top-0 z-30 bg-white border-b border-gray-200 ">
            <div className="hoverEffect flex items-center justify-center">
              <ArrowLeftIcon className="h-5" onClick={() => router.push("/")} />
            </div>
            <h2 className="text-lg flex-1 sm:text-xl font-bold cursor-pointer">
              Tweet
            </h2>
          </div>

          <Tweets id={id} tweet={post} />
          <AnimatePresence>
            {comments?.length > 0
              ? comments?.map((comment, index) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    key={index}
                  >
                    <Comment
                      key={index}
                      newPostId={id}
                      id={comment.id}
                      comment={comment.data()}
                    />
                  </motion.div>
                ))
              : null}
          </AnimatePresence>
        </div>
        <Widget data={data} news={news} />
        <CommentModal />
      </main>
    </div>
  );
};

export default Post;
Post.propTypes = {
  data: PropTypes.array,
  news: PropTypes.array,
};

export const getServerSideProps = async () => {
  const data = await fetch("https://randomuser.me/api/?results=500")
    .then((res) => res.json())
    .catch((err) => console.log(err));
  const news = await fetch(
    `https://newsapi.org/v2/everything?q=manchester-united&apiKey=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return {
    props: {
      data: data?.results,
      news: news?.articles,
    },
  };
};