import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atom";
import Modal from "react-modal";
import Moment from "react-moment";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { XIcon } from "@heroicons/react/solid";
const CommentModal = () => {
  const [post, setPost] = useState(null);
  const [state, setState] = useRecoilState(modalState.modal);
  const [postId] = useRecoilState(modalState.postId);
  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) =>
      setPost(snapshot.data())
    );
  }, [postId]);

  // const customStyles = {
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //   },
  // };

  const handleClose = () => setState(false);

  return (
    <Modal
      isOpen={state}
      className="max-w-lg w-[90%] h-[300px] border-gray-100 absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 rounded-xl shadow-md"
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
            className="hoverEffect w-9 h-9 flex items-center justify-center"
          >
            <XIcon className="h-[22px] text-gray-500" />
          </div>
        </div>
        <div className="relative p-2 flex items-center space-x-1">
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
          <span className="bg-gray-300 w-0.5 h-full left-6 top-11  absolute z-[-1] " />
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
