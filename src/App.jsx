import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            (React & Laravel) Blog App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-white">
                      Logged in as {localStorage.getItem("email")}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="nav-link btn btn-link text-white"
                    >
                      Logout
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link text-white">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create" className="nav-link text-white">
                      Create Blog
                    </Link>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link text-white">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-white">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          {isLoggedIn && (
            <>
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/post/edit/:id" element={<EditPost />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
