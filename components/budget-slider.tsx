"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Zap, Crown, type LucideIcon } from "lucide-react"
import type { BudgetTierJson } from "@/types/spots"

const TIER_ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Zap,
  Crown,
}

function tierIcon(name: string): LucideIcon {
  return TIER_ICONS[name] ?? Sparkles
}

export interface BudgetSliderProps {
  tiers: BudgetTierJson[]
  /** Used when the slider is uncontrolled (no `onTierChange`). */
  defaultTier?: number
  /** Controlled tier index (0 … tiers.length - 1). */
  currentTier?: number
  onTierChange?: (tierIndex: number) => void
  /** Slimmer layout without feature list or CTA (e.g. Trending filters). */
  compact?: boolean
}

export function BudgetSlider({
  tiers,
  defaultTier = 1,
  currentTier: controlledTier,
  onTierChange,
  compact = false,
}: BudgetSliderProps) {
  const maxIdx = Math.max(0, tiers.length - 1)
  const safeDefault = Math.min(Math.max(0, defaultTier), maxIdx)
  const [internalTier, setInternalTier] = useState(safeDefault)
  const controlled = onTierChange !== undefined && controlledTier !== undefined
  const tierIndex = controlled
    ? Math.min(Math.max(0, controlledTier), maxIdx)
    : Math.min(Math.max(0, internalTier), maxIdx)

  const setTier = (i: number) => {
    const next = Math.min(Math.max(0, i), maxIdx)
    if (controlled) onTierChange(next)
    else setInternalTier(next)
  }

  const tier = tiers[tierIndex]
  const TierIcon = tierIcon(tier.icon)
  const fillPct = maxIdx > 0 ? (tierIndex / maxIdx) * 100 : 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-md"
    >
      <div
        className={`relative overflow-hidden rounded-3xl border border-glass-border bg-glass backdrop-blur-xl ${
          compact ? "p-4 md:p-5" : "p-6 md:p-8"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="relative space-y-6">
          <div className="text-center">
            {!compact && (
              <motion.p
                className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Choose Your Vibe
              </motion.p>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-3"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent ${
                    compact ? "h-10 w-10" : "h-12 w-12"
                  }`}
                >
                  <TierIcon
                    className={`text-background ${compact ? "h-5 w-5" : "h-6 w-6"}`}
                  />
                </motion.div>
                <div className="min-w-0 text-left">
                  <h3
                    className={`font-bold text-foreground ${compact ? "text-lg" : "text-2xl"}`}
                  >
                    {tier.label}
                  </h3>
                  <p className={`font-semibold text-primary ${compact ? "text-sm" : "text-lg"}`}>
                    {tier.price}
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="relative h-3 rounded-full bg-secondary">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${fillPct}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-1">
                {tiers.map((t, i) => (
                  <motion.button
                    key={t.label}
                    type="button"
                    onClick={() => setTier(i)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative z-10 h-5 w-5 rounded-full border-2 transition-colors ${
                      i <= tierIndex
                        ? "border-primary bg-primary shadow-lg shadow-primary/50"
                        : "border-muted bg-background"
                    }`}
                  >
                    {i === tierIndex && (
                      <motion.div
                        layoutId={compact ? "sliderGlowCompact" : "sliderGlow"}
                        className="absolute -inset-2 rounded-full bg-primary/30 blur-md"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              {tiers.map((t) => (
                <span key={t.label}>{t.label}</span>
              ))}
            </div>
          </div>

          {!compact && (
            <>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={tier.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  {tier.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gradient-to-r from-primary to-accent py-3 text-sm font-semibold text-background transition-shadow hover:shadow-lg hover:shadow-primary/25"
              >
                Get Started
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
