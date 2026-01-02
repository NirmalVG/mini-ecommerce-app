import { cookies } from "next/headers"

const getBaseUrl = () => {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return "http://localhost:3000"
}

export async function apiServerRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const cookieStore = cookies()
  const token = (await cookieStore).get("auth_token")?.value

  const absoluteBase = getBaseUrl()
  const PROXY_PATH = "/api/proxy"

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`

  const finalUrl = `${absoluteBase}${PROXY_PATH}${cleanEndpoint}`

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(finalUrl, {
    ...options,
    headers,
    cache: "no-store",
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `Server Error: ${response.status}`)
  }

  return response.json()
}
