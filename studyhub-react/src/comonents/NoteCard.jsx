
function NoteCard({note, onLike, activeTag, onTagClick}) {
  return (
    <article className="note-card">
      <h2>{note.title}</h2>
      <p>{note.course}</p>
      <p>♥ {note.likes} likes</p>
      <button onClick={() => onLike(note.id)}>Like</button>
      <div className="tags">
        {note.tags.map(tag =>(
          <button key={tag} onClick={()=>onTagClick(tag)} className={activeTag===tag? 'active-tag' : ''}>
            {tag}
          </button>
        ))}
      </div>
    </article>
  )
}

export default NoteCard
