import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/notesService";


import HomePage from "./pages/HomePage";
import NewNotePage from "./pages/NewNotePage";
import NoteDetail from "./pages/NoteDetail";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth"


export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState(null);
  const [error, setError]     = useState(null);


  async function handleLike(id) {
    try {
      const note = notes.find(n => n._id === id);

      if (!note) return;

      const updated = await updateNote(id, {
        likes: (note.likes || 0) + 1,
      });

      setNotes(prev =>
        prev.map(n => (n._id === id ? updated : n))
      );
    } catch(err) {
      setError(`Could not update likes: ${err.message} `);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch(err) {
      setError(`Could not delete note: ${err.message}`);
    }
  }



  function handleTagClick(tag) {
    setActiveTag(activeTag === tag ? null : tag);
  }

  const filteredNotes = activeTag
    ? notes.filter(note => note.tags.includes(activeTag))
    : notes;

  useEffect(() => {
    getNotes()
      .then(setNotes)
      .catch(() => setError("Could not load notes"))
      .finally(() => setLoading(false));
  }, []);

  async function addNote(noteData) {
    try {
      const created = await createNote(noteData);
      setNotes(prev => [created, ...prev]);
      return created._id;
    } catch(err) {
      setError(`Could not create note: ${err.message}`);
      return null;
    }
  }


  if (loading) {
    return <p>Loading.....</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage notes={filteredNotes} onLike={handleLike} onDelete={handleDelete} activeTag={activeTag} onTagClick={handleTagClick} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="notes/new" element={<RequireAuth><NewNotePage addNote={addNote}/></RequireAuth> } />
      <Route path="notes/:id" element={<NoteDetail  />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="404" element={<NotFound />} />
    </Route>
    <Route path="/post" element={<Navigate to="/notes/new" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  );
}