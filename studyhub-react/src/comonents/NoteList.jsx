import NoteCard from './NoteCard'

export default function NoteList({ notes, onLike, onDelete, activeTag, onTagClick }) {
  return (
    <section className="note-grid">
      {notes.map(note => (
        <NoteCard key={note._id} note = {note} onLike={onLike} onDelete={onDelete} activeTag={activeTag} onTagClick={onTagClick}/>
      ))}
    </section>
  )
}
