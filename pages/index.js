import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../components/apiurl";

export default function Home() {
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
    }
  };

  const fetchDataOnScrollParent = async (page, limit) => {
    console.log(page, "page");
    console.log(limit, "limit");
    try {
      return await axios.get(
        `${API_URL}/post/get-post?page=${page}&limit=${limit}`
      );
    } catch (error) {
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
      <Feed fetchDataOnScrollParent={fetchDataOnScrollParent} />

      {/* Modal */}
      <ToastContainer />
    </div>
  );
}
