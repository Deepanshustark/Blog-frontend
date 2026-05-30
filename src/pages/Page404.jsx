import { useNavigate } from "react-router-dom";
import "./Page404.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <h1 className="error-code">404</h1>

      <h2>Oops! Page not found 😕</h2>

      <p>The page you are looking for doesn’t exist or has been moved.</p>

      <button onClick={() => navigate("/")}>⬅ Back to Home</button>
    </div>
  );
}

export default NotFound;
