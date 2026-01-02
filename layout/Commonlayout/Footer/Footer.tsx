import { FaXTwitter } from "react-icons/fa6"
import { LuFacebook } from "react-icons/lu"
import { FaInstagram } from "react-icons/fa"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-black h-61 flex items-center justify-between container mx-auto px-8">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={106}
        height={56}
        priority
      />
      <div className="flex items-center justify-between gap-8">
        <LuFacebook color="#ffffff" size={22} />
        <FaInstagram color="#ffffff" size={22} />
        <FaXTwitter color="#ffffff" size={22} />
      </div>
    </footer>
  )
}

export default Footer
