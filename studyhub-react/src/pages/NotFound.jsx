import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>404 - StudyHub page not found</h1>
      <p>We could not find that note or page.</p>
      <Link to="/">Back to all notes</Link>
    </section>
  );
}
