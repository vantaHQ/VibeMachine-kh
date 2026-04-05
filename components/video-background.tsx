"use client"

import { motion } from "framer-motion"

export function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Placeholder gradient animation simulating video */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background"
        animate={{
          background: [
            "linear-gradient(135deg, oklch(0.08 0.01 270) 0%, oklch(0.12 0.03 200) 50%, oklch(0.08 0.01 270) 100%)",
            "linear-gradient(135deg, oklch(0.08 0.01 270) 0%, oklch(0.1 0.04 280) 50%, oklch(0.08 0.01 270) 100%)",
            "linear-gradient(135deg, oklch(0.08 0.01 270) 0%, oklch(0.11 0.03 320) 50%, oklch(0.08 0.01 270) 100%)",
            "linear-gradient(135deg, oklch(0.08 0.01 270) 0%, oklch(0.12 0.03 200) 50%, oklch(0.08 0.01 270) 100%)",
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-3/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
    </div>
  )
}
