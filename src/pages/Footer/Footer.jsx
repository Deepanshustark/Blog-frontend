import React from "react";
import "./Footer.css";
// import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <h2>Blogify</h2>
          <p>Share your thoughts with the world 🌍</p>
        </div>

        {/* Middle Section */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Create Post</li>
            <li>Dashboard</li>
          </ul>
        </div>

        <div className="footer-socials">
  <h4>Follow Me</h4>
 <div className="social-icons">
  <a href="https://github.com/Deepanshustark" target="_blank">
    <i className="fa-brands fa-github"></i>
  </a>
  <a href="https://www.facebook.com/profile.php?id=100055512112749" target="_blank">
    <i className="fa-brands fa-facebook"></i>
  </a>
  <a href="https://www.linkedin.com/in/deepanshustark/" target="_blank">
    <i className="fa-brands fa-linkedin"></i>
  </a>
</div>
  
  
  
    
  

</div>

        {/* Right Section */}
        <div className="footer-right">
          <h4>Contact</h4>
          <p>Email: deepusinghstark@gmail.com</p>
          <p>Made with ❤️ by Deepanshu</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Blogify. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
