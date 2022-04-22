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
  PhotographIcon,
  CameraIcon,
} from "@heroicons/react/outline";
import {
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
  Box,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import API_URL from "./apiurl";
import { useState } from "react";
import Slider from "react-slick";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

function Header() {
  const router = useRouter();
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const logoutHandler = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  const { profilepic } = useUser();

  const avatar = profilepic
    ? `${API_URL}${profilepic}`
    : `${API_URL}/avatar/default.jpg`;

  const {
    isOpen: isUploadopen,
    onOpen: onUploadopen,
    onClose: onUploadclose,
  } = useDisclosure();

  const [selectedImage, setselectedImage] = useState([]);
  console.log(selectedImage);

  // postingan
  const onFileChange = (e) => {
    // console.log("e.target.files[0]", e.target.files[0]);
    if (e.target.files[0]) {
      setselectedImage([...selectedImage, e.target.files[0]]);
    }
  };

  const submitPost = async () => {
    try {
      let token = Cookies.get("token");
      let formData = new FormData();
      let insertData = {
        caption: caption,
      };

      for (let i = 0; i < selectedImage.length; i++) {
        formData.append(`image`, selectedImage[i]);
      }

      await axios.all([
        axios.put(`${API_URL}/edit`, formData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      ]);

      await toast.success("Posting successfull!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-10">
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
          <Link href="/">
            <HomeIcon className="navBtn" />
          </Link>
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <div className="relative navBtn">
            <PaperAirplaneIcon className="navBtn rotate-45" />
            <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full justify-center animate-pulse text-white">
              10
            </div>
          </div>

          <PlusCircleIcon className="navBtn" onClick={onUploadopen} />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
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
        </div>
      </div>

      {/* Modal upload image */}
      <Modal isOpen={isUploadopen} onClose={onUploadclose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <input
                className="hidden"
                type="file"
                id="image"
                onChange={onFileChange}
              />
              <label for="image">
                <PhotographIcon className="hover:scale-105 hover:cursor-pointer transition-all duration-150 ease-out h-72" />
              </label>
              {selectedImage.map((val) => {
                return (
                  <img
                    src={URL.createObjectURL(val)}
                    className="object-cover w-full aspect-square"
                  />
                );
              })}
            </Center>

            <Center>
              <p className="text-4xl">Upload Photo</p>
            </Center>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onUploadclose}>
                Upload
              </Button>
              <Button variant="ghost">Next</Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
      {/* Modal upload image */}
    </div>
  );
}

export default Header;
