import React from 'react';

function NoteItem(props) {
   let {note} = props
  return <>
            <div className='col-md-3'>
       <div className="card ">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description} 
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit quia nihil consectetur asperiores optio, ducimus omnis itaque quaerat a dolorum provident autem, ratione nesciunt iusto iure odio vel nam neque. </p>
                <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
      </div>
      </div>
  </>;
}

export default NoteItem;
