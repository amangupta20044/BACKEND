import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  // state
  const [notes, setNotes] = useState([])
  const [editId, setEditId] = useState(null)


  // fetch all notes
  function fetchNotes() {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes)
      })
  }

  // run once on page load
  useEffect(() => {
    fetchNotes()
  }, [])

  // create note

  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    if (editId) {
      // 🟡 UPDATE (PATCH)
      axios.patch("http://localhost:3000/api/notes/" + editId, {
        title: title.value,
        description: description.value
      })
        .then(res => {
          console.log("updated", res.data)
          setEditId(null)
          fetchNotes()
          e.target.reset()
        })

    } else {
      // 🟢 CREATE (POST)
      axios.post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value
      })
        .then(res => {
          console.log("created", res.data)
          fetchNotes()
          e.target.reset()
        })
    }
  }


  // delete note
  function handleDelete(noteId) {
    axios
      .delete(`http://localhost:3000/api/notes/${noteId}`)
      .then((res) => {
        console.log(res.data)
        fetchNotes()
      })
  }

  return (
    <>
      {/* Create Note Form */}
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="enter title"
        />
        <input
          name="description"
          type="text"
          placeholder="enter description"
        />
        <button>
          {editId ? "Update Note" : "Create Note"}
        </button>

      </form>

      {/* Notes List */}
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>

            <button
              className="delete-button"
              onClick={() => handleDelete(note._id)}
            >
              Delete
            </button>
            {/* edit button */}
            <button className='edit' onClick={() => {
              setEditId(note._id)
              document.querySelector("input[name='title']").value = note.title
              document.querySelector("input[name='description']").value = note.description
            }}>
              Edit
            </button>


          </div>
        ))}
      </div>
    </>
  )
}

export default App
