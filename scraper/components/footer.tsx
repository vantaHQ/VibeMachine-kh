"use client"

import { motion } from "framer-motion"
import { Waves, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer id="about" className="relative border-t border-glass-border px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Waves className="h-5 w-5 text-background" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-foreground">VibeMachine</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Nairobi&apos;s intelligent lifestyle guide. Discover the perfect spot for your vibe and your budget.
            </p>
            <div className="flex gap-3">
              {[Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-glass-border bg-glass text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Features", "Pricing", "Updates", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-foreground">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-foreground">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>&copy; 2026 VibeMachine. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
