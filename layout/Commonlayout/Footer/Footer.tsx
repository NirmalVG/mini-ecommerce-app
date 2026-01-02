import { FaXTwitter } from "react-icons/fa6"
import { LuFacebook } from "react-icons/lu"
import { FaInstagram } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-black h-61 flex items-center justify-between container mx-auto px-8">
      <Link href="/product-list">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={106}
          height={56}
          priority
        />
      </Link>
      <div className="flex items-center justify-between gap-8">
        <Link
          href="https://www.facebook.com/nike/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LuFacebook color="#ffffff" size={22} />
        </Link>
        <Link
          href="https://www.instagram.com/nike/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram color="#ffffff" size={22} />
        </Link>
        <Link
          href="https://x.com/Nike"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter color="#ffffff" size={22} />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
