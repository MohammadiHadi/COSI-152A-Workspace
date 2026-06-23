import NoteList from "../comonents/NoteList";

export default function HomePage({
  notes,
  onLike,
  activeTag,
  onTagClick,
  onToggleNotes,
  onDelete,
}) {
  
  if (notes.length === 0) {
    return <p>No notes yet — create the first one!</p>;
  }

  return (
    <>
      <h2>Study Notes</h2>
      <button onClick={onToggleNotes}>Hide/Show Notes</button>

      <NoteList
        notes={notes}
        onLike={onLike}
        activeTag={activeTag}
        onTagClick={onTagClick}
        onDelete={onDelete}
      />
    </>
  );
}