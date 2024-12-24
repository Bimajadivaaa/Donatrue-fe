"use client"

import Link from "next/link"
import { useState } from "react"

import ConnectWalletButton from "@/components/connect-wallet-button"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-black">
            <Link href="/">Donatrue</Link>
          </span>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <nav className="hidden md:flex space-x-6 mt-4">
          <Link href="/" className="text-gray-600 hover:text-black">
            Home
          </Link>
          <Link href="/donate" className="text-gray-600 hover:text-black">
            Donate
          </Link>
          <Link href="/history" className="text-gray-600 hover:text-black">
            History
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-black">
            Profile
          </Link>
        </nav>
        <div className="hidden md:flex mt-3">
          <ConnectWalletButton />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="space-y-4 px-4 py-6">
            <Link
              href="/"
              className="block text-gray-600 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/donate"
              className="block text-gray-600 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              Donate
            </Link>
            <Link
              href="/history"
              className="block text-gray-600 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              History
            </Link>
            <Link
              href="/profile"
              className="block text-gray-600 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <div>
              <ConnectWalletButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
