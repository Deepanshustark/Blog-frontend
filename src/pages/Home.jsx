import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1>🚀 Welcome to Blogify</h1>
        <p>
          Share your thoughts, explore amazing ideas, and connect with people
          around the world.
        </p>

        <div className="hero-buttons">
          <button onClick={() => navigate("/signup")}>Get Started</button>
          <button onClick={() => navigate("/login")} className="outline">
            Login
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card">
          <h3>✍️ Create Posts</h3>
          <p>Write and share your ideas with the world.</p>
        </div>

        <div className="feature-card">
          <h3>🌍 Public & Private</h3>
          <p>Control who can see your content.</p>
        </div>

        <div className="feature-card">
          <h3>💬 Engage</h3>
          <p>Like, comment, and interact with others.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
