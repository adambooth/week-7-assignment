import { Link } from "react-router";

function NotFoundPage() {
  return (
    <>
      <div className="not-found-container">
        <h1>404 Page Not Found</h1>
        <Link to="/">Go Home</Link>
      </div>
    </>
  );
}

export default NotFoundPage;
