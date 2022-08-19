import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atom";
import Modal from "react-modal";
import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/solid";

import Moment from "react-moment";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useUpload from "components/utilities/Cloud";
const CommentModal = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState(null);
  const [fetchData, stateValue] = useUpload();
  const [imageState, setImageState] = useState(stateValue);
  const fileRef = useRef(null);
  const [textState, setTextState] = useState("");
  const handleClose = () => setState(false);
  const [state, setState] = useRecoilState(modalState.modal);
  const [postId] = useRecoilState(modalState.postId);
  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) =>
      setPost(snapshot.data())
    );
  }, [postId]);

  const addImage = useCallback(async (e) => {
    if (e.target.files[0]) {
      await fetchData(e);
    }

    //eslint-disable-next-line
  }, []);

  const addComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: textState,
      name: session.user.name,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
      image: imageState ? imageState : null,
      userId: session.user.uid,
    });
    handleClose();
    router.push(`/posts/${postId}`);
  };

  return (
    <Modal
      isOpen={state}
      className="max-w-lg w-[90%]  border-gray-100 absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 rounded-xl shadow-md"
      // onAfterOpen={afterOpenModal}
      onRequestClose={handleClose}
      ariaHideApp={false}
      // style={customStyles}
      contentLabel="comment Modal"
    >
      <div className="p-2">
        <div className="border-b border-gray-200">
          <div
            onClick={handleClose}
            className="hoverEffect w-10 h-10 flex items-center justify-center"
          >
            <XIcon className="h-[23px] text-gray-500 p-0" />
          </div>
        </div>
        <div className="relative p-2 flex items-center space-x-1">
          <span className="bg-gray-300 mt-2 w-0.5 h-full left-8 top-11  absolute z-[-1] " />

          <img
            alt={post?.name}
            className="h-11 w-11 rounded-full"
            src={post?.userImage}
          />
          <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
            {post?.name}
          </h4>
          <span className="text-sm sm:text-[15px]">@{post?.username}</span>
          <span className="text-sm sm:text-[15px] hover:underline">
            <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
          </span>
        </div>
        <div className="ml-16">
          <p className="text-gray-500 text-[15px] sm:text-[16px] ">
            {post?.text}
          </p>
          {post?.image && (
            <p className="mb-2">
              Deploy at the link below.👇
              <a
                href={post?.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >{`${post?.image.slice(0, 30)}...`}</a>
            </p>
          )}
          <p className="mt-1">
            Replying to <a className="text-blue-400">@{post?.username}</a>
          </p>
        </div>
        <div className="w-full p-2  items-center flex flex-col ">
          <div className="ml-1 w-full space-x-3  flex">
            <img
              src={session?.user?.image}
              alt={`${session?.user?.name}'s profile picture`}
              className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            />
            <div className="flex-1  divide-y divide-gray-200">
              <textarea
                value={textState}
                onChange={(e) => setTextState(e.target.value)}
                placeholder="Tweet your thoughts..."
                className="min-h-[50px] w-full text-gray-70 placeholder-gray-700 tracking-wide border-none focus:ring-0 text-lg"
              />

              {/* {imageState && (
                <div className="flex relative justify-between">
                  <XIcon
                    onClick={() => setImageState(undefined)}
                    className="h-7 p-1 shadow-md shadow-white rounded-full  absolute text-white bg-gray-800   hover:bg-gray-600 cursor-pointer z-10"
                  />
                  <img
                    src={imageState}
                    alt="uploaded image"
                    className={isLoading ? " animate-pulse " : ""}
                  />
                </div>
              )} */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div onClick={() => fileRef.current.click()}>
                    <PhotographIcon className="h-10 hoverEffect w-10 p-2 hover:bg-sky-100 text-sky-500" />
                    <input
                      type="file"
                      hidden
                      ref={fileRef}
                      onChange={addImage}
                    />
                  </div>
                  <EmojiHappyIcon className="h-10 hoverEffect w-10 p-2 hover:bg-sky-100 text-sky-500" />
                </div>
                <button
                  onClick={addComment}
                  disabled={!textState.trim()}
                  className="bg-blue-400 px-4 py-1.5 rounded-full text-white font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
