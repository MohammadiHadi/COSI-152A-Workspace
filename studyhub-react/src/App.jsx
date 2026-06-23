import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNotes } from "./services/notesService";
import { createNote } from "./services/notesService";
import { updateNote } from "./services/notesService";
import { deleteNote } from "./services/notesService";


import HomePage from "./pages/HomePage";
import NewNotePage from "./pages/NewNotePage";
import NoteDetail from "./pages/NoteDetail";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import Layout from "./comonents/Layout";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState(null);
  const [error, setError]     = useState(null);


  async function handleLike(id) {
    const note = notes.find(n => n._id === id);
    const updated = await updateNote(id, { likes: note.likes + 1 });
    setNotes(prev => prev.map(n => (n._id === id ? updated : n)));
  }

  async function handleDelete(id) {
    await deleteNote(id);
    setNotes(prev => prev.filter(n => n._id !== id));
  }



  function handleTag(tag) {
    setActiveTag(activeTag === tag ? null : tag);
  }

  const filteredNotes = activeTag
    ? notes.filter(note => note.tags.includes(activeTag))
    : notes;

  function handleClick() {
    if (notes.length === 0) {
      setNotes(INITIAL_NOTES);
    } else {
      setNotes([]);
    }
  }

  useEffect(() => {
    getNotes()
      .then(setNotes)
      .catch(() => setError("Could not load notes"))
      .finally(() => setLoading(false));
  }, []);

  async function addNote(noteData) {
    const created = await createNote(noteData);  // saved note (has _id)
    setNotes(prev => [created, ...prev]);
    return created._id;                          // for navigation
  }


  if (loading) {
    return <p>Loading.....</p>;
  }

  if (loading) {
    return <p>{error}</p>;
  }

  return (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage notes={notes} onLike={handleLike} onDelete={handleDelete}  />} />
      <Route path="notes/new" element={<NewNotePage addNote={addNote} />} />
      <Route path="notes/:id" element={<NoteDetail notes={notes} />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="404" element={<NotFound />} />
    </Route>
    <Route path="/post" element={<Navigate to="/notes/new" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  );
}