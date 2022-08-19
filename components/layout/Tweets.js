import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import {
  ChatIcon,
  ChartBarIcon,
  TrashIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { signIn, signOut, useSession } from "next-auth/react";
import { db } from "../../firebase";
import { useState, useEffect, useCallback, memo } from "react";
import { useRecoilState, useRecoilCallback } from "recoil";
import { modalState } from "../../atom";
const Tweets = ({ tweet }) => {
  // const { modal, postId: postValue } = modalState;
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLike, setHasLike] = useState(false);
  const [open, setOpen] = useRecoilState(modalState.modal);
  const [postId, setPostId] = useRecoilState(modalState.postId);

  const handleOpen = useCallback(() => {
    if (session?.user) {
      setOpen(!open);
      setPostId(tweet.id);
    } else signIn();
    //  eslint-disable-next-line
  }, []);

  // );
  const { id, timestamp, image, username, userImage, name, text } =
    tweet.data();
  const likePost = async () => {
    if (session) {
      if (hasLike) {
        await deleteDoc(doc(db, "posts", tweet.id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", tweet.id, "likes", session.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  };
  useEffect(() => {
    onSnapshot(collection(db, "posts", tweet.id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteTweet = async () => {
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      await deleteDoc(doc(db, "posts", tweet.id));
    }
  };

  useEffect(() => {
    setHasLike(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes, session?.user.uid]);
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
            <DotsCircleHorizontalIcon className="h-10  w-10 hoverEffect hover:bg-sky-100 p-2 hover:text-sky-500" />
          </div>
        </div>
        <h3 className="mb-2 text-gray-800 text-[15px] sm:text-[16px]">
          {text}
        </h3>
        {image && (
          <img
            className="w-full mr-2 rounded-2xl object-cover p-2"
            src={image}
            alt="user"
          />
        )}

        <div className="flex items-center justify-between p-2 w-100">
          <ChatIcon
            onClick={handleOpen}
            className="h-10 w-10 p-2  hoverEffect hover:text-sky-blue-500 hover:bg-sky-100"
          />
          <ShareIcon className="h-10 w-10  p-2 hoverEffect hover:text-sky-500 hover:bg-sky-100" />

          {session?.user.uid === id && (
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
};
export default memo(Tweets);
