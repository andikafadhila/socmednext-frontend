import Header from "../../components/Header";
import Bio from "../../components/Bio";
import { useRouter } from "next/router";

const profile = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Header />
      <Bio />
    </div>
  );
};

export default profile;
