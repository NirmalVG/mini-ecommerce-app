import { cookies } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

export async function apiServerRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const cookieStore = cookies()
  const token = (await cookieStore).get("auth_token")?.value

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Something went wrong")
  }

  return response.json()
}
