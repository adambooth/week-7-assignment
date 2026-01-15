import FilterContainer from "./FilterContainer";
import PostsContainer from "./PostsContainer";
import { useState, useEffect } from "react";

export default function MainSection() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8080/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  let filteredPosts = posts;

  if (filter && filter !== "") {
    filteredPosts = posts.filter((post) => post.category === filter);
  }

  return (
    <>
      <div className="main">
        <FilterContainer filter={filter} setFilter={setFilter} />
        <PostsContainer posts={filteredPosts} />
      </div>
    </>
  );
}
