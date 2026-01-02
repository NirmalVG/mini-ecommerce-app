"use client"
import { Button } from "@/components/ui/button"
import { CircleUserRound } from "lucide-react"
import Image from "next/image"
import { useAuthStore } from "@/store/useAuthStore"
import Link from "next/link"

const Header = () => {
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }
  return (
    <header className="bg-[#191919] h-17.5 flex items-center justify-between container mx-auto px-8 ">
      <Link href="/product-list">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={52}
          height={29}
          priority
        />
      </Link>

      <div className="flex items-center gap-4">
        <Button
          onClick={handleLogout}
          className="cursor-pointer bg-transparent hover:bg-[#191919] text-white flex gap-2 items-center h-10 px-4"
        >
          <CircleUserRound size={20} className="text-white" />
          <span className="font-medium">Log Out</span>
        </Button>
      </div>
    </header>
  )
}

export default Header
