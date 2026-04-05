"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet } from "lucide-react"

const MIN_BUDGET = 500
const MAX_BUDGET = 30000
const STEP = 500

function formatKES(value: number) {
  return new Intl.NumberFormat('en-KE').format(value)
}

export function BudgetSlider() {
  const [budget, setBudget] = useState(5000)
  const [isDragging, setIsDragging] = useState(false)

  const percentage = ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
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

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-xl bg-gradient-to-r from-primary to-accent py-3.5 text-sm font-semibold text-background shadow-[0_0_20px_rgba(0,220,200,0.4),0_0_40px_rgba(180,100,255,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(0,220,200,0.6),0_0_60px_rgba(180,100,255,0.3)]"
          >
            Explore Spots in KES
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
