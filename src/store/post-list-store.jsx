// import { use } from "react";
// import { useReducer } from "react";
// import { Children } from "react";
// import { createContext } from "react";
// import PostList from "../components/PostList";
// import { userId } from "react";

import {
  createContext,
  useReducer,
  useCallback,
  useState,
  useEffect,
} from "react";

// const DEFAULT_CONTEXT = {
//   PostList: [],
//   addPost: () => {},
//   deletePost: () => {},
// }

export const PostList = createContext({
  PostList: [],
  // fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId,
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  // const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = useCallback(
    (postId) => {
      // console.log(`delete post called for:${postId}`);
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId,
        },
      });
    },
    [dispatchPostList],
  );

  // useEffect(() => {
  //   setFetching(true);
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   fetch("https://dummyjson.com/posts", { signal })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       addInitialPosts(data.posts);
  //       setFetching(false);
  //     });

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  return (
    // <PostList.Provider value={{ postList, fetching, addPost, deletePost }}>
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
//     userId: "user-9",
//     tags: ["vacation", "Mumbai", "Enjoying"],
//   },
//   {
//     id: "2",
//     title: "Well Done",
//     body: "Velit delectus quidem ipsam cupiditate qui cum, mollitia temporibus deleniti veniam a possimus labore? Ea, libero nemo. Quibusdam ratione doloribus expedita praesentium?",
//     reactions: 15,
//     userId: "user-43",
//     tags: ["Graduating", "Unbelievable"],
//   },
// ];

export default PostListProvider;
