

import { useState } from "react";
import NoteContext from "./NotesContext";

  
  const NoteState = (props)=>{

  const host = "http://localhost:5000/"
    const noteinitial =[]
     
      const [notes, setNotes] = useState(noteinitial);
      
      // fetch notes 
      const fetchNote = async ()=>{
        const response = await fetch(`${host}api/notes/fetchnotes`, {
          method: 'GET', 
          
          headers: {
            'auth-token':localStorage.getItem('authtoken')
            
          },
        }); 
        const json = await response.json();
        
        setNotes(json)
      }
      
       
    // Add Note 
    const addNote = async (title,description,tag)=>{
     
      console.log(typeof(title.toString()));
      const response = await fetch('http://localhost:5000/api/notes/createNotes', {

        method: 'POST', 
        
        headers: {
         
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('authtoken')
          
        },
        body: JSON.stringify({"title":title.toString(),
        "description":description.toString(),
        "tag":tag.toString()}) 
      }); 
     const note = await response.json()
      setNotes(notes.concat(note))

      

      
          
    }

    // delete Note
    const deleteNote = async (id)=>{
      const response = await fetch(`${host}api/notes/deleteNotes/${id}`, {
        method: 'DELETE', 
        
        headers: {
          'auth-token':localStorage.getItem('authtoken')
          
        },
      }); 
      
      // console.log(json);

      
     
      let newNote = notes.filter((ele)=>{return ele._id!==id})
      setNotes(newNote)
    }

    // update note
    const updateNote = async (id,title,description,tag)=>{
      
      const response = await fetch(`${host}api/notes/updateNotes/${id}`, {
        method: 'PUT', 
        
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('authtoken')
          
        },
        body: JSON.stringify({"title":title.toString(),
        "description":description.toString(),
        "tag":tag.toString()}) 
      }); 
  
  
      let newNotes = JSON.parse(JSON.stringify(notes));
      for(let i=0;i<newNotes.length;i++)
      {
        let element = newNotes[i];
        // console.log(element._id);
        if(element._id===id)
        {
          newNotes[i].title = title
          newNotes[i].description = description
          newNotes[i].tag=tag
          // console.log(first);
          break;
        }
      }
      // console.log(newNotes);
      setNotes(newNotes)
       
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,updateNote,fetchNote}}>
           {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState