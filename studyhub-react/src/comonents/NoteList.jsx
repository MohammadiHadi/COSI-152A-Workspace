import NoteCard from './NoteCard'

export default function NoteList({ notes, onLike, activeTag, onTagClick }) {
  return (
    <section className="note-grid">
      {notes.map(note => (
        <NoteCard key={note.id} note = {note} onLike={onLike} activeTag={activeTag} onTagClick={onTagClick}/>
      ))}
    </section>
  )
}
