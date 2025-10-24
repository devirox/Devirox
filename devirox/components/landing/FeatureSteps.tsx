"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Rocket, Code, Paintbrush, Trophy } from "lucide-react"

const features = [
  {
    step: "Step 1",
    title: "Plan & Design",
    content:
      "Outline project requirements, wireframes, and design mockups to ensure clarity and efficiency.",
    icon: <Paintbrush className="text-cyan-500 h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1581092795368-04886dc10e9b?auto=format&fit=crop&w=2070&q=80",
  },
  {
    step: "Step 2",
    title: "Develop & Code",
    content:
      "Build robust, scalable, and maintainable code using modern technologies and best practices.",
    icon: <Code className="text-cyan-500 h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981b?auto=format&fit=crop&w=2070&q=80",
  },
  {
    step: "Step 3",
    title: "Deploy & Share",
    content:
      "Launch live projects, optimize performance, and gather feedback for continuous improvement.",
    icon: <Rocket className="text-cyan-500 h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1612831455540-cc9f1c9e805b?auto=format&fit=crop&w=2070&q=80",
  },
  {
    step: "Step 4",
    title: "Showcase Portfolio",
    content:
      "Highlight completed projects, contributions, and case studies to demonstrate your skills.",
    icon: <Trophy className="text-cyan-500 h-6 w-6" />,
    image:
      "https://images.unsplash.com/photo-1603789860530-f5e64a6c764f?auto=format&fit=crop&w=2070&q=80",
  },
]

export default function FeatureSteps() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [progress])

  return (
    <div className="p-8 md:p-12 bg-[#0A0F2C] text-[#F8FAFC] rounded-xl">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative mx-auto mb-12 max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h2 className="font-geist text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Showcase Your Skills in Three Steps
            </h2>
            <p className="font-geist text-[#CBD5E1] mt-3">
              Learn how I approach building projects, customizing solutions, and deploying them
              efficiently.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(6,182,212,0.2) 4.54%, rgba(139,92,246,0.26) 34.2%, rgba(6,182,212,0.1) 77.55%)',
            }}
          ></div>
        </div>
        <hr className="bg-[#CBD5E1]/30 mx-auto mb-10 h-px w-1/2" />

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.3,
                  x: 0,
                  scale: index === currentFeature ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14',
                    index === currentFeature
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-500 scale-110 [box-shadow:0_0_15px_rgba(6,182,212,0.3)]'
                      : 'border-[#CBD5E1]/30 bg-[#1A1F3A]',
                  )}
                >
                  {feature.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold md:text-2xl">{feature.title}</h3>
                  <p className="text-[#CBD5E1] text-sm md:text-base">{feature.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              'border-cyan-500/20 relative order-1 h-[200px] overflow-hidden rounded-xl [box-shadow:0_5px_30px_-15px_rgba(6,182,212,0.3)] md:order-2 md:h-[300px] lg:h-[400px]',
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full transform object-cover transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                      <div className="from-[#0A0F2C] via-[#0A0F2C]/50 absolute right-0 bottom-0 left-0 h-2/3 bg-gradient-to-t to-transparent" />
                      <div className="bg-[#0A0F2C]/80 absolute bottom-4 left-4 rounded-lg p-2 backdrop-blur-sm">
                        <span className="text-cyan-500 text-xs font-medium">{feature.step}</span>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
