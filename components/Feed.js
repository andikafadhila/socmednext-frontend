import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Suggestions from "./Suggestions";

function Feed({ fetchDataOnScrollParent }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-4xl mx-auto">
      <section className="col-span-2">
        {/* Post */}
        <Posts fetchDataOnScrollParent={fetchDataOnScrollParent} />
      </section>

      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
}

export default Feed;
