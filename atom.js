import { atom } from "recoil";
export const modalState = {
  modal: atom({
    key: "modal",
    default: false,
  }),
  postId: atom({
    key: "post",
    default: "id",
  }),
};
