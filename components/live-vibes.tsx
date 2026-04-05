"use client"

import { motion } from "framer-motion"
import { MapPin, TrendingUp } from "lucide-react"

const liveSpots = [
  {
    name: "The Alchemist",
    neighborhood: "Westlands",
    vibeMatch: 98,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=450&fit=crop",
    category: "Nightlife",
  },
  {
    name: "Artcaffe Westgate",
    neighborhood: "Westlands",
    vibeMatch: 95,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=450&fit=crop",
    category: "Brunch",
  },
  {
    name: "Karura Forest",
    neighborhood: "Limuru Road",
    vibeMatch: 92,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=450&fit=crop",
    category: "Nature",
  },
  {
    name: "Tin Roof Cafe",
    neighborhood: "Karen",
    vibeMatch: 89,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=450&fit=crop",
    category: "Hidden Gem",
  },
  {
    name: "Sankara Rooftop",
    neighborhood: "Westlands",
    vibeMatch: 94,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=450&fit=crop",
    category: "Date Night",
  },
  {
    name: "Maasai Market",
    neighborhood: "Yaya Centre",
    vibeMatch: 87,
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=450&fit=crop",
    category: "Local Soul",
  },
]

function SpotCard({ spot, index }: { spot: typeof liveSpots[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass backdrop-blur-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary to-muted">
        <img 
          src={spot.image} 
          alt={spot.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Vibe Match Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1.5 text-xs font-bold text-background shadow-lg"
        >
          <TrendingUp className="h-3 w-3" />
          {spot.vibeMatch}% Match
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {spot.name}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{spot.neighborhood}</span>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/5" />
      </div>
    </motion.div>
  )
}

export function LiveVibes() {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">Live Vibes</span>
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Trending in Nairobi
          </h2>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Real-time recommendations based on what&apos;s hot right now.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {liveSpots.map((spot, index) => (
            <SpotCard key={spot.name} spot={spot} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
