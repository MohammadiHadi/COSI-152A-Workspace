import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNote } from "../services/notesService";
import { useAuth } from "../context/AuthContext";

export default function NoteDetail() {
  const { user } = useAuth();
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

  const authorId =
    typeof note.author === "object" ? note.author?._id : note.author;

  const canEdit =
    user && (authorId === user._id || user.role === "instructor");

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

      {note.tags?.length > 0 && (
        <section className="tags" aria-label="Note tags">
          {note.tags.map(tag => (
            <span key={tag}>#{tag} </span>
          ))}
        </section>
      )}

      {canEdit && (
        <p>
          <Link to={`/notes/${note._id}/edit`}>Edit this note</Link>
        </p>
      )}
      
      <Link to="/">Back to all notes</Link>
    </article>
  );
}