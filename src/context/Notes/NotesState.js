

import { useState } from "react";
import NoteContext from "./NotesContext";

  
  const NoteState = (props)=>{


    const noteinitial = [
        {
          "_id": "61ef2620b1b44ac48f7ed587",
          "user": "61edcaa0e0ae0671a5dc4795",
          "title": "youtube",
          "description": "its create list",
          "tag": "playinh",
          "date": "2022-01-24T22:20:16.876Z",
          "__v": 0
        },
        {
          "_id": "61ef2620b1b44ac48f7ed587",
          "user": "61edcaa0e0ae0671a5dc4795",
          "title": "youtube",
          "description": "its create list",
          "tag": "playinh",
          "date": "2022-01-24T22:20:16.876Z",
          "__v": 0
        },
        {
          "_id": "61ef2620b1b44ac48f7ed587",
          "user": "61edcaa0e0ae0671a5dc4795",
          "title": "youtube",
          "description": "its create list",
          "tag": "playinh",
          "date": "2022-01-24T22:20:16.876Z",
          "__v": 0
        },
        {
          "_id": "61ef2620b1b44ac48f7ed587",
          "user": "61edcaa0e0ae0671a5dc4795",
          "title": "youtube",
          "description": "its create list",
          "tag": "playinh",
          "date": "2022-01-24T22:20:16.876Z",
          "__v": 0
        },
        {
          "_id": "61f30dbc587e7aca82fd7770",
          "user": "61edcaa0e0ae0671a5dc4795",
          "title": "goole",
          "description": "lets happen",
          "tag": "challengr",
          "date": "2022-01-27T21:25:16.237Z",
          "__v": 0
        }
      ]
     
      const [notes, setNotes] = useState(noteinitial);

 
    // Add Note 
    const addNote = (title,description,tag)=>{
      console.log("adding a note");
           const note =  {
            "_id": "61f30dbc587e7aca82fd7770",
            "user": "61edcaa0e0ae0671a5dc4795",
            "title":title,
            "description": description,
            "tag": tag,
            "date": "2022-01-27T21:25:16.237Z",
            "__v": 0
          }
          setNotes(notes.concat(note))
    }

    // delete Note
    const deleteNote = (id)=>{
      console.log("this id is deleted",id);
      let newNote = notes.filter((ele)=>{return ele._id!=id})
      setNotes(newNote)
    }

    // update note
    const updateNote = ()=>{

    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,updateNote}}>
           {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState