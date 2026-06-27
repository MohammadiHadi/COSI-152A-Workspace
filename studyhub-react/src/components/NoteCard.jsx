import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NoteCard({ note, onLike,onDelete, activeTag, onTagClick }) {
  const { user } = useAuth();
  const authorId =
    typeof note.author === "object" ? note.author?._id : note.author;
  const canEdit =
    user && (authorId === user._id || user.role === "instructor");  

  return (
    <article className="note-card">
      <h2>
        <Link to={`/notes/${note._id}`}>{note.title}</Link>
      </h2>

      <p>{note.course}</p>

      <p>{note.content}</p>

      {note.tags?.length > 0 && (
        <section aria-label="Note tags">
          {note.tags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagClick(tag)}
              className={activeTag === tag ? "tag active" : "tag"}
              aria-pressed={activeTag === tag}
            >
              #{tag}
            </button>
          ))}
        </section>
      )}

      <p>♥ {note.likes || 0} likes</p>

      {user && (
        <button type="button" onClick={() => onLike(note._id)}>
          Like
        </button>
      )}

      {canEdit && (
        <button type="button" onClick={() => onDelete(note._id)}>
          Delete
        </button>
      )}
      
      {canEdit && (
        <Link to={`/notes/${note._id}/edit`}>
          Edit
        </Link>
      )}
    </article>
  );
}


