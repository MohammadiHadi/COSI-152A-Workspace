
function NoteCard({title, course, likes}) {
  return (
    <article className="note-card">
      <h2>{title}</h2>
      <p>{course}</p>
      <p>♥ {likes} likes</p>
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
