"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedGroup } from "@/components/landing/AnimatedGroup"
import { AnimatedText } from "@/components/landing/AnimatedText"

import HeroHeader from "./HeroHeader"
import "@/app/styles/smoothui.css"

const CELL_SIZE = 120 // px
const COLORS = [
  "oklch(0.72 0.2 352.53)", // blue
  "#A764FF",
  "#4B94FD",
  "#FD4B4E",
  "#FF8743",
]

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

function SubGrid() {
  const [cellColors, setCellColors] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ])
  // Add refs for leave timeouts
  const leaveTimeouts = useRef<(NodeJS.Timeout | null)[]>([
    null,
    null,
    null,
    null,
  ])

  function handleHover(cellIdx: number) {
    // Clear any pending timeout for this cell
    const timeout = leaveTimeouts.current[cellIdx]
    if (timeout) {
      clearTimeout(timeout)
      leaveTimeouts.current[cellIdx] = null
    }
    setCellColors((prev) =>
      prev.map((c, i) => (i === cellIdx ? getRandomColor() : c))
    )
  }
  function handleLeave(cellIdx: number) {
    // Add a small delay before removing the color
    leaveTimeouts.current[cellIdx] = setTimeout(() => {
      setCellColors((prev) => prev.map((c, i) => (i === cellIdx ? null : c)))
      leaveTimeouts.current[cellIdx] = null
    }, 120)
  }
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      leaveTimeouts.current.forEach((t) => t && clearTimeout(t))
    }
  }, [])

  return (
    <div className="subgrid" style={{ pointerEvents: "none" }}>
      {[0, 1, 2, 3].map((cellIdx) => (
        <button
          key={cellIdx}
          type="button"
          className="cell"
          style={{
            background: cellColors[cellIdx] || "transparent",
            pointerEvents: "auto",
          }}
          onMouseEnter={() => handleHover(cellIdx)}
          onMouseLeave={() => handleLeave(cellIdx)}
        />
      ))}
    </div>
  )
}

function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [grid, setGrid] = useState({ columns: 0, rows: 0 })

  useEffect(() => {
    function updateGrid() {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setGrid({
          columns: Math.ceil(width / CELL_SIZE),
          rows: Math.ceil(height / CELL_SIZE),
        })
      }
    }
    updateGrid()
    window.addEventListener("resize", updateGrid)
    return () => window.removeEventListener("resize", updateGrid)
  }, [])

  const total = grid.columns * grid.rows

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className="mainGrid"
        style={
          {
            gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
            gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
            "--grid-cell-size": `${CELL_SIZE}px`,
            width: "100%",
            height: "100%",
          } as React.CSSProperties
        }
      >
        {Array.from({ length: total }, (_, idx) => (
          <SubGrid key={`subgrid-${grid.columns}-${grid.rows}-${idx}`} />
        ))}
      </div>
    </div>
  )
}

export function HeroGrid() {
  return (
    <div className="relative">
      <HeroHeader />
      <main>
        <section className="relative overflow-hidden py-36">
          {/* Interactive animated grid background */}
          <InteractiveGrid />
          <AnimatedGroup
            preset="blur-slide"
            className="pointer-events-none relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 text-center sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:text-left"
          >
            <div className="pointer-events-auto flex max-w-xl flex-col items-center gap-6 lg:items-start">
              <div>
                <AnimatedText
                  as="h1"
                  className="mb-6 text-3xl font-bold tracking-tight text-pretty lg:text-5xl"
                >
                  Build your next project with{" "}
                  <span className="text-brand">Smoothui</span>
                </AnimatedText>
                <AnimatedText
                  as="p"
                  className="text-muted-foreground mx-auto max-w-2xl lg:text-lg"
                  delay={0.15}
                >
                  Smoothui gives you the building blocks to create stunning,
                  animated interfaces in minutes. Prototype rapidly, fine-tune
                  your visuals, and launch polished experiences without leaving
                  your design flow.
                </AnimatedText>
              </div>
              <AnimatedGroup
                preset="slide"
                className="pointer-events-auto flex flex-wrap justify-center gap-3 lg:justify-start"
              >
                <Button
                  variant="outline"
                  className="shadow-sm transition-shadow hover:shadow"
                >
                  Get Started
                </Button>
                <Button variant="secondary" className="group">
                  Learn more{" "}
                  <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </AnimatedGroup>
            </div>

            <AnimatedGroup
              preset="rise"
              className="pointer-events-none relative w-full max-w-lg"
            >
              <div className="pointer-events-auto">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-[40px] bg-gradient-to-br from-cyan-500/30 via-purple-500/10 to-transparent blur-3xl"
                />
                <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-background/70 p-4 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.8)] backdrop-blur">
                  <div
                    aria-hidden
                    className="absolute inset-x-10 top-8 h-16 rounded-full bg-gradient-to-r from-cyan-500/40 via-purple-500/20 to-transparent blur-2xl"
                  />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-900/20 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="h-3 w-24 rounded-full bg-white/40" />
                      <div className="flex gap-2">
                        <span className="size-2 rounded-full bg-emerald-400/80" />
                        <span className="size-2 rounded-full bg-cyan-400/70" />
                        <span className="size-2 rounded-full bg-violet-400/70" />
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="h-3 w-32 rounded-full bg-white/40" />
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-500/10" />
                          <div className="h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-500/10" />
                          <div className="h-12 rounded-xl bg-gradient-to-br from-amber-400/40 to-amber-400/10" />
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="h-3 w-20 rounded-full bg-white/30" />
                        <div className="mt-3 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent" />
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="h-3 w-20 rounded-full bg-white/30" />
                        <div className="mt-3 space-y-2">
                          <div className="h-2 rounded bg-white/20" />
                          <div className="h-2 rounded bg-white/10" />
                          <div className="h-2 rounded bg-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-left shadow-lg backdrop-blur">
                    <div className="flex size-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                      ✨
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-foreground">Visual-first workflow</p>
                      <p className="text-xs text-muted-foreground">
                        Drag, drop, and customize every component live.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </AnimatedGroup>
        </section>
      </main>
    </div>
  )
}

export default HeroGrid
