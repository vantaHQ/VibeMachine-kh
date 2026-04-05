"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin, TrendingUp } from "lucide-react"
import { useMemo } from "react"

const allSpots = [
  // The Hype
  {
    name: "The Alchemist",
    neighborhood: "Westlands",
    vibeMatch: 98,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=450&fit=crop",
    category: "the-hype",
    categoryLabel: "Nightlife",
    priceRange: [3000, 15000],
  },
  {
    name: "Brew Bistro Rooftop",
    neighborhood: "Fortis Tower",
    vibeMatch: 94,
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&h=450&fit=crop",
    category: "the-hype",
    categoryLabel: "Rooftop Bar",
    priceRange: [2000, 8000],
  },
  // Soft Life
  {
    name: "Artcaffe Westgate",
    neighborhood: "Westlands",
    vibeMatch: 95,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=450&fit=crop",
    category: "soft-life",
    categoryLabel: "Brunch",
    priceRange: [800, 3500],
  },
  {
    name: "Mercury Lounge",
    neighborhood: "ABC Place",
    vibeMatch: 93,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=450&fit=crop",
    category: "soft-life",
    categoryLabel: "Wine Bar",
    priceRange: [2500, 10000],
  },
  // Choma & Beers
  {
    name: "Roadhouse Grill",
    neighborhood: "Karen",
    vibeMatch: 96,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=450&fit=crop",
    category: "choma-beers",
    categoryLabel: "BBQ & Grill",
    priceRange: [1500, 6000],
  },
  {
    name: "Carnivore Restaurant",
    neighborhood: "Langata",
    vibeMatch: 97,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop",
    category: "choma-beers",
    categoryLabel: "Nyama Choma",
    priceRange: [2500, 8000],
  },
  {
    name: "K1 Klubhouse",
    neighborhood: "Parklands",
    vibeMatch: 89,
    image: "https://images.unsplash.com/photo-1575037614876-c38a4c44f5bd?w=600&h=450&fit=crop",
    category: "choma-beers",
    categoryLabel: "Garden Pub",
    priceRange: [800, 3500],
  },
  // Sundowners
  {
    name: "Sankara Rooftop",
    neighborhood: "Westlands",
    vibeMatch: 94,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=450&fit=crop",
    category: "sundowners",
    categoryLabel: "Rooftop Views",
    priceRange: [3000, 12000],
  },
  {
    name: "Level 8 Sky Lounge",
    neighborhood: "Riverside",
    vibeMatch: 92,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=450&fit=crop",
    category: "sundowners",
    categoryLabel: "Sunset Views",
    priceRange: [2000, 8000],
  },
  // 99th Floor (Fine Dining)
  {
    name: "Talisman",
    neighborhood: "Karen",
    vibeMatch: 98,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=450&fit=crop",
    category: "99th-floor",
    categoryLabel: "Fine Dining",
    priceRange: [8000, 25000],
  },
  {
    name: "Hemingways Nairobi",
    neighborhood: "Karen",
    vibeMatch: 97,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=450&fit=crop",
    category: "99th-floor",
    categoryLabel: "Luxury Hotel",
    priceRange: [15000, 30000],
  },
  {
    name: "La Petite",
    neighborhood: "Lavington",
    vibeMatch: 95,
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&h=450&fit=crop",
    category: "99th-floor",
    categoryLabel: "French Cuisine",
    priceRange: [6000, 18000],
  },
  // Work Remote
  {
    name: "Java House Hub",
    neighborhood: "CBD",
    vibeMatch: 85,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=450&fit=crop",
    category: "work-remote",
    categoryLabel: "Cafe",
    priceRange: [500, 2000],
  },
  {
    name: "The Social House",
    neighborhood: "Gigiri",
    vibeMatch: 92,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=450&fit=crop",
    category: "work-remote",
    categoryLabel: "Co-working",
    priceRange: [1000, 5000],
  },
  {
    name: "Nairobi Garage",
    neighborhood: "Delta Towers",
    vibeMatch: 90,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=450&fit=crop",
    category: "work-remote",
    categoryLabel: "Tech Hub",
    priceRange: [1500, 6000],
  },
]

interface SpotCardProps {
  spot: typeof allSpots[0]
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
          {spot.vibeMatch}% Match
        </motion.div>

        {/* Category Badge */}
        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {spot.categoryLabel}
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
            <span>{spot.neighborhood}</span>
          </div>
          <span className="text-xs font-medium text-primary">
            {spot.priceRange[0].toLocaleString()} - {spot.priceRange[1].toLocaleString()} KES
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
  const filteredSpots = useMemo(() => {
    return allSpots
      .filter(spot => {
        const withinBudget = spot.priceRange[0] <= budget
        const matchesExperience = experience === null || spot.category === experience
        return withinBudget && matchesExperience
      })
      .sort((a, b) => b.vibeMatch - a.vibeMatch)
      .slice(0, 6)
  }, [budget, experience])

  const experienceLabel = experience 
    ? experience.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : null

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
            {filteredSpots.length} spot{filteredSpots.length !== 1 ? 's' : ''} 
            {experience ? ` for ${experienceLabel}` : ''} 
            {' '}under {budget.toLocaleString()} KES
          </p>
        </motion.div>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredSpots.map((spot, index) => (
              <SpotCard key={spot.name} spot={spot} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSpots.length === 0 && (
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
