"use client"

import { motion } from "framer-motion"
import { Leaf, Heart, Moon, Flame, Wind, Mountain } from "lucide-react"
import { VibeCard } from "./vibe-card"

const vibes = [
  {
    title: "Nature",
    description: "Forest rain, ocean waves, and gentle streams",
    icon: Leaf,
    gradient: "linear-gradient(135deg, oklch(0.65 0.2 145) 0%, oklch(0.55 0.15 160) 100%)",
  },
  {
    title: "Soft Life",
    description: "Cozy cafes, warm fireplaces, and lo-fi beats",
    icon: Heart,
    gradient: "linear-gradient(135deg, oklch(0.7 0.18 350) 0%, oklch(0.6 0.2 330) 100%)",
  },
  {
    title: "Deep Sleep",
    description: "Drift into peaceful slumber with ambient drones",
    icon: Moon,
    gradient: "linear-gradient(135deg, oklch(0.5 0.15 270) 0%, oklch(0.4 0.18 290) 100%)",
  },
  {
    title: "Focus Fire",
    description: "Concentration-boosting frequencies for deep work",
    icon: Flame,
    gradient: "linear-gradient(135deg, oklch(0.7 0.2 40) 0%, oklch(0.6 0.22 25) 100%)",
  },
  {
    title: "Breathe",
    description: "Calming soundscapes for meditation and mindfulness",
    icon: Wind,
    gradient: "linear-gradient(135deg, oklch(0.75 0.15 180) 0%, oklch(0.65 0.12 200) 100%)",
  },
  {
    title: "Adventure",
    description: "Epic scores and cinematic atmospheres",
    icon: Mountain,
    gradient: "linear-gradient(135deg, oklch(0.55 0.12 50) 0%, oklch(0.45 0.1 40) 100%)",
  },
]

export function VibeGrid() {
  return (
    <section className="relative px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Discover Your Vibe
          </h2>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Six curated mood collections, each designed to transform your space and elevate your moment.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {vibes.map((vibe, index) => (
            <VibeCard key={vibe.title} {...vibe} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
