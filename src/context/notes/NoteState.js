// create state that are need in note context
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //   const s1 = {
  //     name: "Aaron",
  //     class: "5b",
  //   };
  //   const [state, setState] = useState(s1);

  // We can also pass functions to the state, such that we can update the state.
  //   const update = () => {
  //     setTimeout(() => {
  //       setState({
  //         name: "Lando",
  //         class: "50b",
  //       });
  //     }, 1000);
  //   };

  const notesIni = []

  // Get all notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  };

  //ADD A NOTE
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note));
    
    // notes.push updates an array
    //notes.concat creates a new array
  };

  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    const json = response.json();
    console.log(json)

    console.log("Delete the node with id"+id)
    const newNotes = notes.filter((note)=>{return note._id !== id})
    setNotes(newNotes) 
  };

  // Update a note
  const editNote = async (id,title, description, tag) => {
    // API call
    const url = host;
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json);

    let newnote = JSON.parse(JSON.stringify(notes))
    
    // Logic to edit in frontend
    for (let index = 0; index < newnote.length; index++) {
      const element = newnote[index];

      if (element._id === id) {
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }
    }
    setNotes(newnote);
  };

  const [notes, setNotes] = useState(notesIni);
  return (
    // <NoteContext.Provider value={{state, update}}>
    <NoteContext.Provider value={{ notes,getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
