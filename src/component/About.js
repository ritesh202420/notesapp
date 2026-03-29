import React, { useContext } from "react";
import notecontext from "../contex/notes/Notecontext";
import "./About";

const About = () => {
  const context = useContext(notecontext);

  return (
    <div className="container my-5">
      <div className="card shadow-lg about-card">
        <div className="card-body text-center">
          <h2 className="card-title mb-3 text-primary">
            About iNotebook App
          </h2>

          <p className="card-text">
            iNotebook is a modern note-taking web application built using
            <strong> React, Context API, Node.js, Express, MongoDB</strong>.
            It allows users to securely create, edit, delete, and manage
            their personal notes from anywhere.
          </p>

          <p className="card-text">
            This app focuses on simplicity, speed, and security while
            providing a clean and responsive user interface using
            <strong> Bootstrap</strong>.
          </p>

          <span className="badge bg-success mt-2">
            Version 1.0
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
