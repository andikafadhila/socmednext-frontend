import axios from "axios";
import Post from "./Post";
import { useEffect, useRef, useState } from "react";
import API_URL from "./apiurl";
import InfiniteScroll from "react-infinite-scroll-component";

function Posts() {
  // const [data, setData] = useState([]);
  //   try {
  //     let res = await axios.get(`${API_URL}/post/get-post`);
  //     setPosts(res.data);
  //     // console.log("ini adalah res.data", res.data);
  //     // console.log(
  //     //   "ini adalah res.data.photos[0].image",
  //     //   res.data[0].photos[0].image
  //     // );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 10;
  console.log("posts", posts);
  console.log("page", page);
  // const fetchData = async () => {

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${API_URL}/post/get-post`, {
        params: { page, limit },
      });

      if (res.data.length === 0) setHasMore(false);
      setPosts((prev) => [...prev, ...res.data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log("Error fetching Posts");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataOnScroll();
  }, []);

  return (
    <div>
      <InfiniteScroll
        hasMore={hasMore}
        next={fetchDataOnScroll}
        loader={<div>Loading...</div>}
        endMessage={<div>ga ada lagi bosku</div>}
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
            caption={post.caption}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
export default Posts;
