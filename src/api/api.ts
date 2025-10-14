const API_BASE = "http://localhost:3000";

interface FetchOptions extends RequestInit {
  body?: any;
}

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const { body, headers = {}, ...rest } = options;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // automatically include cookies
  });

  const data = await res.json().catch(() => null);

  

  if (!res.ok) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
}