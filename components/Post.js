import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HomeIcon,
  ChatIcon,
  DotsHorizontalIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HearIconFilled } from "@heroicons/react/solid";
import API_URL from "./apiurl";
import Slider from "react-slick";

// carousel arrow
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: 15, zIndex: 5 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: 15, zIndex: 5 }}
      onClick={onClick}
    />
  );
}

function Post({
  key,
  id,
  username,
  userImg,
  dataimg,
  caption,
  createdAt,
  numberOfLikes,
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-cover border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Img */}
      <Slider {...settings}>
        {dataimg.map((val) => {
          return (
            <img
              src={API_URL + val.image}
              className="object-cover w-full aspect-square"
              alt=""
            />
          );
        })}
      </Slider>

      {/* Buttons */}
      <div className="flex justify-between p-5">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>
      {/* Number of Likes */}
      <p className="pl-5 pb-2 truncate">
        <span className="font-semibold mr-1">{numberOfLikes} Likes</span>
      </p>
      {/* Caption */}
      <p className="pl-5 pb-2 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>
      {/* updatedAt */}
      <p className="pl-5 pb-5 truncate">
        <span className="font-thin mr-1">{createdAt} </span>
      </p>
      {/* Comments */}

      {/* Input box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          placeholder="Add a comment..."
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  );
}

export default Post;
