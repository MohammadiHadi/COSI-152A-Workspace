import NoteForm from "../components/NoteForm";

export default function NewNotePage({ addNote }) {
  return (
    <>
      <h2>Post a Note</h2>
      <NoteForm addNote={addNote} />
    </>
  );
}