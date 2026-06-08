import NoteCard from './NoteCard'

export default function NoteList({ notes }) {
  return (
    <section className="note-grid">
      {notes.map(note => (
        <NoteCard key={note.id} {...note} />
      ))}
    </section>
  )
}
