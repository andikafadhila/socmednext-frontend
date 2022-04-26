import axios from "axios";
import Post from "./Post";
import { useEffect, useRef, useState } from "react";
import API_URL from "./apiurl";
import InfiniteScroll from "react-infinite-scroll-component";
import { Center, Spinner } from "@chakra-ui/react";
import calculateTime from "../utils/calculateTime";

function Posts({ fetchDataOnScrollParent }) {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 10;
  console.log("posts", posts);
  console.log("page", page);
  // const fetchData = async () => {

  const fetchDataOnScroll = async () => {
    try {
      let res = await fetchDataOnScrollParent(page, limit);
      console.log(res, "ini namanya res");
      if (res.data.length === 0) setHasMore(false);
      setPosts((prev) => [...prev, ...res.data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log("Error fetching Posts");
      console.log(error);
    }
  };

  const fetchLastPost = async () => {
    try {
      const res = await axios.get(`${API_URL}/post/get-post?page=0&limit=1`);
      setPosts([res.data[0], ...posts]);
    } catch (error) {
      console.log(error);
    }
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
