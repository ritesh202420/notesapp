import React, { useEffect } from "react";
import Notes from "./Notes";

const Home = ({ showAlert, setPage }) => {

  useEffect(() => {
    // 🔐 Redirect to login if no token
    if (!localStorage.getItem("token")) {
      setPage("login");
      showAlert("Please login to access Notes", "danger");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {localStorage.getItem("token") && (
        <div>
          <Notes showAlert={showAlert} />
        </div>
      )}
    </>
  );
};

export default Home;
