"use client"

import React from "react"

interface AnimatedGroupProps {
  preset?: string
  className?: string
  children?: React.ReactNode
}

export const AnimatedGroup: React.FC<AnimatedGroupProps> = ({ preset, className, children }) => {
  // Minimal wrapper used by HeroProduct. Keep lightweight so there are no runtime dependencies.
  return (
    <div data-preset={preset} className={className}>
      {children}
    </div>
  )
}

export default AnimatedGroup
