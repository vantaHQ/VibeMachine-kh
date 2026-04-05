"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Download, Wallet, Wine, PartyPopper, Flame, Sunset, UtensilsCrossed, Wifi, RotateCcw } from "lucide-react"

const MIN_BUDGET = 500
const MAX_BUDGET = 30000
const STEP = 500

function formatKES(value: number) {
  return new Intl.NumberFormat('en-KE').format(value)
}

const experiences = [
  { id: "soft-life", label: "Soft Life", icon: Wine, color: "from-amber-400 to-orange-500" },
  { id: "the-hype", label: "The Hype", icon: PartyPopper, color: "from-pink-500 to-purple-600" },
  { id: "choma-beers", label: "Choma & Beers", icon: Flame, color: "from-orange-500 to-red-600" },
  { id: "sundowners", label: "Sundowners", icon: Sunset, color: "from-amber-500 to-rose-500" },
  { id: "99th-floor", label: "99th Floor", icon: UtensilsCrossed, color: "from-violet-400 to-purple-600" },
  { id: "work-remote", label: "Work Remote", icon: Wifi, color: "from-cyan-400 to-blue-500" },
]

interface HeroProps {
  onBudgetChange?: (budget: number) => void
  onExperienceChange?: (experience: string | null) => void
  selectedExperience?: string | null
}

export function Hero({ onBudgetChange, onExperienceChange, selectedExperience }: HeroProps) {
  const [budget, setBudget] = useState(30000)
  const [isDragging, setIsDragging] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const percentage = ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100
  const hasActiveFilters = selectedExperience !== null || budget !== 30000

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newBudget = Number(e.target.value)
    setBudget(newBudget)
    
    // Debounce the callback for performance (300ms)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onBudgetChange?.(newBudget)
    }, 300)
  }, [onBudgetChange])

  const handleExperienceClick = (id: string) => {
    if (selectedExperience === id) {
      onExperienceChange?.(null)
    } else {
      onExperienceChange?.(id)
    }
  }

  const handleReset = () => {
    setBudget(30000)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    onBudgetChange?.(30000)
    onExperienceChange?.(null)
  }

  return (
    <section id="explore" className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-12 text-center md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto w-full max-w-4xl space-y-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 backdrop-blur-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-sm font-medium text-foreground">Discover Nairobi&apos;s best spots</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Find Your Perfect
          <span className="relative ml-3 inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary via-chart-3 to-accent bg-clip-text text-transparent">
              Spot
            </span>
            <motion.span
              className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r from-primary/20 via-chart-3/20 to-accent/20 blur-lg"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </span>
        </motion.h1>

        {/* TOP TRACK: Experience Tiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Choose Your Vibe
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {experiences.map((exp, index) => {
              const Icon = exp.icon
              const isSelected = selectedExperience === exp.id
              return (
                <motion.button
                  key={exp.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleExperienceClick(exp.id)}
                  className={`group relative flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium backdrop-blur-xl transition-all ${
                    isSelected 
                      ? "border-primary/50 bg-primary/20 text-foreground shadow-lg shadow-primary/20" 
                      : "border-glass-border bg-glass text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${exp.color} transition-transform ${isSelected ? "scale-110" : "group-hover:scale-105"}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{exp.label}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="selected-indicator"
                      className="absolute -inset-px rounded-xl border-2 border-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* BOTTOM TRACK: Budget Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mx-auto w-full max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-glass-border bg-glass p-5 backdrop-blur-xl md:p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <div className="relative space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: isDragging ? [0, -5, 5, 0] : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30"
                  >
                    <Wallet className="h-5 w-5 text-background" />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Or Filter by Budget
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={budget}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.15 }}
                        className="text-xl font-bold text-foreground md:text-2xl"
                      >
                        {formatKES(budget)} <span className="text-sm font-semibold text-primary">KES</span>
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Reset Button */}
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="flex items-center gap-1.5 rounded-lg border border-glass-border bg-glass px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset Filters
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Slider */}
              <div className="space-y-2">
                <div className="relative h-3 rounded-full bg-secondary/80">
                  {/* Track Fill */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary to-accent"
                    style={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-primary/40 blur-lg"
                    style={{ left: `calc(${percentage}% - 10px)` }}
                    animate={{ scale: isDragging ? 1.5 : 1 }}
                  />
                  
                  {/* Native Range Input */}
                  <input
                    type="range"
                    min={MIN_BUDGET}
                    max={MAX_BUDGET}
                    step={STEP}
                    value={budget}
                    onChange={handleSliderChange}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                  />
                  
                  {/* Custom Handle */}
                  <motion.div
                    className="pointer-events-none absolute top-1/2 z-10 -translate-y-1/2"
                    style={{ left: `calc(${percentage}% - 10px)` }}
                    animate={{ scale: isDragging ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="relative h-5 w-5 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50">
                      {isDragging && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-primary"
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
                
                {/* Range Labels */}
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>{formatKES(MIN_BUDGET)} KES</span>
                  <span>{formatKES(MAX_BUDGET)} KES</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-3 gap-6"
        >
          {[
            { value: "50K+", label: "Active Users" },
            { value: "500+", label: "Curated Spots" },
            { value: "4.9", label: "App Rating" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-xl font-bold text-foreground md:text-2xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-background shadow-[0_0_20px_rgba(0,220,200,0.4),0_0_40px_rgba(180,100,255,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(0,220,200,0.6),0_0_60px_rgba(180,100,255,0.3)]"
          >
            <Play className="h-4 w-4 transition-transform group-hover:scale-110" fill="currentColor" />
            Explore Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-xl transition-colors hover:bg-secondary"
          >
            <Download className="h-4 w-4" />
            Download App
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
