import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {
  let {id} = useParams(); // noteId
  let [note, setNote] = useState(null);

  
  let updateNote = async () => {
    fetch(`/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note)
    })
  }

  let createNote = async () => {
    fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note)
    })
  }
  
  let deleteNote = async () => {
    fetch(`/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
  
  let handleSubmit = ()=> {
    console.log('NOTE: ', note);
    if (id !== 'new' && note.body==='') {
      deleteNote()
    } else if (id !== 'new') {
      updateNote()
    } else if (id==='new' && note.body !==null) {
      createNote()
    }
  }
  
  useEffect(() => {
    const getNote = async () => {
      if (id==='new') return
      let response = await fetch(`/api/notes/${id}`);
      let data = await response.json();
      setNote(data);
    };
    getNote();
  }, [id]);

  return (
    <div className='note'>
      <div className="note-header">
        <h3>
          <Link to={'/'}>
            < ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>
        <Link to={'/'}> 
          {id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
          ): (
            <button onClick={handleSubmit}>Done</button>
          )}
        </Link>
      </div>
      <textarea onChange={(e) =>{setNote({...note, 'body':e.target.value })}} defaultValue={note?.body}></textarea>
    </div>
  );
};

export default NotePage;