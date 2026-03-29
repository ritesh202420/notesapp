import React, { useState } from "react";

const Login = ({ showAlert, setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      // ❌ LOGIN FAILED
      if (!response.ok) {
        setError(json.message || "Invalid email or password");
        showAlert("Invalid credentials", "danger");
        return;
      }

      // ✅ LOGIN SUCCESS
      localStorage.setItem("token", json.token);
      showAlert("Logged in successfully", "success");

      // ✅ OPEN APP (HOME)
      setPage("home");

    } catch (err) {
      setError("Server error. Try again later.");
      showAlert("Server error. Try again later.", "danger");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form onSubmit={handleSubmit} className="w-25">
        <h3 className="text-center mb-4">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email address</label>
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

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
