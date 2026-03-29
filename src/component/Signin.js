import React, { useState } from "react";

const Signin = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Confirm password check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      props.showAlert("Passwords do not match.", "danger");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            email,
            password,
          }),
        }
      );

      const json = await response.json();

      if (!response.ok || json.success === false) {
        setError(json.message || "Registration failed");
        props.showAlert(json.message || "Registration failed.", "danger");
        return;
      }

      // ✅ SUCCESS
      console.log("User created:", json);
      props.showAlert("Account created successfully.", "success");

      // Optional: store token
      // localStorage.setItem("token", json.token);

      // Redirect
      window.location.href = "/dashboard.html";

    } catch (err) {
      setError("Server error. Try again later.");
      props.showAlert("Server error. Try again later.", "danger");
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow" style={{ width: "420px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Sign Up</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
