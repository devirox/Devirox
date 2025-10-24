"use client"

import { motion } from "framer-motion"
import React from "react"

interface FooterComplexProps {
  companyName?: string
  description?: string
  newsletter?: {
    title: string
    description: string
    placeholder: string
    buttonText: string
  }
  links?: {
    portfolio?: Array<{ name: string; url: string }>
    about?: Array<{ name: string; url: string }>
    contact?: Array<{ name: string; url: string }>
    legal?: Array<{ name: string; url: string }>
  }
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
    dribbble?: string
    youtube?: string
  }
  copyright?: string
}

export default function FooterComplex({
  companyName = "Your Name",
  description = "I craft modern, responsive, and engaging web experiences. Let’s bring your ideas to life with clean code and polished design.",
  newsletter = {
    title: "Stay in the Loop",
    description: "Get notified about my latest projects, tutorials, and updates.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },
  links = {
    portfolio: [
      { name: "Projects", url: "#projects" },
      { name: "Case Studies", url: "#case-studies" },
      { name: "Blog", url: "#blog" },
      { name: "Tutorials", url: "#tutorials" },
    ],
    about: [
      { name: "About Me", url: "#about" },
      { name: "Resume", url: "#resume" },
      { name: "Skills", url: "#skills" },
    ],
    contact: [
      { name: "Contact", url: "#contact" },
      { name: "Freelance", url: "#freelance" },
      { name: "Collaborate", url: "#collaborate" },
    ],
    legal: [
      { name: "Privacy Policy", url: "#privacy" },
      { name: "Terms of Service", url: "#terms" },
    ],
  },
  social = {
    twitter: "https://twitter.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    github: "https://github.com/yourhandle",
    dribbble: "https://dribbble.com/yourhandle",
    youtube: "https://youtube.com/@yourhandle",
  },
  copyright = "© 2025 Your Name. All rights reserved.",
}: FooterComplexProps) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12"
        >
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-foreground mb-4 text-2xl font-bold">
                {companyName}
              </h3>
              <p className="text-foreground/70 mb-8 max-w-md text-sm leading-relaxed">
                {description}
              </p>

              {/* Newsletter */}
              <div className="mb-8">
                <h4 className="text-foreground mb-2 text-lg font-semibold">
                  {newsletter.title}
                </h4>
                <p className="text-foreground/70 mb-4 text-sm">{newsletter.description}</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder={newsletter.placeholder}
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <motion.button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-2 text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {newsletter.buttonText}
                  </motion.button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {social.twitter && (
                  <motion.a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Twitter SVG */}
                  </motion.a>
                )}
                {social.linkedin && (
                  <motion.a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* LinkedIn SVG */}
                  </motion.a>
                )}
                {social.github && (
                  <motion.a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* GitHub SVG */}
                  </motion.a>
                )}
                {social.dribbble && (
                  <motion.a
                    href={social.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Dribbble SVG */}
                  </motion.a>
                )}
                {social.youtube && (
                  <motion.a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* YouTube SVG */}
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-4">
            {links.portfolio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wide">
                  Portfolio
                </h4>
                <ul className="space-y-3">
                  {links.portfolio.map((link) => (
                    <li key={link.name}>
                      <a href={link.url} className="text-foreground/70 hover:text-primary transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {links.about && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wide">About</h4>
                <ul className="space-y-3">
                  {links.about.map((link) => (
                    <li key={link.name}>
                      <a href={link.url} className="text-foreground/70 hover:text-primary transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {links.contact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wide">Contact</h4>
                <ul className="space-y-3">
                  {links.contact.map((link) => (
                    <li key={link.name}>
                      <a href={link.url} className="text-foreground/70 hover:text-primary transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {links.legal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h4 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wide">Legal</h4>
                <ul className="space-y-3">
                  {links.legal.map((link) => (
                    <li key={link.name}>
                      <a href={link.url} className="text-foreground/70 hover:text-primary transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-border pt-8 text-center"
        >
          <p className="text-foreground/60 text-sm">{copyright}</p>
        </motion.div>
      </div>
    </footer>
  )
}
