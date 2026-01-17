import { useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function PostDetailsPage({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(posts.find((p) => p.id.toString() === id));

  if (!post) return <p>Post not found.</p>;

  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://week-7-assignment-g4db.onrender.com/update-post/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
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
        setPost((prev) => ({ ...prev, likecount: prev.likecount + 1 }));
      }
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://week-7-assignment-g4db.onrender.com/delete-post/${post.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.request === "success") {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="main-post-details-page">
      <h2>Post Details</h2>
      <div className="post-details-page">
        <p className="post-content">Creator: {post.creator}</p>
        <p className="post-content">Description: {post.description}</p>
        <p className="post-content">Category: {post.category}</p>
        <div className="like-delete-container">
          <p className="likecount">Likes: {post.likecount}</p>
          <button className="like-delete-btn" onClick={handleLike}>
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/pastel-glyph/64/facebook-like--v1.png"
              alt="facebook-like--v1"
            />
          </button>
          <button className="like-delete-btn" onClick={handleDelete}>
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/carbon-copy/50/filled-trash.png"
              alt="filled-trash"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
