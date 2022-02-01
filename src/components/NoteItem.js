import React, { useContext } from 'react';
import NoteContext from "../context/Notes/NotesContext";
import AlertContext from '../context/Alert/AlertContext';
function NoteItem(props) {
   let {note,updatebtn} = props
   const context = useContext(NoteContext);
   let {deleteNote} = context
   const context1 = useContext(AlertContext);
   const {showAlert} = context1
  return <>
            <div className='col-md-3'>
       <div className="card ">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <i className="far fa-trash-alt mx-2" onClick={()=>{
                        deleteNote(note._id)
                        showAlert("note deleted successfully","success")

                }}></i>
               <i className="far fa-edit mx-2" onClick={()=>{
                   updatebtn(note)
               }}></i>
                <p className="card-text">{note.description}</p>
              
            </div>
      </div>
      </div>
  </>;
}

export default NoteItem;
