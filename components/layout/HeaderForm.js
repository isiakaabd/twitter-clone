import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/solid";
import { db, storage } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import useUpload from "components/utilities/Cloud";
const HeaderForm = () => {
  const { data: session } = useSession();
  const [textState, setTextState] = useState("");
  const [fetchData, state] = useUpload();
  const [imageState, setImageState] = useState(state);
  const fileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setImageState(state);
  }, [state]);
  const addImage = async (e) => {
    if (e.target.files[0]) {
      await fetchData(e);
    }
  };
  // const { email, image, name } = session?.user;
  const addPost = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: textState,
      userImage: session.user.image,
      image: imageState,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });
    setTextState("");
    setImageState(undefined);
    setIsLoading(false);
    // const imageRef = ref(storage,`posts/${docRef.id}/image`);
  };
  return (
    session && (
      <>
        <div className="w-full p-2 border-b border-gray-200 ">
          <div className="w-full space-x-3  flex ">
            <img
              src={session?.user?.image}
              loading="lazy"
              alt={`${session.user.name}'s profile picture`}
              className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            />
            <div className="flex-1  divide-y divide-gray-200">
              <div className="">
                <textarea
                  value={textState}
                  onChange={(e) => setTextState(e.target.value)}
                  placeholder="Whats happening"
                  className="min-h-[50px] w-full text-gray-70 placeholder-gray-700 tracking-wide border-none focus:ring-0 text-lg"
                />
              </div>
              {imageState && (
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
              )}
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
                  onClick={addPost}
                  disabled={!textState.trim() || isLoading}
                  className="bg-blue-400 px-4 py-1.5 rounded-full text-white font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default HeaderForm;
