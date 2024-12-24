import type { Metadata } from "next"
import localFont from "next/font/local"

import Providers from "@/app/providers"

import { Footer } from "@/components/footer"
import { NavBar } from "@/components/navbar"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const myFont = localFont({
  src: "../lib/font/0xProtoNerdFont-Regular.ttf",
  display: "swap"
})

export const metadata: Metadata = {
  title: {
    template: "%s | Donatrue",
    absolute: "Donatrue",
    default: "Donatrue"
  },
  description: "Donate with trust!"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} antialiased`}>
        <Providers>
          <NavBar />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
