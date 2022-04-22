// import axios from "axios";
// import Post from "./Post";

// function Posts() {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     try {
//       let res = await axios.get("http://localhost:5000/post/get-post");
//       setData(res.data);
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {data.map((post) => (
//         <Post
//           key={post.id}
//           id={post.id}
//           username={post.username}
//           userImg={`http://localhost:5000${post.profilepic}`}
//           img={post.img}
//           caption={post.caption}
//         />
//       ))}
//     </div>
//   );
// }

// export default Posts;
