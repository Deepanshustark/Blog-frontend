import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Dashboard.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  
  const [search,setSearch] =  useState("")
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER
    const filteredPost = posts.filter((post) => {
    if (search.trim() === "") return true;

    return (
      (post.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (post.content || "").toLowerCase().includes(search.toLowerCase()) ||
     ( post.author.email || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCreate = () => {
    navigate("/api/posts/create");
  };

  const fetchPost = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    try {
      const res = await fetch("http://localhost:8080/api/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (res.status === 401) {
        console.log("Unauthorized! Token may be invalid or expired");
        setLoading(false);
        return;
      }
      const p = await res.json();
      setTimeout(() => {
        setPosts(p);
        setLoading(false);
      }, 1500);
    } catch (error) {
      alert("unable to fatch post");
      setLoading(true);
    }
  };

  //handle like

  const handleLike = async (postId) => {
    console.log(postId);
    try {
      const res = await fetch(
        `http://localhost:8080/api/posts/like/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      const likePost = await res.json();
      console.log("like post", likePost);

      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p._id !== postId) return p;
          return {
            ...p,
            likes: likePost.likes || [],
          };
        }),
      );
    } catch (error) {
      console.log("Unable to toggle error", error);
    }
  };

  useEffect(() => {
   fetchPost()
  }, []);

  return (
    <div className="dashboard">
      {/* User Info */}
      <div className="user-card">
        {loading ? (
          <>
            <Skeleton height={30} width={150} />

            <div style={{ margin: "10px 0" }}>
              <Skeleton circle height={50} width={50} />
            </div>

            <Skeleton height={20} width="60%" />
            <Skeleton height={20} width="80%" />

            <Skeleton height={40} width={150} style={{ marginTop: "10px" }} />
          </>
        ) : (
          <>
            <h2>Welcome 👋</h2>

            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {user ? (
              <>
                <p>
                  <strong>Name:</strong> {user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
              </>
            ) : (
              <p style={{ color: "#fca5a5" }}>No user data found ⚠️</p>
            )}

            <button onClick={handleCreate}>+ Create Post</button>
          </>
        )}
      </div>
      <div className="search-container">
  <div className="search-box">
    <input
      type="text"
      placeholder="🔍 Search posts..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-input"
    />

    {/* Cancel Button */}
    {search && (
      <button
        className="clear-btn"
        onClick={() => setSearch("")
 
        }

      >
        ✖
      </button>
    )}
  </div>
</div>

      {/* Posts */}
      <div className="posts-container">
        {loading ? (
          Array(6)
            .fill()
            .map((_, i) => (
              <div className="post-card" key={i}>
                <Skeleton height={180} />

                <div className="post-content">
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={15} width="60%" />
                  <Skeleton height={15} width="40%" />
                </div>
              </div>
            ))
        ) : filteredPost.length === 0 ? (
          <p style={{ textAlign: "center" }}>
  {search ? "No results found 😢" : "No posts available"}
</p>
        ) : (
          filteredPost.map((post) => (
            <div
              className="post-card"
              key={post?._id}
              onClick={() => navigate(`/posts/${post?._id}`)}
              style={{ cursor: "pointer" }}
            >
              {/* Safe Image */}
              <img
                src={post?.image || "https://via.placeholder.com/300"}
                alt="post"
              />

              <div className="post-content">
                {/* Safe Title */}
                <h3>{post?.title || "No Title"}</h3>

                {/* Safe Content */}
                <p>
                  {post?.content
                    ? post.content.slice(0, 100) + "..."
                    : "No content available"}
                </p>

                {/* Safe Author */}
                <span>By {post?.author?.email || "Unknown user"}</span>
                <div className="likescontainer">
                     <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(post._id);
                  }}
                  className={`like-button ${post.likes?.some((id) => id.toString() === user._id) ? "liked" : ""}`}
                >
                  ❤️ 
                  
                </button>
                <div className="countLikes">
                  {post.likes?.length || 0}
                </div>
                </div>
               
                
                <h3><i class="fa-solid fa-eye"></i> {post.views}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
