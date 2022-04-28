import axios from "axios";
import Post from "./Post";
import { useEffect, useRef, useState } from "react";
import API_URL from "./apiurl";
import InfiniteScroll from "react-infinite-scroll-component";
import { Center, Spinner } from "@chakra-ui/react";
import calculateTime from "../utils/calculateTime";

function Posts({ fetchDataOnScrollParent, posts, hasMore, page }) {
  console.log("posts", posts);
  console.log("page", page);
  // const fetchData = async () => {

  const fetchDataOnScroll = async () => {
    return fetchDataOnScrollParent();
  };

  useEffect(async () => {
    fetchDataOnScroll();
  }, []);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      next={fetchDataOnScroll}
      loader={
        <Center>
          <Spinner size="xl" />
        </Center>
      }
      endMessage={
        <p className="text-lg font-bold">dah bos, jangan scroll lagi</p>
      }
      dataLength={posts.length}
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={API_URL + post.profilepic}
          dataimg={post.photos} //ini isinya object data foto post
          numberOfLikes={post.number_of_likes}
          createdAt={calculateTime(post.createdAt)}
          caption={post.caption}
        />
      ))}
    </InfiniteScroll>
  );
}
export default Posts;
