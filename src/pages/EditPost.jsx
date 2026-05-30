import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function EditPost() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [editPost, setEditPost] = useState({
    title: "",
    content: "",
    image: "",
    isPublic: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(editPost.title);
      console.log(editPost.content);
      console.log(editPost.image);
      console.log(editPost.isPublic);

      const res = await fetch(`https://blog-backend-wkan.onrender.com/api/posts/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(editPost),
      });
      const data = await res.json();
      if (res.ok) {
        alert("edit post successful");
        navigate(-1);
      } else {
        console.log(data);
        alert("edit post not successfull");
      }
    } catch (error) {
      console.log("esit post error", error);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditPost((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(editPost);
  };

  const fetchPost = async () => {
    const res = await fetch(`https://blog-backend-wkan.onrender.com/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const editPost = await res.json();
    console.log(editPost);
    setEditPost(editPost);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "#0f172a",
          color: "white",
          textAlign: "center",
        }}
      >
        <ArrowLeft
          size={28}
          style={{ cursor: "pointer", marginRight: "10px" }}
          onClick={() => navigate(-1)}
        />

        <h2>Edit Post</h2>
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
              value={editPost.title}
            />
            <br />
            <label htmlFor="content">Content :-</label>
            <br />
            <textarea
              name="content"
              id="content"
              placeholder="enter content"
              onChange={handleChange}
              value={editPost.content}
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
              value={editPost.image}
            />
            <br />
            <div className="toggle-container">
              <span>{editPost.isPublic ? "🌍 Public" : "🔒 Private"}</span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={!editPost.isPublic} // 🔥 FIX
                  onChange={() =>
                    setEditPost((prev) => ({
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

export default EditPost;
