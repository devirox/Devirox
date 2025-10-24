"use client"

import { useState } from "react"
import ExpandableCards, { type Card } from "./ui/ExpandableCards"

const ExpandableCardsDemo = () => {
  const [selected, setSelected] = useState<number | null>(null)

  const demoCards: Card[] = [
    {
      id: 1,
      title: "Personal Portfolio",
      image: "/projects/portfolio-screenshot.png",
      content:
        "A responsive personal portfolio built with Next.js, TypeScript, and TailwindCSS. Showcases my skills, projects, and experience.",
      author: {
        name: "Your Name",
        role: "Full-Stack Developer",
        image: "/avatars/your-avatar.png",
      },
    },
    {
      id: 2,
      title: "E-commerce Platform",
      image: "/projects/ecommerce-screenshot.png",
      content:
        "Full-stack e-commerce application with AWS backend, Stripe integration, and real-time order management.",
      author: {
        name: "Your Name",
        role: "Full-Stack Developer",
        image: "/avatars/your-avatar.png",
      },
    },
    {
      id: 3,
      title: "Task Manager App",
      image: "/projects/taskmanager-screenshot.png",
      content:
        "Task management web app with real-time collaboration using WebSockets and a MongoDB backend.",
      author: {
        name: "Your Name",
        role: "Full-Stack Developer",
        image: "/avatars/your-avatar.png",
      },
    },
    {
      id: 4,
      title: "Blog Platform",
      image: "/projects/blog-screenshot.png",
      content:
        "Custom blog platform built with Next.js, supporting markdown posts, dynamic routing, and SEO optimization.",
      author: {
        name: "Your Name",
        role: "Full-Stack Developer",
        image: "/avatars/your-avatar.png",
      },
    },
  ]

  return (
    <ExpandableCards cards={demoCards} selectedCard={selected} onSelect={setSelected} />
  )
}

export default ExpandableCardsDemo
