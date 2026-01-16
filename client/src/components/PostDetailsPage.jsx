import { useParams } from "react-router";

export default function PostDetailsPage({ posts }) {
  const { id } = useParams();

  // Find the post from props
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="main-post-details-page">
      <h2>Post Details</h2>
      <div className="post-details-page">
        <p className="post-content">Creator: {post.creator}</p>
        <p className="post-content">Description: {post.description}</p>
        <p className="post-content">Category: {post.category}</p>
      </div>
    </div>
  );
}
