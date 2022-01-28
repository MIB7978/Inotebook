import React, { useContext } from 'react';
import NoteContext from "../context/Notes/NotesContext";
import Additem from './Additem';
import NoteItem from './NoteItem';


function Notes() {
    const context = useContext(NoteContext);

    let {notes,setNotes} = context
  return  <>
      <Additem/>
      <div className='container'>
      <div className="row my-3">
        <h2 className='mb-3'>Your Note</h2>
         {notes.map((note)=>{
            
            return <NoteItem  note = {note}/>
         })}
        </div>
        </div>
  </>
}

export default Notes;
