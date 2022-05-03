import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import API_URL from "../../components/apiurl";
import Header from "../../components/Header";
import Post from "../../components/Post";
import PostDetail from "../../components/PostDetail";
import calculateTime from "../../utils/calculateTime";

const postById = () => {
  const router = useRouter();
  const { postId } = router.query;
  postId = parseInt(postId);
  console.log(postId);
  const toast = useToast();

  const [postDetailData, setPostDetailData] = useState([]);
  console.log("postDetailData", postDetailData);

  const getPostByPostId = async () => {
    let token = Cookies.get("token");
    try {
      const res = await axios.get(
        `${API_URL}/post/get-post-byPostId?postId=${postId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(postId);
      setPostDetailData(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostParent = async () => {
    let token = Cookies.get("token");
    try {
      const res = await axios.delete(
        `${API_URL}/post/delete-post?posts_id=${postId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Post Deleted!",
        description: "You just deleted one of your post.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error,
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const commentPostParent = async (comment) => {
    let token = Cookies.get("token");

    try {
      return await axios.post(
        `${API_URL}/post/comment-post?posts_id=${postId}`,
        { comment },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      getPostByPostId();
    }
  };

  const editCaptionParent = async (caption) => {
    let token = Cookies.get("token");

    try {
      return await axios.post(
        `${API_URL}/post/comment-post?posts_id=${postId}`,
        { comment },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      getPostByPostId();
    }
  };

  const likePostParent = async () => {
    let token = Cookies.get("token");
    try {
      return await axios.post(
        `${API_URL}/post/like-post?posts_id=${postId}`,
        null,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      getPostByPostId();
    }
  };

  useEffect(() => {
    getPostByPostId();
  }, []);

  return (
    <div className="bg-gray-50 scrollbar-hide">
      <Header />
      {postDetailData.map((post) => (
        <PostDetail
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
          deletePostParent={deletePostParent}
          commentPostParent={commentPostParent}
          alreadyLike={post.already_like}
          likePostParent={likePostParent}
        />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default postById;
