import { getCookie } from "cookies-next"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getCookie("auth_token")

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Something went wrong")
  }

  return response.json()
}
