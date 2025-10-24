"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"
import Image from "next/image"

const portfolioTestimonials = [
  {
    text: 'Working with [Your Name] was a game-changer. My website was fully functional and beautifully designed in record time.',
    imageSrc: 'https://i.pravatar.cc/96?img=12',
    name: 'Alex Johnson',
    username: '@alexjohnson',
    role: 'Startup Founder',
  },
  {
    text: 'The attention to detail and smooth animations made our platform look modern and professional. Highly recommended!',
    imageSrc: 'https://i.pravatar.cc/96?img=15',
    name: 'Maria Lee',
    username: '@marialee',
    role: 'Product Manager',
  },
  {
    text: 'Delivered a full-stack solution on AWS quickly and efficiently. Communication and collaboration were excellent.',
    imageSrc: 'https://i.pravatar.cc/96?img=22',
    name: 'David Kim',
    username: '@davidkim',
    role: 'CTO at WebSolutions',
  },
  {
    text: 'Provided insights and implemented features that improved user experience dramatically. Truly skilled developer!',
    imageSrc: 'https://i.pravatar.cc/96?img=28',
    name: 'Sophia Martinez',
    username: '@sophiamartinez',
    role: 'UX Designer',
  },
  {
    text: 'Built a highly responsive web app with clean code, scalable architecture, and smooth animations. Impressive work.',
    imageSrc: 'https://i.pravatar.cc/96?img=31',
    name: 'Liam Brown',
    username: '@liambrown',
    role: 'Founder at StartupHub',
  },
]

interface Testimonial {
  text: string
  imageSrc: string
  name: string
  username: string
  role?: string
}

interface Props {
  testimonials?: Testimonial[]
  title?: string
  subtitle?: string
  autoplaySpeed?: number
  className?: string
}

export default function TestimonialsCarousel({
  testimonials = portfolioTestimonials,
  title = "What Clients Say",
  subtitle = "Real feedback from clients and collaborators on projects I’ve delivered.",
  autoplaySpeed = 3000,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Duplicate items so we can loop smoothly
  const items = [...testimonials, ...testimonials]

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let rafId: number | null = null
    let autoplay: number | null = null

    const scrollNext = () => {
      if (!el) return
      const card = el.querySelector('[data-card]') as HTMLElement | null
      const step = card ? card.offsetWidth + 16 : el.clientWidth / 3
      // smooth scroll by step
      el.scrollBy({ left: step, behavior: 'smooth' })
      // if we've scrolled near the end, reset to start (loop)
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
        // small timeout to allow smooth scroll finish
        setTimeout(() => {
          el.scrollLeft = 0
        }, 450)
      }
    }

    autoplay = window.setInterval(() => {
      // use requestAnimationFrame for smoother timing
      rafId = requestAnimationFrame(scrollNext)
    }, autoplaySpeed)

    return () => {
      if (autoplay) clearInterval(autoplay)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [autoplaySpeed, testimonials])

  return (
    <section className={cn('relative overflow-hidden py-16 md:py-24', className)}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.2),transparent_60%)]" />
        <div className="bg-primary/5 absolute top-1/4 left-1/4 h-32 w-32 rounded-full blur-3xl" />
        <div className="bg-primary/10 absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-12 text-center md:mb-16"
        >
          <h1 className="from-foreground to-foreground/40 mb-4 bg-gradient-to-b bg-clip-text text-3xl font-bold text-transparent md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <div
          ref={containerRef}
          className="-mx-4 overflow-x-auto scroll-pl-6 hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          <div className="flex gap-4 px-4">
            {items.map((t, i) => (
              <div
                data-card
                key={`${t.name}-${i}`}
                className="min-w-[320px] max-w-[420px] flex-shrink-0"
                style={{ scrollSnapAlign: 'center' }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: (i % testimonials.length) * 0.05 }}
                  viewport={{ once: true }}
                  className="relative rounded-2xl border bg-gradient-to-b p-6 shadow-md backdrop-blur-sm"
                >
                  <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b blur-md from-primary/15 to-transparent" />
                  <div className="text-primary mb-4">
                    <Quote className="h-10 w-10 -rotate-180" />
                  </div>

                  <p className="text-foreground/90 mb-6 text-base leading-relaxed">{t.text}</p>

                  <div className="mt-auto flex items-center gap-3 border-t pt-3">
                    <Image
                      src={t.imageSrc}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                    <div className="flex flex-col">
                      <h4 className="text-foreground font-medium whitespace-nowrap">{t.name}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-primary/80 text-sm whitespace-nowrap">{t.username}</p>
                        {t.role && (
                          <>
                            <span className="text-muted-foreground flex-shrink-0">•</span>
                            <p className="text-muted-foreground text-sm whitespace-nowrap">{t.role}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
