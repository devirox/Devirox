"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"
import { motion } from "framer-motion"

import { Button } from "../ui/button"
import { AnimatedGroup } from "./AnimatedGroup"
import { AnimatedText } from "./AnimatedText"

import { HeroHeader } from "./HeroHeader"

interface HeroProductProps {
  badgeText?: string
  heading?: string
  description?: string
  primaryButton?: {
    text: string
    url: string
  }
  secondaryButton?: {
    text: string
    url: string
  }
  imageSrc?: string
  imageAlt?: string
}

export default function HeroProduct({
  badgeText = "Full-Stack Web Developer",
  heading = "Building Scalable Web Apps with Next.js & AWS",
  description = "I’m a full-stack developer crafting high-performance, cloud-ready applications using modern frameworks and beautiful UI design.",
  primaryButton = {
    text: "View Projects",
    url: "#projects",
  },
  secondaryButton = {
    text: "Contact Me",
    url: "#contact",
  },
  imageSrc = "https://source.unsplash.com/1600x900/?developer,code,workspace",
  imageAlt = "Developer coding dashboard interface",
}: HeroProductProps) {
  return (
    <div className="relative bg-[#0A0F2C] text-[#F8FAFC]">
      <HeroHeader />
      <main>
        <motion.section
          className="relative overflow-hidden bg-gradient-to-b from-[#0A0F2C] to-[#0A0F2C]/60"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Animated background */}
          <AnimatedGroup
            preset="blur-slide"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          >
            <motion.div
              className="absolute top-[-200px] left-[30%] w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[120px]"
              animate={{ x: [0, 80, -80, 0], y: [0, 60, -60, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-200px] right-[25%] w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[120px]"
              animate={{ x: [0, -100, 100, 0], y: [0, -80, 80, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
          </AnimatedGroup>

          {/* Hero content */}
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 text-center md:py-40">
            <AnimatedGroup preset="blur-slide" className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link
                  href="#about"
                  className="mx-auto flex w-fit items-center justify-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-400 hover:bg-cyan-400/20 transition"
                >
                  <span className="font-medium">{badgeText}</span>
                </Link>
              </motion.div>

              {/* Main heading */}
              <AnimatedText
                as="h1"
                className="mx-auto mt-8 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl"
                delay={0.2}
              >
                {heading}
              </AnimatedText>

              {/* Subtitle */}
              <AnimatedText
                as="p"
                className="text-[#CBD5E1] mx-auto my-6 max-w-xl text-xl"
                delay={0.3}
              >
                {description}
              </AnimatedText>

              {/* CTA Buttons */}
              <motion.div
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button asChild size="lg" variant="default">
                    <Link href={primaryButton.url}>{primaryButton.text}</Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Button asChild size="lg" variant="outline">
                    <Link href={secondaryButton.url}>{secondaryButton.text}</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatedGroup>

            {/* Image */}
            <motion.div
              className="relative mt-20"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative mx-auto max-w-5xl">
                <motion.div
                  className="bg-[#0A0F2C] overflow-hidden rounded-xl border border-cyan-400/10 ring-1 ring-cyan-400/10 shadow-xl"
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={2880}
                    height={1842}
                    className="h-auto w-full"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
