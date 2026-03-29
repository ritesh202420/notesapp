import NoteContext from "./Notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  // 🔐 Use JWT without login (for testing)
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyNzA0NWM2NzE5Y2Q5YTAzNDgyYmYzIn0sImlhdCI6MTc2NDE2NDcwMH0.DshbbrkiPo8M2PPU67P_beHydn9f2EGJ-SKBOmDa-RQ";

  const [notes, setNotes] = useState([]);

  // 📥 Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // ➕ Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes((prev) => prev.concat(note));
  };

  // 🗑️ Delete a Note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  // ✏️ Edit a Note
  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    setNotes((prev) =>
      prev.map((note) =>
        note._id === id
          ? { ...note, title, description, tag }
          : note
      )
    );
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
