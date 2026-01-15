import { Link } from "react-router";

export default function PostsContainer({ posts }) {
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
                <p className="post-creator">Creator: {post.creator}</p>
                <p className="post-description">
                  Description: {post.description}
                </p>
                <p className="post-category">Category: {post.category}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}
