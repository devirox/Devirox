
"use client"

import dynamic from "next/dynamic"
import React from "react"
import AboutMe from "../components/landing/AboutMe"
import TestimonialsCarousel from "../components/landing/TestimonialsCarousel"
import FeatureSteps from "../components/landing/FeatureSteps"
import LogoCloudAnimated from "../components/landing/LogoCloudAnimated"
import CTA3 from "../components/landing/CTA3"
import DesignerPricing from "../components/landing/DesignerPricing"
import TeamCarousel from "../components/landing/TeamCarousel"
import ContactUs2 from "../fullstack-portfolio/src/pages/contact"
import FooterComplex from "../fullstack-portfolio/src/components/FooterComplex"

const HeroGrid = dynamic(() => import("../components/landing/HeroGrid"), { ssr: false })

export default function Page() {
  return (
    <div className="w-full sm:w-5xl xl:w-7xl m-auto">
  <HeroGrid />

      <main className="px-6 py-12">
        <AboutMe />

        <section id="features" className="my-20">
          <FeatureSteps />
        </section>

        <section id="tech" className="my-20">
          <LogoCloudAnimated />
        </section>

        <section id="pricing" className="my-20">
          <DesignerPricing />
        </section>

        <section id="team" className="my-20">
          <TeamCarousel />
        </section>

        <section id="projects" className="my-20">
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          <div className="mb-4 text-slate-400">Project highlights — interactive showcase below.</div>
          {/* Expandable cards demo */}
          {/* Dynamically import to avoid SSR issues with motion/react and next/image */}
          <React.Suspense>
            {React.createElement(React.lazy(() => import("../components/smoothui/ExpandableCardsDemo")))}
          </React.Suspense>
        </section>

        <section id="testimonials" className="my-20">
          <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>
          <TestimonialsCarousel />
        </section>

        <section id="cta" className="my-20">
          <CTA3 />
        </section>

        <section id="contact" className="my-20">
          <ContactUs2 />
        </section>
      </main>
      <FooterComplex />
    </div>
  )
}