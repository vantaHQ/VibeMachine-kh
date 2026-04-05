"use client"

import { motion } from "framer-motion"
import { Wine, PartyPopper, TreePine, Wifi, Utensils, ShoppingBag } from "lucide-react"
import { VibeCard } from "./vibe-card"

const vibes = [
  {
    title: "Soft Life",
    description: "Artcaffe vibes, Sunday brunch, and wine galleries",
    icon: Wine,
    gradient: "linear-gradient(135deg, oklch(0.75 0.18 80) 0%, oklch(0.65 0.2 50) 100%)",
  },
  {
    title: "The Hype",
    description: "Westlands nightlife, Alchemist beats, and rooftop lounges",
    icon: PartyPopper,
    gradient: "linear-gradient(135deg, oklch(0.65 0.22 330) 0%, oklch(0.55 0.25 300) 100%)",
  },
  {
    title: "Hidden Gems",
    description: "Karura trails, container cafes, and Karen escapes",
    icon: TreePine,
    gradient: "linear-gradient(135deg, oklch(0.6 0.18 145) 0%, oklch(0.5 0.15 160) 100%)",
  },
  {
    title: "Work from Anywhere",
    description: "Gigiri workspaces and high-speed fiber cafes",
    icon: Wifi,
    gradient: "linear-gradient(135deg, oklch(0.7 0.15 200) 0%, oklch(0.6 0.18 220) 100%)",
  },
  {
    title: "The Date Night",
    description: "Cinematic dinners and skyline views",
    icon: Utensils,
    gradient: "linear-gradient(135deg, oklch(0.65 0.2 15) 0%, oklch(0.55 0.22 0) 100%)",
  },
  {
    title: "Local Soul",
    description: "Market tours, thrift finds, and Nairobi street food",
    icon: ShoppingBag,
    gradient: "linear-gradient(135deg, oklch(0.7 0.18 60) 0%, oklch(0.6 0.15 40) 100%)",
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
            Discover Nairobi
          </h2>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Six curated lifestyle experiences, designed to help you explore the best of Nairobi.
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
