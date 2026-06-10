import React, { useState } from "react";
import "./CreatePost.css";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getToken } from "../utils/auth";

function CreatePost() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    image: null,
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
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("content", post.content);
  formData.append("isPublic", post.isPublic);
 if (post.image) {
  formData.append("image", post.image);
}

  try {
    const res = await fetch(
      "https://blog-backend-wkan.onrender.com/api/posts/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Post created successfully");
      navigate("/dashboard");
    } else {
      alert(data.message || "Error creating post");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

  return (
    <>
      <div
        className="header-createpost"
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
              type="file"
              placeholder="upload image..."
              required
              accept="image/*"
              id="image"
              onChange={(e) => {
                setPost((prev) => ({
                  ...prev,
                  image: e.target.files?.[0],
                }));
              }}
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
