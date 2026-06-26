import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  async function handleSubmit(e) {
    e.preventDefault();
    try { await register(form); navigate("/"); }
    catch (err) { setError(err.message); }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Account</h2>
      {error && <p role="alert">{error}</p>}
      <label>Name <input placeholder="Name" value={form.name} onChange={set("name")} /></label>
      <label>Email <input placeholder="Email" value={form.email} onChange={set("email")} /></label>
      <label>Password <input type="password" placeholder="Password"
             value={form.password} onChange={set("password")} /></label>
      <button>Register</button>
    </form>

  );
}
