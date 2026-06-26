import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header>
      <h1>StudyHub</h1>
      <nav>
        <NavLink to="/" end>Notes</NavLink>
        <NavLink to="/about">About</NavLink>
        {user && <NavLink to="/notes/new">Post a Note</NavLink>}
        {!user && <NavLink to="/login">Log in</NavLink>}
        {!user && <NavLink to="/register">Register</NavLink>}
        {user && <span>Hi, {user.name}</span>}
        {user && <button onClick={logout}>Log out</button>}
      </nav>    
    </header>
  );
}

