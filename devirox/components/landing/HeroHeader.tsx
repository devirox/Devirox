"use client"

import Link from "next/link"
import React from "react"

export const HeroHeader: React.FC = () => {
  return (
    <header className="border-b border-cyan-400/5">
      <nav className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-white">
          Devirox
        </Link>

        <div className="hidden md:flex items-center gap-4 text-sm text-slate-300">
          <Link href="#about" className="hover:text-white">
            About
          </Link>
          <Link href="#projects" className="hover:text-white">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-white">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default HeroHeader
