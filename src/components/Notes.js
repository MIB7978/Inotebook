import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from "../context/Notes/NotesContext";
import Additem from './Additem';
import NoteItem from './NoteItem';
import AlertContext from '../context/Alert/AlertContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Notes() {
  const context = useContext(NoteContext);
  const context1 = useContext(AlertContext);
    const {showAlert} = context1
    let history = useHistory()

  let { notes, fetchNote ,updateNote} = context
  useEffect(() => {
    if(localStorage.getItem('authtoken'))
    fetchNote()
    else
    history.push("/login")
  }, []);
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"});
  const ref = useRef(null);
  const refClose = useRef(null);
  const updatebtn =(currentnote)=>{
    ref.current.click();
    setNote({id:currentnote._id, etitle: currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
    showAlert("updated sucessfully","success")
  }
  const onChange  = (e)=>{
    e.preventDefault()
   setNote({...note,[e.target.name]:[e.target.value]})
}
const handleClick = ()=>
{
   
    updateNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
}
 
  
  return <>
    <Additem />
    <div className='container'  >
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <label htmlFor="etitle" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name='etitle'
            onChange={onChange}
            value={note.etitle}
          />
        
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            description
          </label>
          <input
            className="form-control"
            id="edescription"
            name='edescription'
            onChange={onChange}
            value={note.edescription}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            tag
          </label>
          <input
            className="form-control"
            id="etag"
            name='etag'
            onChange={onChange}
            value={note.etag}
          />
          </div>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" disabled={note.etitle.length===0||note.edescription.length===0} onClick={handleClick} className="btn btn-primary">update notes</button>
          </div>
        </div>
      </div>
    </div>
      <div className="row my-3">
        <h2 className='mb-3'>Your Note</h2>
        {notes.map((note) => {

          return <NoteItem key={note._id} updatebtn={updatebtn} note={note} />
        })}
      </div>
    </div>
  </>
}

export default Notes;
