import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import useUser from "../hooks/useUser";
import API_URL from "./apiurl";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Suggestions from "./Suggestions";

function Feed({ fetchDataOnScrollParent, posts, hasMore, page }) {
  const { isVerified, id, email, username } = useUser();
  const toast = useToast();
  const token = Cookies.get("token");

  const sendEmailVerified = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/sendemail-verified`,
        {
          id,
          email,
          username,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success!",
        description: "Verification send to your email!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "error",
        description: error.response.data.message || "network error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-4xl mx-auto">
      <section className="col-span-2">
        {/* isVerified */}

        {!isVerified ? (
          <div className="text-center mt-8">
            <p className="text-xl font-semibold mb-3">
              You need to verified your email first to get full experience!
            </p>
            <Button onClick={sendEmailVerified}>Send Email</Button>
          </div>
        ) : null}

        {/* Post */}
        <Posts
          fetchDataOnScrollParent={fetchDataOnScrollParent}
          posts={posts}
          hasMore={hasMore}
          page={page}
        />
      </section>

      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
}

export default Feed;
