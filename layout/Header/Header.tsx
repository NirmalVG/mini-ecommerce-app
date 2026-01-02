import { cookies } from "next/headers"
import Link from "next/link"
import Image from "next/image"
import LogoutButton from "@/components/LogoutButton/LogoutButton"
import { Button } from "@/components/ui/button"
import { CircleUserRound } from "lucide-react"
const Header = async () => {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.has("auth_token")

  return (
    <header className="bg-[#191919] h-17.5 flex items-center justify-between container mx-auto px-8">
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
        {isAuthenticated ? (
          <div className="flex items-center">
            <Link href="/profile" className="text-white">
              <CircleUserRound
                size={20}
                className="text-white hover:text-white/80"
              />
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <Link href="/login">
            <Button className="cursor-pointer bg-transparent hover:bg-[#191919] text-white flex gap-2 items-center h-10 px-4">
              <span className="font-medium">Log In</span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
