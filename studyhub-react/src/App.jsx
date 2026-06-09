import './App.css'
import NoteList from './comonents/NoteList'
import Header from './comonents/Header'
import NoteForm from './comonents/NoteForm'
import { useState , useEffect } from 'react'

const INITIAL_NOTES = [
  { id: 1, title: 'React Basics', course: 'COSI 152A', likes: 14, tags: ['react', 'jsx'] },
  { id: 2, title: 'DOM Review', course: 'COSI 152A', likes: 8 , tags: ['dom', 'javascript']},
  { id: 3, title: 'JavaScript Arrays', course: 'COSI 152A', likes: 21, tags: ['javascript', 'arrays'] },
]


function App() {
  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState(null)

  function handleLike(id) {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, likes: note.likes + 1 }
          : note
      )
    )
  }

  function handleTag(tag){
    setActiveTag(activeTag === tag ? null : tag)
  }

  const filteredNotes = activeTag ? notes.filter(n=> n.tags.includes(activeTag)) : notes

  function handleClick(){
    if(notes.length === 0){
      setNotes(INITIAL_NOTES)
    } else{
      setNotes([])
    }
  }

  useEffect(()=>{
    console.log("Notes are chnaged")
  }, [])

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    }, 2000)
  }, [])

  function addNote(noteData){
    const newNote = {
      id: Date.now(),
      ...noteData,
      likes : 0,
      tags : []
    };
    setNotes(prev => [newNote, ...prev])
  }

  if (loading) 
    return <p>Loading.....</p>
  return (
    <div className='app'>
      <Header />
      <main>
        <h2>Study Notes</h2>
        <NoteForm addNote={addNote}/>
        <button onClick={handleClick}>Hide/Show Notes</button>
        <NoteList notes = {filteredNotes} onLike={handleLike} activeTag={activeTag} onTagClick={handleTag} />
      </main>
    </div>
  )
}

export default App