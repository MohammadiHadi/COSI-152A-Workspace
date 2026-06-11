import NoteList from "../comonents/NoteList";

export default function HomePage({
  notes,
  onLike,
  activeTag,
  onTagClick,
  onToggleNotes
}) {
  return (
    <>
      <h2>Study Notes</h2>
      <button onClick={onToggleNotes}>Hide/Show Notes</button>

      <NoteList
        notes={notes}
        onLike={onLike}
        activeTag={activeTag}
        onTagClick={onTagClick}
      />
    </>
  );
}