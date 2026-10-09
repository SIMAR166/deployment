import { useState, useEffect } from 'react'
import axios from 'axios'
// axios is use to call the api from the frontend 

function App() {
  const [notes, setNotes] = useState([])

  console.log("hello integation")

  function fetchNotes() {
    axios.get('https://deployment-1-cg9e.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
  }

  function handleDeleteNote(noteId){
 axios.delete("https://deployment-1-cg9e.onrender.com/api/notes/"+noteId)
 .then(res =>{
 console.log(res.data)
  fetchNotes()
 })
  }



  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
   e.preventDefault()

    const { title, description } = e.target.elements
    console.log(title.value,description.value)

    // creating new node with the help of the axios

    axios.post("https://deployment-1-cg9e.onrender.com/api/notes",{
      title:title.value,
      description:description.value
    })
     .then(res=>{
     console.log(res.data)
     fetchNotes()
  })

  }
 

  return (
    <>

      <form className='note-create-form' onSubmit={handleSubmit} >
        <input name="title" type="text" placeholder=' Enter title' />
        <input name="description" type="text" placeholder='Enter description' />
        <button>Create note</button>
      </form>
      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>handleDeleteNote(note._id)}>delete</button>
         
            </div>
          })
        }

      </div>
    </>
  )
}

export default App
