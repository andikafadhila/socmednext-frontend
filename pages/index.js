import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="bg-gray-50 scrollbar-hide">
      <Head>
        <title>PhotoLab</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Feed */}
      <Feed />

      {/* Modal */}
      <ToastContainer />
    </div>
  );
}
