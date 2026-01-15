import FilterContainer from "./FilterContainer";
import PostsContainer from "./PostsContainer";

export default function MainSection() {
  return (
    <>
      <div className="main">
        <FilterContainer />
        <PostsContainer />
      </div>
    </>
  );
}
