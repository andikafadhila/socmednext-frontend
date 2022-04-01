import Post from "./Post";

const posts = [
  {
    id: "123",
    username: "andika",
    userImg:
      "https://foto.wartaekonomi.co.id/files/arsip_foto_2019_11_16/otomotif_215524_small.webp",
    img: "https://cdn-brilio-net.akamaized.net/news/2022/02/23/223670/1676017-1000xauto-ekspresi-foto-close-up-ala-chelsea-islan.jpg",
    caption: "maluv",
  },
  {
    id: "123",
    username: "andika",
    userImg:
      "https://foto.wartaekonomi.co.id/files/arsip_foto_2019_11_16/otomotif_215524_small.webp",
    img: "https://cdn-brilio-net.akamaized.net/news/2022/02/23/223670/1676017-1000xauto-ekspresi-foto-close-up-ala-chelsea-islan.jpg",
    caption: "maluv",
  },
];

function Posts() {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default Posts;
