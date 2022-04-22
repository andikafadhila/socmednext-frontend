import axios from "axios";
import Post from "./Post";
import { useEffect, useState } from "react";
import API_URL from "./apiurl";

function Posts() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      let res = await axios.get(`${API_URL}/post/get-post`);
      setData(res.data);
      console.log("ini adalah res.data", res.data);
      console.log(
        "ini adalah res.data.photos[0].image",
        res.data[0].photos[0].image
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("ini data", data[0].photos[0].image);
  // const alamatfoto = data[0].photos[0].image;
  return (
    <div>
      {data.map((post) => (
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
    </div>
  );
}

export default Posts;
