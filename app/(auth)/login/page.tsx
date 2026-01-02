import Login from "@/components/Login/Login"
import Image from "next/image"

export default function LoginPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-70px)]">
      <div className="relative w-full h-full min-h-100">
        <Image
          src="/images/login-banner.webp"
          alt="Banner"
          fill
          className="object-cover bg-black"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex items-center justify-center bg-black p-15">
        <Login />
      </div>
    </section>
  )
}
