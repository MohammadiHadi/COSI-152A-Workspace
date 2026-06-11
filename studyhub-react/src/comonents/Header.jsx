import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>StudyHub</h1>
      <p>Share notes. Ace exams.</p>
      <nav>
        <NavLink to="/" end>Notes</NavLink>
        <NavLink to="/notes/new">Post a Note</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
