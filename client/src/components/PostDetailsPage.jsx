import { useParams } from "react-router";

export default function PostDetailsPage({ posts }) {
  const { id } = useParams();

  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="post-details-page">
      <h2>Post Details</h2>
      <p>
        <strong>Creator:</strong> {post.creator}
      </p>
      <p>
        <strong>Description:</strong> {post.description}
      </p>
      <p>
        <strong>Category:</strong> {post.category}
      </p>
    </div>
  );
}
