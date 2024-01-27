// import React, {useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom';

// const NotePage = () => {
//     let id  = useParams() // noteId
//     let [note, setNote] = useState(null)
    
//     useEffect(()=>{
//         getNote()
//     }, [id])

//     let getNote = async ()=>{
//         let response = await fetch(`api/notes/${id}/`)
//         let data = await response.json()
//         setNote(data)
//     }


//   return (
//     <div>
//         <p>{note?.body}</p>
//     </div>
//   )
// }

// export default NotePage

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {
  let {id} = useParams(); // noteId
  let [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async () => {
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
          <Link to='/'>
            < ArrowLeft />
          </Link>
        </h3>
      </div>
      <textarea defaultValue={note?.body}></textarea>
    </div>
  );
};

export default NotePage;