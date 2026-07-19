// import { use } from "react";
// import { useReducer } from "react";
// import { Children } from "react";
// import { createContext } from "react";
// import PostList from "../components/PostList";
// import { useId } from "react";

import { createContext, useReducer } from "react";

// const DEFAULT_CONTEXT = {
//   PostList: [],
//   addPost: () => {},
//   deletePost: () => {},
// }

export const PostList = createContext({
  PostList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId,
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (useId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        useId: useId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    // console.log(`delete post called for:${postId}`);
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
//     body: "Velit delectus quidem ipsam cupiditate qui cum, mollitia temporibus deleniti veniam a possimus labore? Ea, libero nemo. Quibusdam ratione doloribus expedita praesentium?",
//     reactions: 2,
//     useId: "user-9",
//     tags: ["vacation", "Mumbai", "Enjoying"],
//   },
//   {
//     id: "2",
//     title: "Well Done",
//     body: "Velit delectus quidem ipsam cupiditate qui cum, mollitia temporibus deleniti veniam a possimus labore? Ea, libero nemo. Quibusdam ratione doloribus expedita praesentium?",
//     reactions: 15,
//     useId: "user-43",
//     tags: ["Graduating", "Unbelievable"],
//   },
// ];

export default PostListProvider;
