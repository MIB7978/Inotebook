import React, { useContext, useState } from 'react';
import NoteContext from "../context/Notes/NotesContext";


function Additem() {

    const context = useContext(NoteContext);
    let {addNote} = context
    const [note, setNote] = useState({title:"",description:"",tag:"default"});
    const onChange  = (e)=>{
        e.preventDefault()
       setNote({...note,[e.target.name]:[e.target.value]})
    }
    const handleClick = ()=>
    {
        addNote(note.title,note.description,note.tag)
    }
  return <>
       <div className="container my-3">
        <h1>Add Note</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Example textarea
          </label>
          <input
            className="form-control"
            id="description"
            name='description'
            onChange={onChange}
          />
        </div>
        <button className='btn btn-primary' onClick={handleClick}>Submit</button>
      </div>
  </>
}

export default Additem;
