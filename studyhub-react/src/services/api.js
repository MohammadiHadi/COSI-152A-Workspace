const BASE_URL = "/api";        // Vite proxy forwards /api -> :3000

export async function request(path, options = {}) {
  const token = localStorage.getItem("token");           // NEW
  const res = await fetch(BASE_URL + path, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }), // NEW
        },
    ...options,
  });
  
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error?.message || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;   // 204 No Content (DELETE)
  return res.json();                     // -> { data: ... }
}
