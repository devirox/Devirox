"use client"

import React from "react"

interface AnimatedTextProps {
  // Avoid using the global JSX namespace in case types are not available in some environments.
  as?: React.ElementType
  className?: string
  delay?: number
  children?: React.ReactNode
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ as = "div", className, delay, children }) => {
  const Component = as as React.ElementType
  // Minimal -- the real project might animate text; this keeps markup compatible.
  return (
    <Component className={className} style={{ transitionDelay: `${(delay || 0) * 1000}ms` }}>
      {children}
    </Component>
  )
}

export default AnimatedText
