import type { Metadata } from "next"
import { Inter } from "next/font/google"
//@ts-ignore
import "./globals.css"
import CommonLayout from "@/layout/CommonLayout"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "👟 Nike Store",
  description:
    "Mini Ecommerce App built with Next.js, TypeScript and Tailwind CSS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen ${inter.variable}  antialiased `}
        data-new-gr-c-s-check-loaded="14.1267.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
      >
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  )
}
