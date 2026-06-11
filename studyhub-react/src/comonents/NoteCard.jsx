import { Link } from "react-router-dom";

export default function NoteCard({ note, onLike, activeTag, onTagClick }) {
  return (
    <article className="note-card">
      <h2>
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h2>
      <p>{note.course}</p>
      <p>♥ {note.likes} likes</p>
      <button onClick={() => onLike(note.id)}>Like</button>
    </article>
  );
}

