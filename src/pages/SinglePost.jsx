import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SinglePage.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  // delete functionality

  const handleDelete = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return; // ❌ user cancelled
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      if (!data) {
        alert("post cannot be deleted");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  //handle comment
  const handleComment = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };
  //handleComments
  const handleComments = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/post/comment/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });
      const data = await res.json();
      if (!data) {
        console.log("comment res failed");
      }
      console.log("comment added");
      console.log(comments);
    } catch (error) {
      console.log("comment post error");
    }
  };
  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/post/comment/${id}`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.log("unable to fetch comments");
    }
  };

  // download image 
  const handleDownload = async (postImage,postTitle)=>{
    
    try {
  
      const a= document.createElement("a")
      a.href=postImage
      a.download=`${post.Title}.jpg`
      a.target = "_blank";
      document.body.appendChild(a)
      a.click()
      a.remove()

    } catch (error) {
      console.log("handle download error "+ error)
    }
  }


  const fetchPost = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("USER", user);
    console.log("USER token", user.token);
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const post = await res.json();
      setTimeout(() => {
        setPost(post);
        setLoading(false);
      }, 2000);
    } catch (error) {
      alert("post not fatched");
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  if (loading) {
    return (
      <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        <div className="single-post-container">
          {/* Back Button */}
          <div className="back-btn">
            <Skeleton height={35} width={100} />
          </div>

          {/* Post Card */}
          <div className="post-card-full">
            {/* Image */}
            <Skeleton height={300} className="post-image" />

            {/* Content */}
            <div className="post-details">
              <Skeleton height={35} width="70%" /> {/* title */}
              <Skeleton count={3} /> {/* content */}
              {/* Author */}
              <div className="author">
                <Skeleton height={20} width="40%" />
                <Skeleton height={15} width="60%" />
              </div>
            </div>
          </div>

          {/* Buttons (Delete/Edit) */}
          <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
            <Skeleton height={40} width={120} />
            <Skeleton height={40} width={120} />
          </div>

          {/* Comments Section */}
          <div className="comment-container">
            <Skeleton height={25} width="30%" /> {/* "Comments" title */}
            {/* Input + button */}
            <Skeleton height={40} style={{ marginTop: "10px" }} />
            <Skeleton height={40} width={120} style={{ marginTop: "10px" }} />
            {/* Comment List */}
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="comment-item">
                <div className="comment-header">
                  <div>
                    <Skeleton height={15} width={100} />
                    <Skeleton height={12} width={150} />
                  </div>
                  <Skeleton height={12} width={80} />
                </div>

                <Skeleton height={15} width="90%" />
              </div>
            ))}
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="single-post-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <span className="arrow">⬅</span> Back
      </button>
      <button onClick={()=>{handleDownload(post.image,post.title)}} className="download-image"> ⬇️ Download image</button>
     
      <div className="post-card-full">
        {/* IMAGE */}
        <img src={post?.image} alt="" className="post-image" />

        {/* CONTENT */}
        <div className="post-details">
          <h1>{post.title}</h1>
          <p>{post.content}</p>

          <div className="author">
            <h4>By: {post?.author?.name}</h4>
            <span>{post?.author?.email}</span>
          </div>
        </div>
      </div>
      {post?.author?._id === user?.id && (
        <button className="delete-btn" onClick={handleDelete}>
          🗑 Delete Post
        </button>
      )}
      {post?.author?._id === user?.id && (
        <button
          className="edit-btn"
          onClick={() => {
            navigate(`/posts/edit/${id}`);
          }}
        >
          ✏️ Edit Post
        </button>
      )}

      <div className="comment-container">
        <form action="" onSubmit={handleComments}>
          <h3>Comments</h3>
          <input
            type="text"
            placeholder="show your thoughts"
            name="comment"
            value={comment}
            onChange={handleComment}
          />
          <button type="submit">Comment</button>
        </form>
        <div className="comment-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="comment-item">
                <div className="comment-header">
                  <div>
                    <strong className="username">{c.userId?.name}</strong>
                    <p className="email">{c.userId?.email}</p>
                  </div>
                  <span className="time">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="comment-text">{c.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
