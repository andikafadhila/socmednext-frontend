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
} from "@heroicons/react/outline";
import { Menu, MenuButton, MenuItem, Button, MenuList } from "@chakra-ui/react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const logoutHandler = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-10">
      <div className="flex justify-between max-w-6xl bg-white mx-5 xl:mx-auto">
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
          <PlusCircleIcon className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          <Menu>
            <MenuButton as={Button} bg="white" rounded="full">
              <img
                src="https://foto.wartaekonomi.co.id/files/arsip_foto_2019_11_16/otomotif_215524_small.jpg"
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
    </div>
  );
}

export default Header;
