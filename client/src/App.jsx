import "./App.css";
import MainSection from "./components/MainSection";
import NotFoundPage from "./components/NotFoundPage";
import PostDetailsPage from "./components/PostDetailsPage";
import CreateAPostPage from "./components/CreateAPostPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8080/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainSection posts={posts} />} />
        <Route path="Create" element={<CreateAPostPage />} />
        <Route
          path="PostDetails/:id"
          element={<PostDetailsPage posts={posts} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
