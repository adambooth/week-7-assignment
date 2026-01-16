import { Link, useNavigate } from "react-router";
import { useState } from "react";

export default function PostsContainer({ posts }) {
  const navigate = useNavigate();

  const handleLike = async (post) => {
    try {
      const response = await fetch(
        `http://localhost:8080/update-post/${post.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            creator: post.creator,
            description: post.description,
            category: post.category,
            likecount: post.likecount + 1,
          }),
        }
      );

      const data = await response.json();
      if (data.request === "success") {
        // Optionally you can refresh posts from parent
        window.location.reload(); // simplest way for now
      }
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/delete-post/${postId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.request === "success") {
        window.location.reload(); // simplest way
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <>
      <h2 className="posts-subtitle">Posts</h2>
      <div className="posts-container">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-template">
              <Link to={`/PostDetails/${post.id}`} className="post-link">
                <p className="post-creator post-content">
                  Creator: {post.creator}
                </p>
                <p className="post-description post-content">
                  Description: {post.description}
                </p>
                <p className="post-category post-content">
                  Category: {post.category}
                </p>
              </Link>
              <div className="like-delete-container">
                <p> Likes : {post.likecount}</p>
                <button onClick={() => handleLike(post)}>Like Post</button>
                <button onClick={() => handleDelete(post.id)}>
                  Delete Post
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
