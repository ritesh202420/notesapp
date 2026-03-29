import React from "react";

const Navbar = ({ page, setPage }) => {

  const handleHomeClick = () => {
    if (localStorage.getItem("token")) {
      setPage("home");
    } else {
      setPage("login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <button className="navbar-brand btn" onClick={handleHomeClick}>
          iNotebook
        </button>

        {/* Hamburger toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className={`nav-link btn ${page === "home" ? "active" : ""}`}
                onClick={handleHomeClick}
              >
                Home
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link btn ${page === "about" ? "active" : ""}`}
                onClick={() => setPage("about")}
              >
                About
              </button>
            </li>
          </ul>

          {/* Right Buttons */}
          <div className="d-flex gap-2">
            {!isLoggedIn && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => setPage("login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setPage("signin")}
                >
                  Signup
                </button>
              </>
            )}

            {isLoggedIn && (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
