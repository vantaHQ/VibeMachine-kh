"use client"

import { motion } from "framer-motion"
import { Sparkles, Heart, Flame, Wine, Beer, Laptop, Sun } from "lucide-react"
import { VibeCard } from "./vibe-card"

const vibes = [
  {
    title: "Signature Series",
    description: "The elite tier. Fine dining, skyline views, and premium service.",
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #92400e 100%)",
  },
  {
    title: "Soft Life",
    description: "Aesthetic gardens, cozy brunch spots, and 'Instagrammable' corners.",
    icon: Heart,
    gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
  },
  {
    title: "The Hype",
    description: "High energy, loud music, and the best crowds in the city.",
    icon: Flame,
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  },
  {
    title: "Cocktails & Tapas",
    description: "Sophisticated lounges for evening wind-downs and small plates.",
    icon: Wine,
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #5b21b6 100%)",
  },
  {
    title: "Sundowners",
    description: "Golden hour magic. Rooftops positioned for the Nairobi sunset.",
    icon: Sun,
    gradient: "linear-gradient(135deg, #fb7185 0%, #e11d48 100%)",
  },
  {
    title: "Choma & Beers",
    description: "The local soul. Open-air grills and cold drinks.",
    icon: Beer,
    gradient: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
  },
  {
    title: "Work Remote",
    description: "Fast WiFi, quiet corners, and bottomless coffee.",
    icon: Laptop,
    gradient: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
  },
]

export function VibeGrid() {
  const handleVibeClick = (vibeTitle: string) => {
    const event = new CustomEvent("filterVibe", { 
      detail: { vibe: vibeTitle } 
    })
    window.dispatchEvent(event)

    const trendingSection = document.getElementById("trending")
    if (trendingSection) {
      trendingSection.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      })
    }
  }

  return (
    <section className="relative px-4 py-8 z-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          {/* Main Banner */}
          <h1 className="mb-2 text-5xl font-black uppercase italic tracking-tighter text-primary md:text-7xl lg:text-9xl">
            Discover Your Scene
          </h1>

          {/* Section Title */}
          <h2 className="mb-4 text-xl font-black uppercase tracking-[0.3em] text-white md:text-3xl">
            Pick Your Vibe
          </h2>

          {/* CTA */}
          <p className="mx-auto max-w-xl text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-60">
            Tap to filter the city by your current <span className="text-white">VIBES</span>
          </p>
        </div>

        {/* Simplified Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {vibes.map((vibe) => (
            <motion.div 
              key={vibe.title} 
              onClick={() => handleVibeClick(vibe.title)}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
            >
              <VibeCard 
                title={vibe.title}
                description={vibe.description}
                icon={vibe.icon}
                gradient={vibe.gradient}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}