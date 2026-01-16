import { Link } from "react-router";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <h1>Forum</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Create">Create Post</Link>
        </nav>
      </div>
    </>
  );
}
