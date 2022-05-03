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

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Center,
  Link,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import API_URL from "./apiurl";
import Slider from "react-slick";
import calculateTime from "../utils/calculateTime";
import useUser from "../hooks/useUser";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

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

const postDetail = ({
  key,
  id,
  username,
  userImg,
  dataimg,
  caption,
  createdAt,
  numberOfLikes,
  comments,
  userId,
  deletePostParent,
  commentPostParent,
  alreadyLike,
  likePostParent,
}) => {
  const toast = useToast();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const { id: logedinId } = useUser();

  console.log(logedinId, "logedinId");
  console.log(userId, "userId");
  console.log(comments);

  // ShowMore ShowLess Function
  const [commentToShow, setCommentToShow] = useState(5);

  const showmore = () => {
    setCommentToShow(comments.length);
  };

  const showless = () => {
    setCommentToShow(5);
  };

  // Delete Function
  const router = useRouter();

  const deletePost = async () => {
    try {
      const res = await deletePostParent();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Comment Function
  const [comment, setComment] = useState("");
  console.log(comment);
  const commentPost = async (e) => {
    e.preventDefault();
    try {
      if (!comment.length) {
        throw { message: "Please input your Comment." };
      }
      await commentPostParent(comment);
      toast({
        title: "Comment Posted!",
        description: "You just comment this post.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setComment("");
      console.log("comment", comment);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast({
        title: "error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // like function
  const likePost = async (e) => {
    e.preventDefault();
    try {
      const res = await likePostParent();
      console.log(res, "res line 170");
      toast({
        title: "Success",
        description: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // // Edit Function
  const [canEdit, setCanEdit] = useState(false);

  const editButtonHandler = () => {
    setCanEdit(true);
  };

  // const [caption, setCaption] = useState("");
  // console.log(caption);
  // const editCaptionPost = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!caption.length) {
  //       throw { message: "Please input your Comment." };
  //     }
  //     await editCaptionParent(caption);
  //     toast({
  //       title: "Comment Posted!",
  //       description: "You just caption this post.",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     setComment("");
  //     console.log("caption", caption);
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.message);
  //     toast({
  //       title: "error",
  //       description: error.message,
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  return (
    <div>
      <div className="bg-white mt-7 mx-14 border rounded-r-lg grid grid-cols-2">
        {/* Img */}
        <div className="col-span-1">
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
        </div>
        <div className="flex-row">
          {/* Header */}
          <div className="flex items-center pl-5 py-3 pr-5 bg-slate-400">
            <img
              src={userImg}
              className="rounded-full h-10 w-10 object-cover border p-1 mr-3"
              alt=""
            />
            <p className="flex-1 font-bold">{username}</p>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<DotsHorizontalIcon className="h-5" />}
                variant="ghost"
              />
              <MenuList>
                {userId == logedinId ? (
                  <div>
                    <MenuItem textColor="red" onClick={onOpen}>
                      Delete
                    </MenuItem>
                    <MenuItem textColor="black" onClick={editButtonHandler}>
                      Edit
                    </MenuItem>
                  </div>
                ) : null}
              </MenuList>
            </Menu>
          </div>

          <Divider />

          <div className="h-[21rem] overflow-y-auto scrollbar-hide bg-orange-400">
            {/* Caption */}

            <div>
              <div className="flex items-center pl-5 py-1">
                <img
                  src={userImg}
                  className="rounded-full h-10 w-10 object-cover border p-1 mr-3"
                  alt=""
                />
                <p className="font-semibold text-md">{username}</p>
              </div>
              <p className="font-normal text-md ml-16 pl-2 -mt-3">
                {canEdit ? (
                  <div>
                    <form action="">
                      <Textarea w={"md"} />
                      <Button className="-right-[23rem] mt-3">Submit</Button>
                    </form>
                  </div>
                ) : (
                  <div>{caption}</div>
                )}
              </p>
              <p className="ml-16 pl-2  font-thin text-xs">{createdAt}</p>
            </div>

            {/* Comments */}

            {comments.slice(0, commentToShow).map((val) => {
              return (
                <div>
                  <div className="flex items-center pl-5 py-1">
                    <img
                      src={API_URL + val.profilepic}
                      className="rounded-full h-10 w-10 object-cover border p-1 mr-3"
                      alt=""
                    />
                    <p className="font-semibold text-md">{val.username}</p>
                  </div>
                  <p className="font-normal text-md ml-16 pl-2 -mt-3">
                    {val.comment}
                  </p>
                  <p className="ml-16 pl-2  font-thin text-xs">
                    {calculateTime(val.createdAt)}
                  </p>
                </div>
              );
            })}

            {commentToShow === 5 && comments.length > 5 ? (
              <Button
                onClick={showmore}
                variant="link"
                size="sm"
                ml={16}
                pl={2}
                pr={2}
                mt={2}
                textColor="black"
              >
                Show More
              </Button>
            ) : null}
            {commentToShow === comments.length && comments.length !== 0 ? (
              <Button
                onClick={showless}
                variant="link"
                size="sm"
                ml={16}
                pl={2}
                pr={2}
                mt={2}
                textColor="black"
              >
                Show Less
              </Button>
            ) : null}
          </div>

          <Divider />

          {/* Buttons */}
          <div className="bg-lime-400">
            <div className="flex justify-between px-5 py-5">
              <div className="flex space-x-4">
                {alreadyLike ? (
                  <HeartIconFilled
                    className="btn text-red-600"
                    onClick={likePost}
                  />
                ) : (
                  <HeartIcon className="btn" onClick={likePost} />
                )}

                <ChatIcon className="btn" />
                <PaperAirplaneIcon className="btn" />
              </div>
              <BookmarkIcon className="btn" />
            </div>
            {/* Number of Likes */}
            <p className="pl-5 pb-1 truncate">
              <span className="font-semibold mr-1">{numberOfLikes} Likes</span>
            </p>

            {/* updatedAt */}
            <p className="pl-5 pb-1 truncate">
              <span className="font-thin mr-1">{createdAt} </span>
            </p>

            {/* Input box */}
            <form className="flex items-center p-4" onSubmit={commentPost}>
              <EmojiHappyIcon className="h-7" />
              <input
                type="text"
                placeholder="Add a comment..."
                name="comment"
                id="comment"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                onSubmit={(e) => {
                  e.target.value = "";
                }}
                className="border-none flex-1 focus:ring-0 outline-none"
              />
              <button className="font-semibold text-blue-400" type="submit">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Delete Post?</Center>
          </ModalHeader>
          <ModalBody>
            <Divider />
            <Center>
              <Link
                color="red"
                fontWeight="semibold"
                margin={2}
                onClick={deletePost}
              >
                Yes
              </Link>
            </Center>
            <Divider />
            <Center>
              <Link
                color="blue.300"
                fontWeight="semibold"
                margin={2}
                onClick={onClose}
              >
                No
              </Link>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default postDetail;