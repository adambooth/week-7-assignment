import { Link } from "react-router";

export default function Header({ refreshPosts }) {
  return (
    <div className="header">
      <h1>Forum</h1>
      <nav>
        <Link to="/" onClick={() => refreshPosts()}>
          Home
        </Link>
        <Link to="/Create">Create Post</Link>
      </nav>
    </div>
  );
}
