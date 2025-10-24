"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function DesignerPricing() {
  return (
    <section className="relative bg-background px-4 py-24 md:px-6">
      <div className="mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
            Let’s Build Something Beautiful Together
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you’re launching your first brand or scaling your next big idea — choose a creative plan that fits your vision.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Starter Plan */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-8 text-left shadow-md hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold text-foreground">🌱 Starter Site</h3>
            <p className="mt-2 text-muted-foreground">Perfect for small businesses, creators, or personal brands.</p>
            <p className="mt-6 text-4xl font-bold text-foreground">$499</p>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> One-page website
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Mobile responsive
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Basic SEO setup
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Contact form integration
              </li>
            </ul>
            <button className="mt-8 w-full rounded-xl bg-primary text-primary-foreground py-3 font-medium hover:opacity-90 transition">
              Start Your Project
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            className="relative rounded-2xl border border-primary bg-card p-8 text-left shadow-lg transition-all hover:shadow-[0_0_30px_var(--primary-shadow)]"
            whileHover={{ scale: 1.03 }}
          >
            <div className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              Most Popular
            </div>
            <h3 className="text-2xl font-semibold text-foreground">🚀 Pro Brand</h3>
            <p className="mt-2 text-muted-foreground">For growing brands that want to make an impression.</p>
            <p className="mt-6 text-4xl font-bold text-foreground">$1,499</p>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Up to 5 pages
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Custom animations & UI design
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> CMS setup (Next.js + Sanity/Notion)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Brand color & typography system
              </li>
            </ul>
            <button className="mt-8 w-full rounded-xl bg-primary text-primary-foreground py-3 font-medium hover:opacity-90 transition">
              Let’s Collaborate
            </button>
          </motion.div>

          {/* Custom Plan */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-8 text-left shadow-md hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold text-foreground">🏢 Custom Build</h3>
            <p className="mt-2 text-muted-foreground">For startups, agencies, and complex digital projects.</p>
            <p className="mt-6 text-4xl font-bold text-foreground">Custom Quote</p>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Full design system + tokens
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Web app or dashboard UI/UX
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Figma prototyping
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="text-primary" /> Priority updates & support
              </li>
            </ul>
            <button className="mt-8 w-full rounded-xl bg-primary text-primary-foreground py-3 font-medium hover:opacity-90 transition">
              Book Discovery Call
            </button>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-8 text-center text-muted-foreground">
          <div>✨ 100% Custom Design</div>
          <div>⚡ Fast Turnaround</div>
          <div>💬 Ongoing Support</div>
          <div>🧠 No Hidden Fees</div>
        </div>
      </div>
    </section>
  )
}
