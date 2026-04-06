"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin, TrendingUp, Loader2 } from "lucide-react"
import { useMemo, useEffect, useState } from "react"

const SPOTS_URL = "https://raw.githubusercontent.com/vantaHQ/VibeMachine-kh/refs/heads/main/data/spots.json"

// Map internal experience IDs to API vibe names
const vibeNameMap: Record<string, string> = {
  "soft-life": "Soft Life",
  "the-hype": "The Hype",
  "choma-beers": "Choma & Beers",
  "sundowners": "Sundowners",
  "99th-floor": "The 99th Floor",
  "work-remote": "Work Remote",
}

interface Spot {
  id: string
  name: string
  vibe: string
  location: string
  priceRange: string
  minPrice: number
  matchScore: number
  image: string
}

interface SpotCardProps {
  spot: Spot
  index: number
}

function SpotCard({ spot, index }: SpotCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
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
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.06 + 0.2 }}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1.5 text-xs font-bold text-background shadow-lg"
        >
          <TrendingUp className="h-3 w-3" />
          {spot.matchScore}% Match
        </motion.div>

        {/* Category Badge */}
        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {spot.vibe}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {spot.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{spot.location}</span>
          </div>
          <span className="text-xs font-medium text-primary">
            {spot.priceRange}
          </span>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/5" />
      </div>
    </motion.div>
  )
}

interface LiveVibesProps {
  budget?: number
  experience?: string | null
}

export function LiveVibes({ budget = 30000, experience = null }: LiveVibesProps) {
  const [spots, setSpots] = useState<Spot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSpots() {
      try {
        setIsLoading(true)
        const response = await fetch(SPOTS_URL)
        if (!response.ok) {
          throw new Error("Failed to fetch spots")
        }
        const data: Spot[] = await response.json()
        setSpots(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load spots")
      } finally {
        setIsLoading(false)
      }
    }
    fetchSpots()
  }, [])

  const filteredSpots = useMemo(() => {
    const vibeName = experience ? vibeNameMap[experience] : null
    
    return spots
      .filter(spot => {
        const withinBudget = spot.minPrice <= budget
        const matchesExperience = vibeName === null || spot.vibe === vibeName
        return withinBudget && matchesExperience
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6)
  }, [spots, budget, experience])

  const experienceLabel = experience ? vibeNameMap[experience] : null

  return (
    <section id="trending" className="relative px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">Live Results</span>
          </div>
          <h2 className="mb-3 text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {experienceLabel ? `${experienceLabel} Spots` : "Trending in Nairobi"}
          </h2>
          <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {isLoading ? "Loading spots..." : (
              <>
                {filteredSpots.length} spot{filteredSpots.length !== 1 ? 's' : ''} 
                {experience ? ` for ${experienceLabel}` : ''} 
                {' '}under {budget.toLocaleString()} KES
              </>
            )}
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <p className="text-base text-destructive">{error}</p>
          </motion.div>
        )}

        {/* Results Grid */}
        {!isLoading && !error && (
          <motion.div layout className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredSpots.map((spot, index) => (
                <SpotCard key={spot.id} spot={spot} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredSpots.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
          >
            <p className="text-base text-muted-foreground">
              No spots match your current filters. Try adjusting your budget or experience.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
