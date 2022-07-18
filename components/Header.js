import Image from "next/image";
import PhotoLab from "../public/PhotoLab.png";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HomeIcon,
  XCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/outline";
import {
  Text,
  Menu,
  MenuButton,
  MenuItem,
  Button,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Textarea,
  HStack,
  Box,
  IconButton,
  useBreakpointValue,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import API_URL from "./apiurl";
import { useState } from "react";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";

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

function Header({ submitPostParent }) {
  const { isVerified, isLogin } = useUser();
  const dispatch = useDispatch();

  // setting for react-slick
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const router = useRouter();

  // button to logout
  const logoutHandler = async () => {
    Cookies.remove("token"); //removing cookies
    await router.push("/login"); //push user back to login page
    dispatch({ type: "LOGOUT" });
  };

  const { profilepic, username } = useUser();

  // if user don't have any avatar uploaded yet, it will render default avatar
  const avatar = profilepic
    ? `${API_URL}${profilepic}`
    : `${API_URL}/avatar/default.jpg`;

  //chakra ui modal for posting
  const {
    isOpen: isUploadopen,
    onOpen: onUploadopen,
    onClose: onUploadclose,
  } = useDisclosure();

  const closeModal = () => {
    Router.push("/");
  };

  const [selectedImage, setselectedImage] = useState([]);
  console.log(selectedImage);

  // postingan
  const [inputCaption, setInputCaption] = useState("");

  const [allValid, setAllValid] = useState(false);

  console.log(inputCaption);

  const inputCaptionHandler = (e) => {
    setInputCaption(e.target.value);
  };

  const onFileChange = (e) => {
    // console.log("e.target.files[0]", e.target.files[0]);
    if (e.target.files[0]) {
      setselectedImage([...selectedImage, e.target.files[0]]);
    }
  };

  const submitPost = async () => {
    try {
      let formData = new FormData();
      let insertData = {
        caption: inputCaption,
      };

      for (let i = 0; i < selectedImage.length; i++) {
        formData.append(`image`, selectedImage[i]);
      }
      formData.append("caption", insertData.caption);
      console.log("iniformdata", formData);
      await submitPostParent(formData);
      setInputCaption("");
    } catch (error) {
      console.log(error);
    } finally {
      onUploadclose();
    }
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-4xl bg-white mx-5 xl:mx-auto">
        {/* Left */}
        <div className="relative hidden lg:inline-grid w-24">
          <Image src={PhotoLab} layout="fill" objectFit="contain" />
        </div>

        <div className="relative w-10 h-10 lg:hidden flex-shrink-0">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Middle - Search input field */}

        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center justify-end space-x-4">
          {isLogin ? (
            <>
              {isVerified ? (
                <>
                  <Link href="/">
                    <HomeIcon className="navBtn" />
                  </Link>
                  <MenuIcon className="h-6 md:hidden cursor-pointer" />
                  <div className="relative navBtn">
                    <PaperAirplaneIcon className="navBtn rotate-45" />
                    <div className="absolute -top-1 -right-2 text-center text-xs w-5 h-5 bg-red-500 rounded-full justify-center animate-pulse text-white">
                      10
                    </div>
                  </div>

                  <PlusCircleIcon className="navBtn" onClick={onUploadopen} />
                  <UserGroupIcon className="navBtn" />
                  <HeartIcon className="navBtn" />
                </>
              ) : null}

              <Menu>
                <MenuButton as={Button} bg="white" rounded="full">
                  <img
                    src={avatar}
                    alt="profile picture"
                    className="h-10 w-10 object-cover rounded-full cursor-pointer"
                  />
                </MenuButton>
                <MenuList>
                  <Link href="/userProfile">
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuItem color="red" onClick={logoutHandler}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Link href="/login">
              <Button type="link">Log in</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Modal upload image */}
      <Modal
        isOpen={isUploadopen}
        onClose={onUploadclose}
        isCentered
        scrollBehavior="inside"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent height={"2xl"}>
          {/* <ModalHeader>Create a new post</ModalHeader> */}
          <ModalBody>
            <div>
              <div>
                <input
                  className="hidden"
                  type="file"
                  id="image"
                  onChange={onFileChange}
                />
                {!selectedImage.length ? (
                  <div className="flex-col">
                    <Tooltip label="Click me to upload your image">
                      <label htmlFor="image">
                        <PlusCircleIcon className="w-1/4 mx-auto my-20 hover:cursor-pointer hover:scale-105 transition-all duration-150 ease-out" />
                      </label>
                    </Tooltip>
                  </div>
                ) : null}
                <Slider {...settings}>
                  {selectedImage.map((val, index) => {
                    return (
                      <div className="relative mt-3" key={index}>
                        <div>
                          <img
                            src={URL.createObjectURL(val)}
                            className="object-cover w-full aspect-square relative"
                          />
                        </div>
                        {selectedImage.length < 4 ? (
                          <label htmlFor="image">
                            <PlusCircleIcon className="navBtn absolute left-9 top-3 text-white" />
                          </label>
                        ) : null}
                        <MinusCircleIcon
                          z={10}
                          className="navBtn absolute left-3 top-3 text-white"
                          onClick={() => {
                            setselectedImage(
                              selectedImage.filter((e) => e !== val)
                            );
                          }}
                        />
                        <div className="absolute top-3 right-3 text-xs w-5 h-5 bg-blue-600 rounded-full text-white text-center">
                          {index + 1}
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 object-cover rounded-full border p-[2px] "
                    src={`${API_URL}${profilepic}`}
                    alt=""
                  />
                  <h2 className="font-semibold text-lg">{username}</h2>
                </div>
                <Textarea
                  placeholder="write a caption..."
                  className="mt-2"
                  onChange={inputCaptionHandler}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitPost}>
              Post
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onUploadclose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal upload image */}
      <ToastContainer />
    </div>
  );
}

export default Header;
