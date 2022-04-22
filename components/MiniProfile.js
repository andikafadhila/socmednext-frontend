import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import API_URL from "./apiurl";

function MiniProfile() {
  const router = useRouter();
  const logoutHandler = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const { username, profilepic } = useUser();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="w-16 h-16 object-cover rounded-full border p-[2px] "
        src={`${API_URL}${profilepic}`}
        alt=""
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram!</h3>
      </div>

      <button
        className="text-blue-400 text-sm font-semibold"
        onClick={logoutHandler}
      >
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
