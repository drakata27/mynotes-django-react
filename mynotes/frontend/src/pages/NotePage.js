import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {
  let {id} = useParams();
  let [note, setNote] = useState(null);
  
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

  let updateNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(note)
    })
  }

  let createNote = async () => {
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(note)
    })
  }
  
  let deleteNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      }
    })
  }
  
  let handleSubmit = ()=> {

    if (note && note.body ==='') {
      deleteNote()
    } else if (id !== 'new') {
      updateNote()
    } else if (id==='new' && note !==null) {
      createNote()
    }
  }
  
  useEffect(() => {
    const getNote = async () => {
      if (id==='new') return
      let response = await fetch(`/api/notes/${id}/`);
      let data = await response.json();
      setNote(data);
    };
    getNote();
  }, [id]);

  let handleChange = (value) => {
    setNote(note => ({...note, 'body': value}))
  }

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
      <textarea onChange={(e) =>{ handleChange(e.target.value) }} value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;