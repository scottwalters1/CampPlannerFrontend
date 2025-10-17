import type { User } from "../models/user";

export const createUser = async (user: User) => {
  const res = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

    if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Register Failed");
  }

  return res.json();
};


export const login = async (user: User) => {
  const res = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Login failed");
  }

  return res.json();
};