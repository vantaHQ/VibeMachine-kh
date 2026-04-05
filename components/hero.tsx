"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Download, Wallet } from "lucide-react"

const MIN_BUDGET = 500
const MAX_BUDGET = 30000
const STEP = 500

function formatKES(value: number) {
  return new Intl.NumberFormat('en-KE').format(value)
}

interface HeroProps {
  onBudgetChange?: (budget: number) => void
}

export function Hero({ onBudgetChange }: HeroProps) {
  const [budget, setBudget] = useState(5000)
  const [isDragging, setIsDragging] = useState(false)

  const percentage = ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newBudget = Number(e.target.value)
    setBudget(newBudget)
    onBudgetChange?.(newBudget)
  }, [onBudgetChange])

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-16 text-center md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl space-y-8"
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
          className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
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

        {/* Budget Slider - Integrated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto w-full max-w-lg"
        >
          <div className="relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <div className="relative space-y-6">
              {/* Header */}
              <div className="text-center">
                <motion.div
                  animate={{ rotate: isDragging ? [0, -5, 5, 0] : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30"
                >
                  <Wallet className="h-7 w-7 text-background" />
                </motion.div>
                <p className="mb-1 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  Your Budget
                </p>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={budget}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="text-3xl font-bold text-foreground md:text-4xl"
                  >
                    {formatKES(budget)} <span className="text-lg font-semibold text-primary">KES</span>
                  </motion.h3>
                </AnimatePresence>
              </div>

              {/* Custom Slider */}
              <div className="space-y-3">
                <div className="relative h-4 rounded-full bg-secondary/80">
                  {/* Track Fill */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary to-accent"
                    style={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-primary/40 blur-lg"
                    style={{ left: `calc(${percentage}% - 12px)` }}
                    animate={{ scale: isDragging ? 1.5 : 1 }}
                  />
                  
                  {/* Native Range Input (Invisible but functional) */}
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
                    style={{ left: `calc(${percentage}% - 12px)` }}
                    animate={{ scale: isDragging ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="relative h-6 w-6 rounded-full border-3 border-background bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50">
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

              {/* Feedback Text */}
              <motion.div
                animate={{ opacity: isDragging ? 1 : 0.7 }}
                className="rounded-xl bg-secondary/50 px-4 py-3 text-center"
              >
                <p className="text-sm text-muted-foreground">
                  Finding the best spots for your pocket...
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-3 gap-8"
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
              <p className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs - Now below stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-background shadow-[0_0_20px_rgba(0,220,200,0.4),0_0_40px_rgba(180,100,255,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(0,220,200,0.6),0_0_60px_rgba(180,100,255,0.3)]"
          >
            <Play className="h-4 w-4 transition-transform group-hover:scale-110" fill="currentColor" />
            Explore Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-xl transition-colors hover:bg-secondary"
          >
            <Download className="h-4 w-4" />
            Download App
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
