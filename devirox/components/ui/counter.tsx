"use client"

import React, { useEffect, useRef, useState } from "react"

interface NumberTickerProps {
  value: number
  decimalPlaces?: number
  duration?: number
  className?: string
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  decimalPlaces = 0,
  duration = 800,
  className,
}) => {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    startRef.current = start

    const from = 0
    const to = value

    const step = (now: number) => {
      const elapsed = now - (startRef.current || now)
      const t = Math.min(1, elapsed / duration)
      const current = from + (to - from) * t
      setDisplay(Number(current.toFixed(decimalPlaces)))

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, decimalPlaces, duration])

  return <span className={className}>{display.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })}</span>
}

export default NumberTicker
