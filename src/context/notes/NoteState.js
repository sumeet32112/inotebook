import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // Get all Note
    const getNotes = async() => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
           method: 'GET',

           headers: {
               'Content-Type': 'application/json',
               'auth-token':localStorage.getItem('token')
           }
       });
       const json = await response.json()
       setNotes(json)
   }

    // Add a Note
    const addNote = async(title, description, tag) => {
         //API Call
         const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json()
       console.log(json)
        const note = {
            "_id": "6264f9a2e1b7473685d8ceef",
            "user": "6263bb96cda45e2f2ee422cf",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-04-24T07:17:54.045Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    // Delete a Note
    const deleteNote = async(id) => {
         //API Call
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
        });
        const json = await response.json()
       console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
       console.log(json)
    
       let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit client
    for (let index = 0; index <newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
        }
    }
    setNotes(newNotes);
}

return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;

