import { Link, useParams } from "react-router-dom";

export default function NoteDetail({ notes }) {
  const { id } = useParams();

  const note = notes.find(note => String(note.id) === id);

  if (!note) {
    return (
      <>
        <h2>Note not found</h2>
        <p>We could not find a note with ID {id}.</p>
        <Link to="/">Back to notes</Link>
      </>
    );
  }

  return (
    <article className="note-detail">
      <h2>{note.title}</h2>
      <p>
        <strong>Course:</strong> {note.course}
      </p>
      <p>♥ {note.likes} likes</p>

      <div className="tags">
        {note.tags.map(tag => (
          <span key={tag}>#{tag} </span>
        ))}
      </div>

      <Link to="/">Back to all notes</Link>
    </article>
  );
}