import { Link } from "react-router-dom";

export default function NoteCard({ note, onLike,onDelete, activeTag, onTagClick }) {
  return (
    <article className="note-card">
      <h2>
        <Link to={`/notes/${note._id}`}>{note.title}</Link>
      </h2>
      <p>{note.course}</p>
      <p>♥ {note.likes} likes</p>
      <button onClick={() => onLike(note._id)}>Like</button>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </article>
  );
}

