import FilterContainer from "./FilterContainer";
import PostsContainer from "./PostsContainer";
import { useState } from "react";

export default function MainSection({ posts }) {
  const [filter, setFilter] = useState("");

  let filteredPosts = posts;
  if (filter && filter !== "") {
    filteredPosts = posts.filter((post) => post.category === filter);
  }

  return (
    <div className="main">
      <FilterContainer filter={filter} setFilter={setFilter} />
      <PostsContainer posts={filteredPosts} />
    </div>
  );
}
