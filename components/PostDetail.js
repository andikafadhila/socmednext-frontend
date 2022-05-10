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
import {
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
} from "react-share";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";

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

const PostDetail = ({
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
  editCaptionParent,
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

  const { id: logedinId, isLogin } = useUser();
  console.log(useUser());

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
  const {
    isOpen: isOpenShare,
    onOpen: onOpenShare,
    onClose: onCloseShare,
  } = useDisclosure();

  // Comment Function
  const [comment, setComment] = useState("");
  console.log(comment);
  const commentPost = async (e) => {
    e.preventDefault();
    try {
      await commentPostParent(comment);
      setComment("");
      console.log("comment", comment);
    } catch (error) {
      console.log(error);
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

  // Edit Function
  const [canEdit, setCanEdit] = useState(false);

  const editButtonHandler = () => {
    canEdit ? setCanEdit(false) : setCanEdit(true);
  };

  const [editCaption, setEditCaption] = useState(caption);
  console.log(editCaption);
  const editCaptionPost = async (e) => {
    e.preventDefault();
    try {
      await editCaptionParent(editCaption);
      setCanEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Copy to Clipboard function

  return (
    <>
      <div>
        <div className="bg-white mt-7 mx-14 border rounded-r-lg grid grid-cols-2">
          {/* Img */}
          <div className="col-span-1">
            <Slider {...settings}>
              {dataimg.map((val, i) => {
                return (
                  <img
                    src={API_URL + val.image}
                    className="object-cover w-full aspect-square"
                    alt=""
                    key={i}
                  />
                );
              })}
            </Slider>
          </div>
          <div className="flex-row">
            {/* Header */}
            <div className="flex items-center pl-5 py-3 pr-5 ">
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

            <div className="h-[21rem] overflow-y-auto scrollbar-hide ">
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
                      <form action="" onSubmit={editCaptionPost}>
                        <Textarea
                          w={"md"}
                          value={editCaption}
                          onChange={(e) => {
                            setEditCaption(e.target.value);
                          }}
                        />
                        <div className="mt-3">
                          <Button type="submit">Submit</Button>
                          <Button className="ml-2" onClick={editButtonHandler}>
                            Close
                          </Button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div>{caption}</div>
                  )}
                </p>
                <p className="ml-16 pl-2  font-thin text-xs">{createdAt}</p>
              </div>
              <Divider />

              {/* Comments */}

              {comments.slice(0, commentToShow).map((val, i) => {
                return (
                  <div key={i}>
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
              {commentToShow === comments.length &&
              comments.length !== 0 &&
              comments.length !== 5 ? (
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
            <div className="">
              {isLogin ? (
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
                    <PaperAirplaneIcon className="btn" onClick={onOpenShare} />
                  </div>
                  <BookmarkIcon className="btn" />
                </div>
              ) : (
                <div className="py-8"></div>
              )}

              {/* Number of Likes */}
              <p className="pl-5 pb-1 truncate">
                <span className="font-semibold mr-1">
                  {numberOfLikes} Likes
                </span>
              </p>

              {/* updatedAt */}
              <p className="pl-5 pb-1 truncate">
                <span className="font-thin mr-1">{createdAt} </span>
              </p>

              {/* Input box */}
              {isLogin ? (
                <>
                  <form
                    className="flex items-center p-4"
                    onSubmit={commentPost}
                  >
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
                    {comment.length <= 300 ? (
                      <div className="text-sm font-extralight">
                        {comment.length}/300
                      </div>
                    ) : (
                      <div className="text-sm font-light text-red-600">
                        {comment.length}/300
                      </div>
                    )}

                    <button
                      className="font-semibold text-blue-400"
                      type="submit"
                    >
                      Post
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex items-center p-4">
                  <p>Log in first if you want to comment this post! </p>
                  <Link
                    className="font-semibold  ml-1"
                    textColor="blue.400"
                    type="link"
                    href="/login"
                  >
                    Log in!
                  </Link>
                </div>
              )}
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
        <Modal onClose={onCloseShare} isOpen={isOpenShare} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Center>Delete Post?</Center>
            </ModalHeader>
            <ModalBody>
              <Divider />
              <WhatsappShareButton url={`http://localhost:3000/post/${id}`}>
                <Link>wazap</Link>
              </WhatsappShareButton>
              <Divider />
              <Center>
                <FacebookShareButton
                  url={`https://e99b-2001-448a-2002-bd9c-3d84-561f-7e6-12f4.ap.ngrok.io/post/44`}
                >
                  <Link>fezbuk</Link>
                </FacebookShareButton>
              </Center>
              <Divider />
              <Center>
                <TwitterShareButton url={`http://localhost:3000/post/${id}`}>
                  <Link>twitter</Link>
                </TwitterShareButton>
              </Center>
              <Divider />
              <Divider />
              <Center>
                <Link
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `http://localhost:3000/post/${id}`
                    );
                  }}
                >
                  Copy link to clipboard
                </Link>
              </Center>

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
    </>
  );
};

// export async function getServerSideProps() {
//   // return the properties so they are available in the `Index` component
//   return {
//     props: {},
//   };
// }

export default PostDetail;
