
"use client"

import dynamic from "next/dynamic"
import React from "react"
import AboutMe from "../components/landing/AboutMe"

const HeroProduct = dynamic(() => import("../components/landing/HeroProduct"), { ssr: false })

export default function Page() {
  return (
    <div className="w-full sm:w-5xl xl:w-7xl m-auto">
      <HeroProduct />

      <main className="px-6 py-12">
        <AboutMe />

        <section id="projects" className="my-20">
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          <div className="mb-4 text-slate-400">Project highlights — interactive showcase below.</div>
          {/* Expandable cards demo */}
          {/* Dynamically import to avoid SSR issues with motion/react and next/image */}
          <React.Suspense>
            {React.createElement(React.lazy(() => import("../components/smoothui/ExpandableCardsDemo")))}
          </React.Suspense>
        </section>

        <section id="contact" className="my-20">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-slate-400">Contact form or links to your email / socials.</p>
        </section>
      </main>
    </div>
  )
}