import { Link } from "react-router";

export default function Header() {
  return (
    <>
      <div className="header">
        <h1>Forum</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Create">Create Post</Link>
        </nav>
      </div>
    </>
  );
}
