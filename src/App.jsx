
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
import Header from "./pages/header/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";
import Footer from "./pages/Footer/Footer";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/api/posts/create" element={<CreatePost />}></Route>
        <Route path="/posts/:id" element={<SinglePost />}></Route>
        <Route path="/posts/edit/:id" element={<EditPost />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
