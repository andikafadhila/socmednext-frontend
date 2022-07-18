import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../components/apiurl";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 10;

  const fetchLastPost = async () => {
    console.log(posts);
    let token = Cookies.get("token");
    try {
      const res = await axios.get(`${API_URL}/post/get-post?page=0&limit=1`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
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
      toast.error(error.response.data.message || "network error", {
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
    console.log(page, "page");
    console.log(limit, "limit");
    try {
      let token = Cookies.get("token");
      const res = await axios.get(
        `${API_URL}/post/get-post?page=${page}&limit=${limit}`,
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

  return (
    <div className="bg-gray-50 scrollbar-hide">
      <Head>
        <title>PhotoLab</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>

      <Header submitPostParent={submitPostParent} />

      {/* Feed */}
      <Feed
        fetchDataOnScrollParent={fetchDataOnScrollParent}
        posts={posts}
        hasMore={hasMore}
        page={page}
      />

      {/* Modal */}
      <ToastContainer />
    </div>
  );
}
