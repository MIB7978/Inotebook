import React, { useContext } from 'react';
import NoteContext from "../context/Notes/NotesContext";
import NoteItem from './NoteItem';


function Notes() {
    const context = useContext(NoteContext);

    let {notes,setNotes} = context
  return  <>
      
      <div className="row my-3">
        <h2 className='mb-3'>Your Note</h2>
         {notes.map((note)=>{
            
            return <NoteItem note = {note}/>
         })}
        </div>
  </>
}

export default Notes;
