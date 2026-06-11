import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";
import NewNotePage from "./pages/NewNotePage";
import NoteDetail from "./pages/NoteDetail";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import Layout from "./comonents/Layout";

const INITIAL_NOTES = [
  { id: 1, title: "React Basics", course: "COSI 152A", likes: 14, tags: ["react", "jsx"] },
  { id: 2, title: "DOM Review", course: "COSI 152A", likes: 8, tags: ["dom", "javascript"] },
  { id: 3, title: "JavaScript Arrays", course: "COSI 152A", likes: 21, tags: ["javascript", "arrays"] },
];

export default function App() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState(null);

  function handleLike(id) {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, likes: note.likes + 1 } : note
      )
    );
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
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  function addNote(noteData) {
    const newNote = {
      id: Date.now(),
      ...noteData,
      likes: 0,
      tags: [],
    };

    setNotes(prev => [newNote, ...prev]);

    return newNote.id;
  }

  if (loading) {
    return <p>Loading.....</p>;
  }

  return (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage notes={notes} onLike={handleLike} />} />
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