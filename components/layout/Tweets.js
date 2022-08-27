import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import {
  ChatIcon,
  ChartBarIcon,
  TrashIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import {
  DotsHorizontalIcon,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { signIn, useSession } from "next-auth/react";
import { db } from "../../firebase";
import { useState, useEffect, useCallback, memo } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atom";
import { useRouter } from "next/router";
const Tweets = ({ tweet, id }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLike, setHasLike] = useState(false);
  const [open, setOpen] = useRecoilState(modalState.modal);
  const [postId, setPostId] = useRecoilState(modalState.postId);

  const handleOpen = useCallback(() => {
    if (session?.user) {
      setOpen(!open);
      setPostId(id);
    } else signIn();
    //  eslint-disable-next-line
  }, []);

  // )

  const likePost = async () => {
    if (session) {
      if (hasLike) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  };
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteTweet = async () => {
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      await deleteDoc(doc(db, "posts", id));
    }
    router.push("/");
  };
  const [comments, setComments] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "comments"), (snapshot) =>
      setComments(snapshot.docs)
    );
  }, [id]);

  useEffect(() => {
    setHasLike(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes, session?.user.uid]);
  const { id: ids, timestamp, image, username, userImage, name, text } = tweet;
  return (
    <div className="flex space-x-2 p-3 cursor-pointer border-b border-gray-200">
      <img alt={name} className="h-11 w-11 rounded-full" src={userImage} />

      <div className=" flex-1 w-full flex flex-col">
        <div className="flex items-center justify-between w-full">
          {/* <div className="flex  flex-col flex-1"> */}
          <div className="flex   space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{username}</span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* </div> */}
          <div>
            <DotsHorizontalIcon className="h-10  w-10 hoverEffect hover:bg-sky-100 p-2 hover:text-sky-500" />
          </div>
        </div>
        <h3
          onClick={() => router.push(`/posts/${id}`)}
          className="mb-2 text-gray-800 text-[15px] sm:text-[16px]"
        >
          {text}
        </h3>
        {image && (
          <img
            onClick={() => router.push(`/posts/${id}`)}
            className="w-full mr-2 rounded-2xl object-cover p-2"
            src={image}
            alt="user"
          />
        )}

        <div className="flex items-center justify-between p-2 w-100">
          <div className="flex items-center">
            <ChatIcon
              onClick={handleOpen}
              className="h-10 w-10 p-2  hoverEffect hover:text-sky-blue-500 hover:bg-sky-100"
            />
            <span
              className={`text-sm select-none ${
                comments?.length <= 0 && "invisible"
              }`}
            >
              {comments.length}
            </span>
          </div>
          <ShareIcon className="h-10 w-10  p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />

          {session?.user.uid === ids && (
            <TrashIcon
              onClick={deleteTweet}
              className="h-10 w-10  p-2 hoverEffect hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex gap-1 items-center justify-between">
            {hasLike ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-10 w-10  p-2 hoverEffect text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-10 w-10  p-2 hoverEffect hover:text-red-600 hover:bg-red-100"
              />
            )}
            <span
              className={` ${hasLike && " text-red-600"} text-sm select-none ${
                likes?.length <= 0 && "invisible"
              }`}
            >
              {likes.length}
            </span>
          </div>
          <ChartBarIcon className="h-9 w-9 p-2  hoverEffect hover:text-sky-blue-500 hover:bg-red-100" />
        </div>
      </div>
    </div>
  );
};

Tweets.propTypes = {
  tweet: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
export default memo(Tweets);
