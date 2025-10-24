"use client"

import type React from "react"
import { motion } from "motion/react"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFramer,
  SiPostgresql,
  SiVercel,
} from "react-icons/si"

interface LogoCloudAnimatedProps {
  title?: string
  description?: string
  logos?: Array<{
    name: string
    logo: React.ComponentType
    url?: string
  }>
}

export function LogoCloudAnimated({
  title = "Built With Modern Technologies",
  description = "These are the tools and frameworks I use to craft fast, scalable, and beautiful digital experiences.",
  logos = [
    { name: "React", logo: SiReact, url: "https://react.dev" },
    { name: "Next.js", logo: SiNextdotjs, url: "https://nextjs.org" },
    { name: "TypeScript", logo: SiTypescript, url: "https://www.typescriptlang.org" },
    { name: "Tailwind CSS", logo: SiTailwindcss, url: "https://tailwindcss.com" },
    { name: "Node.js", logo: SiNodedotjs, url: "https://nodejs.org" },
    { name: "Framer Motion", logo: SiFramer, url: "https://www.framer.com/motion" },
    { name: "PostgreSQL", logo: SiPostgresql, url: "https://www.postgresql.org" },
    { name: "Vercel", logo: SiVercel, url: "https://vercel.com" },
  ],
}: LogoCloudAnimatedProps) {
  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-foreground mb-4 text-2xl font-bold lg:text-3xl">{title}</h2>
          <p className="text-foreground/70 text-lg">{description}</p>
        </motion.div>

        {/* Infinite scrolling logos */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0))",
            WebkitMaskImage:
              "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0))",
          }}
        >
          <motion.div
            className="flex min-w-full flex-shrink-0 items-center justify-around gap-8"
            animate={{
              x: [0, -33.333 * logos.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {/* Repeat sets for seamless loop */}
            {[...Array(3)].map((_, setIndex) =>
              logos.map((logo, index) => (
                <motion.a
                  key={`${setIndex}-${logo.name}`}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex flex-shrink-0 flex-col items-center justify-center p-6 transition-all hover:scale-110"
                >
                  <motion.div
                    className="text-4xl text-foreground group-hover:text-primary transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <logo.logo />
                  </motion.div>
                  <span className="mt-2 text-sm text-foreground/70 group-hover:text-primary transition-colors">
                    {logo.name}
                  </span>
                </motion.a>
              )),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LogoCloudAnimated
