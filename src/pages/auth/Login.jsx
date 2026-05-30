import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://blog-backend-wkan.onrender.com/api/auth/login",
        {
          email,
          password: pass,
        },
      );

      // ✅ Store user info + token
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          token: data.token, // ✅ very important
        }),
      );

      // redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login Form</h2>

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

        <button type="submit">Login</button>
        <hr />
        <span>Create new account ?&nbsp;</span>
        <a href="/signup">Signup</a>
      </form>
    </div>
  );
}

export default Login;
