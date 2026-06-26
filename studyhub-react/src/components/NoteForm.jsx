import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function validate(title, course, content) {
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

  return errors;
}

export default function NoteForm({addNote}) {
  const navigate = useNavigate();

  // Option A: separate state variables
  const [title, setTitle] = useState('');
  const [course,  setCourse]  = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({})

  async function handleSubmit(e){
    e.preventDefault()

    //validate
    const validationErrors = validate(title, course, content)
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length > 0){
        return
    }


     const newId = await addNote({ title: title.trim(), course: course.trim() , content: content.trim()});

    
    setTitle("")
    setCourse("")
    setContent("")
    setErrors({})

    navigate(`/notes/${newId}`);

  }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="note-title">Title</label>
            <input type="text" id="note-title" value={title} onChange={e => setTitle(e.target.value)} placeholder='Note title...'/>
            {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
            <label htmlFor="note-course">Course</label>
            <input type="text" id="note-course" value={course} onChange={e => setCourse(e.target.value)} placeholder='Note course...'/>
            {errors.course && <p>{errors.course}</p>}
        </div>
        <div>
            <label htmlFor="note-content">Content</label>
            <textarea
                id="note-content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Note content..."
            />
            {errors.content && <p>{errors.content}</p>}
            </div>
        <button type='submit'>Add Note</button>
    </form>
  )

}
