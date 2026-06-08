
function NoteCard({note, onLike}) {
  return (
    <article className="note-card">
      <h2>{note.title}</h2>
      <p>{note.course}</p>
      <p>♥ {note.likes} likes</p>
      <button onClick={() => onLike(note.id)}>Like</button>
    </article>
  )
}
// function NoteCard(props) {
//   return (
//     <article className="note-card">
//       <h2>{props.title}</h2>
//       <p>{props.course}</p>
//       <p>♥ {props.likes} likes</p>
//     </article>
//   )
// }

export default NoteCard
