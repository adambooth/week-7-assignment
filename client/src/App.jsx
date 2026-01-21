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

  const fetchPosts = async () => {
    const response = await fetch(
      "https://week-7-assignment-g4db.onrender.com/posts",
    );
    const data = await response.json();
    setPosts(data);
    console.log("refreshed posts on timer");
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 1000);
    console.log("refreshed posts");
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header refreshPosts={fetchPosts} />
      <Routes>
        <Route path="/" element={<MainSection posts={posts} />} />
        <Route path="/Create" element={<CreateAPostPage />} />
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
