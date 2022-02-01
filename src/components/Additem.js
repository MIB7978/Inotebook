import React, { useContext, useState } from 'react';
import NoteContext from "../context/Notes/NotesContext";
import AlertContext from '../context/Alert/AlertContext';

function Additem() {

  const context1 = useContext(AlertContext);
    const {showAlert} = context1
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
        setNote({title:"",description:"",tag:"default"})
        showAlert("note added successfully","success")
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
            value={note.title}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            description
          </label>
          <input
            className="form-control"
            id="description"
            name='description'
            onChange={onChange}
            value={note.description}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            tag
          </label>
          <input
            className="form-control"
            id="tag"
            name='tag'
            onChange={onChange}
            value={note.tag}
            required
          />
        </div>
        <button disabled={note.title.length===0||note.description.length===0} className='btn btn-primary' onClick={handleClick}>addnote</button>
      </div>
  </>
}

export default Additem;
