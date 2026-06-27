import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getNote, updateNote } from "../services/notesService";

function validate(title, content, tagsText, course) {
  const errors = {};

  if (!title.trim()) {
    errors.title = "Title is required";
  } else if (title.trim().length > 120) {
    errors.title = "Title cannot exceed 120 characters";
  }

  if (!course.trim()) {
    errors.course = "Course is required";
  } else if (course.trim().length > 120) {
    errors.course = "Course cannot exceed 120 characters";
  }

  if (!content.trim()) {
    errors.content = "Content is required";
  } else if (content.trim().length > 5000) {
    errors.content = "Content cannot exceed 5000 characters";
  }

  const tags = tagsText
    .split(",")
    .map(tag => tag.trim())
    .filter(Boolean);

  if (tags.some(tag => tag.length === 0)) {
    errors.tags = "Tags cannot be empty";
  }

  return errors;
}

export default function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [content, setContent] = useState("");
  const [tagsText, setTagsText] = useState("");

  useEffect(() => {
    getNote(id)
      .then(note => {
        setTitle(note.title || "");
        setCourse(note.course || "");
        setContent(note.content || "");
        setTagsText(note.tags?.join(", ") || "");
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(title, course, content, tagsText);
    setErrors(validationErrors);
    setSubmitError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const tags = tagsText
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);

    try {
      await updateNote(id, {
        title: title.trim(),
        course: course.trim(),
        content: content.trim(),
        tags,
      });

      navigate(`/notes/${id}`);
    } catch (err) {
      setSubmitError(`Could not update the note: ${err.message}`);
    }
  }

  if (status === "loading") {
    return <p>Loading note...</p>;
  }

  if (status === "error") {
    return <p>Could not load note.</p>;
  }

  return (
    <section>
      <h2>Edit Note</h2>

      {submitError && <p role="alert">{submitError}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="edit-title">Title</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {errors.title && <span>{errors.title}</span>}
        </p>

        <p>
          <label htmlFor="edit-course">Course</label>
          <input
            id="edit-course"
            type="text"
            value={course}
            onChange={e => setCourse(e.target.value)}
          />
          {errors.course && <span>{errors.course}</span>}
        </p>

        <p>
          <label htmlFor="edit-content">Content</label>
          <textarea
            id="edit-content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          {errors.content && <span>{errors.content}</span>}
        </p>

        <p>
          <label htmlFor="edit-tags">Tags</label>
          <input
            id="edit-tags"
            type="text"
            value={tagsText}
            onChange={e => setTagsText(e.target.value)}
            placeholder="react, state, express"
          />
          {errors.tags && <span>{errors.tags}</span>}
        </p>

        <button type="submit">Save Changes</button>
      </form>

      <p>
        <Link to={`/notes/${id}`}>Cancel</Link>
      </p>
    </section>
  );
}