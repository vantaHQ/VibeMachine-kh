"use client"

import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Flame, Wine, Beer, Laptop, Sparkles, Utensils, MapPin, Sun } from "lucide-react"
import spotsData from "@/data/spots.json"

/**
 * Mapping vibes to icons and brand colors.
 * Added 'Sundowners' to support the specific entry in your JSON.
 */
const VIBE_MAP: Record<string, any> = {
  "Signature Series": { icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/10" },
  "Soft Life": { icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
  "The Hype": { icon: Flame, color: "text-blue-500", bg: "bg-blue-500/10" },
  "Cocktails & Tapas": { icon: Wine, color: "text-purple-500", bg: "bg-purple-500/10" },
  "Choma & Beers": { icon: Beer, color: "text-orange-500", bg: "bg-orange-500/10" },
  "Work Remote": { icon: Laptop, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  "Sundowners": { icon: Sun, color: "text-rose-400", bg: "bg-rose-400/10" }
}

export function TrendingSection() {
  const [activeVibe, setActiveVibe] = useState("all")
  const [activePrice, setActivePrice] = useState<number | null>(null)

  // Listen for filter events from VibeGrid and PricingSection
  useEffect(() => {
    const handleFilter = (e: any) => {
      // Handle Vibe filtering (Strings)
      if (e.detail?.vibe) {
        setActiveVibe(e.detail.vibe)
      }
      // Handle Price filtering (Numeric from Slider)
      if (e.detail?.price !== undefined && e.detail?.price !== null) {
        setActivePrice(Number(e.detail.price))
      }
    }

    window.addEventListener("filterVibe", handleFilter)
    return () => window.removeEventListener("filterVibe", handleFilter)
  }, [])

  /**
   * The Filter Engine:
   * Compares the JSON 'minPrice' against the slider's 'activePrice'
   */
  const filteredSpots = useMemo(() => {
    return (spotsData as any[]).filter(spot => {
      const vibeMatch = activeVibe === "all" || spot.vibe === activeVibe
      
      // If a budget is set, only show spots where the minimum entry price fits the budget
      const priceMatch = !activePrice || spot.minPrice <= activePrice
      
      return vibeMatch && priceMatch
    })
  }, [activeVibe, activePrice])

  const resetFilters = () => {
    setActiveVibe("all")
    setActivePrice(null)
  }

  return (
    <section id="trending" className="py-20 px-4 relative z-10 scroll-mt-24 min-h-[700px]">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-8 bg-primary/50" />
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                Current Selection
              </p>
            </div>
            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
              Trending
            </h2>
          </div>
          
          {/* Active Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 mt-6 md:mt-0">
            {(activeVibe !== "all" || activePrice) && (
              <button 
                onClick={resetFilters}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
              >
                Clear Filters
              </button>
            )}
            {activeVibe !== "all" && (
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                {activeVibe}
              </span>
            )}
            {activePrice && (
              <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-widest text-white">
                Under {activePrice.toLocaleString()} KES
              </span>
            )}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredSpots.length > 0 ? (
              filteredSpots.map((spot) => {
                const vibeInfo = VIBE_MAP[spot.vibe] || { icon: Utensils, color: "text-white", bg: "bg-white/5" }
                const VibeIcon = vibeInfo.icon
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    key={spot.id}
                    className="group relative p-6 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-500 overflow-hidden"
                  >
                    {/* Atmospheric Glow */}
                    <div className={`absolute -right-4 -top-4 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full ${vibeInfo.bg}`} />
                    
                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-4 rounded-2xl ${vibeInfo.bg} ${vibeInfo.color}`}>
                        <VibeIcon size={24} strokeWidth={2.5} />
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                          {spot.priceRange}
                        </span>
                        <p className="mt-2 text-[9px] text-white/30 font-black uppercase tracking-widest">
                          {spot.matchScore}% Match
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl font-black text-white italic tracking-tighter leading-tight group-hover:text-primary transition-colors">
                        {spot.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white/40">
                        <MapPin size={14} className="text-primary/50" />
                        <p className="text-[11px] font-black uppercase tracking-widest leading-none">
                          {spot.location}, Nairobi
                        </p>
                      </div>
                    </div>
                    
                    {/* Card Footer - Visible on Hover */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                      <span className="text-[10px] font-black uppercase text-white tracking-[0.2em]">
                        {spot.vibe}
                      </span>
                      <button className="text-[10px] font-black uppercase text-primary border-b border-primary/0 hover:border-primary transition-all">
                        Explore Spot
                      </button>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              /* No Results State */
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="text-white/20" size={40} />
                </div>
                <h3 className="text-white font-black uppercase tracking-widest mb-2">No Vibes Found</h3>
                <p className="text-white/40 text-xs font-medium max-w-xs mx-auto mb-8 uppercase tracking-tighter leading-relaxed">
                  Try adjusting your budget or selecting 'All Vibes' to see more results.
                </p>
                <button 
                  onClick={resetFilters} 
                  className="px-8 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-transform"
                >
                  Reset Everything
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}