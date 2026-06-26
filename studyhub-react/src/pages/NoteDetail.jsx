import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNote } from "../services/notesService";

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote]     = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getNote(id)
      .then(n => { setNote(n); setStatus("ready"); })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "error")   return <p>Note not found.</p>;


  return (
    <article className="note-detail">
      <h2>{note.title}</h2>
      <p>
        <strong>Course:</strong> {note.course}
      </p>
      <p>
        <strong>Content:</strong> {note.content}
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