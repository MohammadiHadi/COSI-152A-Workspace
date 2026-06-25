import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  async function handleSubmit(e) {
    e.preventDefault();
    try { await login(form); navigate("/"); }
    catch (err) { setError(err.message); }
  }
  return (
    <form onSubmit={handleSubmit}>
      {error && <p role="alert">{error}</p>}
      <input placeholder="Email" value={form.email} onChange={set("email")} />
      <input type="password" placeholder="Password"
             value={form.password} onChange={set("password")} />
      <button>Log in</button>
    </form>
  );
}
