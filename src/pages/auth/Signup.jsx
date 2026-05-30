import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        email,
        password: pass,
        name,
      });
      console.log(res);
      if (res.data.message == "account create successfull") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <h2>Signup Form</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          required
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="Enter email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label>Password</label>
        <input
          type="password"
          required
          placeholder="Enter password"
          value={pass}
          onChange={(event) => {
            setPass(event.target.value);
          }}
        />

        <button type="submit">Signup</button>
        <hr />
        <span>Create new account ?&nbsp;</span>
        <a href="/login">Login</a>
      </form>
    </div>
  );
}

export default Signup;
