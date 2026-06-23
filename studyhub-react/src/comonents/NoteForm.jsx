import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function validate(title, course){
    const errors = {}

    if(!title.trim()){
        errors.title = "Title is required!"
    } else if(title.trim().length < 3){
        errors.title = "Title must be at least 3 characters"
    } else if(title.trim().length > 100){
        errors.title = "Title can not exceed 100 characters"
    }


    if(!course.trim()){
        errors.course = "Course is required!"
    } else if(course.trim().length < 5){
        errors.course = "Course must be at least 5 characters"
    }

    return errors
}

export default function NoteForm({addNote}) {
  const navigate = useNavigate();

  // Option A: separate state variables
  const [title, setTitle] = useState('');
  const [course,  setCourse]  = useState('');
  const [errors, setErrors] = useState({})

  async function handleSubmit(e){
    e.preventDefault()

    //validate
    const ValidationErrors = validate(title, course)
    setErrors(ValidationErrors)

    if(Object.keys(ValidationErrors).length > 0){
        return
    }


     const newId = await addNote({ title: title.trim(), course: course.trim() });

    
    setTitle("")
    setCourse("")
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
        <button type='submit'>Add Note</button>
    </form>
  )

}
