"use client"
import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "../ui/button"

const LogoutButton = () => {
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <Button
      onClick={handleLogout}
      className="cursor-pointer bg-transparent hover:bg-[#191919] text-white flex gap-2 hover:text-white/80 items-center h-10 px-4"
    >
      <span className="font-medium">Log Out</span>
    </Button>
  )
}

export default LogoutButton
