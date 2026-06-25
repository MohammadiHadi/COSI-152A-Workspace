import { request } from "./api";

export const register = (data) =>
  request("/auth/register", { method: "POST",
    body: JSON.stringify(data) }).then(r => r.data);

export const login = (data) =>
  request("/auth/login", { method: "POST",
    body: JSON.stringify(data) }).then(r => r.data);
