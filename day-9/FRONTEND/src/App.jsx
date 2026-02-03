import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes")
      .then(res => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    if (editId) {
      // ✅ UPDATE (PATCH)
      axios.patch(`http://localhost:3000/api/notes/${editId}`, formData)
        .then(() => {
          fetchNotes()
          setEditId(null)
          setFormData({ title: "", description: "" })
        })
    } else {
      // CREATE
      axios.post("http://localhost:3000/api/notes", formData)
        .then(() => {
          fetchNotes()
          setFormData({ title: "", description: "" })
        })
    }
  }

  function handleDelete(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId)
      .then(() => fetchNotes())
  }

  function handleEdit(note) {
    setEditId(note._id)
    setFormData({
      title: note.title,
      description: note.description
    })
  }

  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='enter title'
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder='enter description'
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button type="submit">
          {editId ? "Update Note" : "Create Note"}
        </button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>

            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
