import React, { useState } from "react";
import "./App.css";

import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./contex/notes/Notesate";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signin from "./component/Signin";

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "home" : "login"
  );

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 1500);
  };

  return (
    <NoteState>
      <Navbar setPage={setPage} />
      <Alert alert={alert} />

      {page === "home" && <Home showAlert={showAlert} />}
      {page === "about" && <About />}

      {page === "login" && (
        <Login showAlert={showAlert} setPage={setPage} />
      )}

      {page === "signin" && (
        <Signin showAlert={showAlert} setPage={setPage} />
      )}
    </NoteState>
  );
}

export default App;
