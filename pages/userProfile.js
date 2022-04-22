import Header from "../components/Header";
import Bio from "../components/Bio";
import Posts from "../components/Posts";
const profile = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Header />
      <Bio />
      <div className="w-2/4 mx-auto">
        <Posts />
      </div>
    </div>
  );
};

export default profile;
