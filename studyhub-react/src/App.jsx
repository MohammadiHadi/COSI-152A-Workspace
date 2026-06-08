import './App.css'
import NoteList from './comonents/NoteList'
import Header from './comonents/Header'
import { useState } from 'react'

const INITIAL_NOTES = [
  { id: 1, title: 'React Basics', course: 'COSI 152A', likes: 14 },
  { id: 2, title: 'DOM Review', course: 'COSI 152A', likes: 8 },
  { id: 3, title: 'JavaScript Arrays', course: 'COSI 152A', likes: 21 },
]


function App() {
  const [notes, setNotes] = useState(INITIAL_NOTES)

  function handleLike(id) {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, likes: note.likes + 1 }
          : note
      )
    )
  }

  function handleClick(){
    if(notes.length === 0){
      setNotes(INITIAL_NOTES)
    } else{
      setNotes([])
    }
  }

  return (
    <div className='app'>
      <Header />
      <main>
        <h2>Study Notes</h2>
        <button onClick={handleClick}>Hide/Show Notes</button>
        <NoteList notes = {notes} onLike={handleLike} />
      </main>
    </div>
  )
}

export default App