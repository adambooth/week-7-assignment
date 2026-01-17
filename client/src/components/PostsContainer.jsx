import { Link, useNavigate } from "react-router";

export default function PostsContainer({ posts }) {
  const navigate = useNavigate();

  const handleLike = async (post) => {
    try {
      const response = await fetch(
        `https://week-7-assignment-g4db.onrender.com/update-post/${post.id}`,
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
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `https://week-7-assignment-g4db.onrender.com/delete-post/${postId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.request === "success") {
        window.location.reload();
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
                <p className="likecount"> Likes : {post.likecount}</p>
                <button
                  className="like-delete-btn"
                  onClick={() => handleLike(post)}
                >
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/pastel-glyph/64/facebook-like--v1.png"
                    alt="facebook-like--v1"
                  />
                </button>
                <button
                  className="like-delete-btn"
                  onClick={() => handleDelete(post.id)}
                >
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/carbon-copy/50/filled-trash.png"
                    alt="filled-trash"
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
