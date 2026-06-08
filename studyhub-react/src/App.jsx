import './App.css'
import NoteList from './comonents/NoteList'
import Header from './comonents/Header'

const notes = [
  { id: 1, title: 'React Basics', course: 'COSI 152A', likes: 14 },
  { id: 2, title: 'DOM Review', course: 'COSI 152A', likes: 8 },
  { id: 3, title: 'JavaScript Arrays', course: 'COSI 152A', likes: 21 },
]


function App() {
  return (
    <div className='app'>
      <Header />
      <main>
        <h2>Study Notes</h2>
        <NoteList notes = {notes} />
      </main>
    </div>
  )
}

export default App