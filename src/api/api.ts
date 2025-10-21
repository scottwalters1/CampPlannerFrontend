import { getToken } from "../util/authToken";

// src/api/api.ts
export const getApiBase = () => {
  return import.meta.env.MODE === "production"
    ? "http://54.87.191.138:3000"
    : "http://localhost:3000";
};

interface FetchOptions extends RequestInit {
  body?: any;
}

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const { body, headers = {}, ...rest } = options;

  const token = getToken();

  const res = await fetch(`${getApiBase()}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    // remove credentials for cookie auth
    // credentials: "include",
  });
  const data = await res.json().catch(() => null);



  if (!res.ok) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
}