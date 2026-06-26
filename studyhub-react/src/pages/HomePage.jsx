import NoteList from "../components/NoteList";

export default function HomePage({
  notes,
  onLike,
  activeTag,
  onTagClick,
  onDelete,
}) {
  return (
    <>
      <h2>Study Notes</h2>

      {activeTag && (
        <section className="filter-message" aria-label="Active note filter">
          <p>
            Showing notes tagged with <strong>#{activeTag}</strong>
          </p>

          <button type="button" onClick={() => onTagClick(activeTag)}>
            Clear filter
          </button>
        </section>
      )}

      {notes.length === 0 ? (
        <p>No notes yet — create the first one!</p>
      ) : (
        <NoteList
          notes={notes}
          onLike={onLike}
          activeTag={activeTag}
          onTagClick={onTagClick}
          onDelete={onDelete}
        />
      )}
    </>
  );
}