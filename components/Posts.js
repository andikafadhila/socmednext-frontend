import axios from "axios";
import Post from "./Post";
import { useEffect, useRef, useState } from "react";
import API_URL from "./apiurl";
import InfiniteScroll from "react-infinite-scroll-component";
import { Center, Spinner } from "@chakra-ui/react";
import calculateTime from "../utils/calculateTime";

function Posts({ fetchDataOnScrollParent, posts, hasMore, page }) {
  console.log(posts);
  useEffect(() => {
    fetchDataOnScrollParent();
  }, []);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      next={fetchDataOnScrollParent}
      loader={
        <Center>
          <Spinner size="xl" />
        </Center>
      }
      endMessage={
        <p className="text-lg font-bold text-center">There is nothing here.</p>
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
          comments={post.comments} //isinya object data comment
          userId={post.users_id}
          alreadyLike={post.already_like}
        />
      ))}
    </InfiniteScroll>
  );
}
export default Posts;
