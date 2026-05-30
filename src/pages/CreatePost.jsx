import React, { useState } from "react";
import "./CreatePost.css";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function CreatePost() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
    isPublic: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPost((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(post);
  };
  const handleSubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    try {
      const res = await fetch("http://localhost:8080/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      if (!data) {
        alert("Post creation error");
      } else {
        alert("Post create successfulls");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("something went wrong");
    }
  };

  return (
    <>
      <div className="header-createpost"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // ✅ center horizontally
          padding: "15px",
          color: "blue",
          position: "relative", // 🔥 important
        }}
      >
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
          style={{ position: "absolute", left: "15px" }} // keep left
        >
          <span className="arrow">⬅</span> Back
        </button>

        <h2>Create Post</h2>
      </div>
      <div className="main">
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
              type="text"
              placeholder="enter title"
              required
              id="title"
              onChange={handleChange}
              name="title"
              value={post.title}
            />
            <br />
            <label htmlFor="content">Content :-</label>
            <br />
            <textarea
              name="content"
              id="content"
              placeholder="enter content"
              onChange={handleChange}
              value={post.content}
            ></textarea>
            <br />
            <label htmlFor="image">Image</label>
            <br />
            <input
              type="text"
              placeholder="enter image url"
              required
              id="image"
              onChange={handleChange}
              name="image"
              value={post.image}
            />
            <br />
            <div className="toggle-container">
              <span>{post.isPublic ? "🌍 Public" : "🔒 Private"}</span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={!post.isPublic} // 🔥 FIX
                  onChange={() =>
                    setPost((prev) => ({
                      ...prev,
                      isPublic: !prev.isPublic,
                    }))
                  }
                />
                <span className="slider"></span>
              </label>
            </div>
            <br />
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
