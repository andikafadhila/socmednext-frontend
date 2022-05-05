import Header from "../components/Header";
import Bio from "../components/Bio";
import PostsbyID from "../components/PostsbyID";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../components/apiurl";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { ViewGridIcon, HeartIcon } from "@heroicons/react/outline";

const profile = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 10;
  console.log(posts);
  console.log(hasMore);
  console.log(page);

  const [likedPosts, setLikedPosts] = useState([]);
  const [LikedHasMore, setLikedHasMore] = useState(true);
  const [LikedPage, setLikedPage] = useState(0);

  const fetchLastPost = async () => {
    console.log(posts);
    let token = Cookies.get("token");
    try {
      const res = await axios.get(
        `${API_URL}/post/get-post-byId?page=0&limit=1`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts([res.data[0], ...posts]);
    } catch (error) {
      console.log(error);
    }
  };

  const submitPostParent = async (values) => {
    try {
      let token = Cookies.get("token");

      await axios.post(`${API_URL}/post`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      await toast.success("Posting successfull!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message || "network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      setPage(0);
      setHasMore(true);
      setPosts([]);
      fetchLastPost();
    }
  };

  const fetchDataOnScrollParent = async () => {
    console.log(posts, "posts");
    console.log(limit, "limit");
    try {
      let token = Cookies.get("token");
      const res = await axios.get(
        `${API_URL}/post/get-post-byId?page=${page}&limit=${limit}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.length === 0) setHasMore(false);
      setPosts((prev) => [...prev, ...res.data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log("Error fetching Posts");
      console.log(error);
    }
  };

  const fetchDataOnScrollParentLiked = async () => {
    console.log(likedPosts, "likedPosts");
    console.log(limit, "limit");
    try {
      let token = Cookies.get("token");
      const res = await axios.get(
        `${API_URL}/post/get-post-byAlreadyLiked?page=${page}&limit=${limit}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.length === 0) setLikedHasMore(false);
      setLikedPosts((prev) => [...prev, ...res.data]);
      setLikedPage((prev) => prev + 1);
    } catch (error) {
      console.log("Error fetching Posts");
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50">
      <Header submitPostParent={submitPostParent} />
      <Bio />
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>
            <ViewGridIcon className="w-4" />
            Posts
          </Tab>
          <Tab>
            <HeartIcon className="w-4" />
            Loved
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="w-2/4 mx-auto">
              <PostsbyID
                fetchDataOnScrollParent={fetchDataOnScrollParent}
                posts={posts}
                hasMore={hasMore}
                page={page}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="w-2/4 mx-auto">
              <PostsbyID
                fetchDataOnScrollParent={fetchDataOnScrollParentLiked}
                posts={likedPosts}
                hasMore={LikedHasMore}
                page={LikedPage}
              />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default profile;
