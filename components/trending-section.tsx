"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Leaf,
  Heart,
  Moon,
  Flame,
  Wind,
  Mountain,
  type LucideIcon,
} from "lucide-react"
import spotsData from "@/data/spots.json"
import type { SpotJson, SpotsData } from "@/types/spots"
import { BudgetSlider } from "./budget-slider"

const data = spotsData as SpotsData

const VIBE_ICONS: Record<string, LucideIcon> = {
  Leaf,
  Heart,
  Moon,
  Flame,
  Wind,
  Mountain,
}

function vibeIcon(name: string): LucideIcon {
  return VIBE_ICONS[name] ?? Leaf
}

export function TrendingSection() {
  const [vibe, setVibe] = useState<string | "all">("all")
  const maxBudgetIdx = data.budgetTiers.length - 1
  const [budgetTierIdx, setBudgetTierIdx] = useState(maxBudgetIdx)

  const filtered = useMemo(() => {
    return data.spots.filter((s: SpotJson) => {
      const vibeOk = vibe === "all" || s.vibe === vibe
      const budgetOk = s.budgetTier <= budgetTierIdx
      return vibeOk && budgetOk
    })
  }, [vibe, budgetTierIdx])

  return (
    <section id="trending" className="relative px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-14"
        >
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Trending
          </h2>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Soundscapes people are vibing with right now. Filter by mood and what your plan unlocks.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex flex-1 flex-wrap justify-center gap-2 lg:justify-start">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setVibe("all")}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                vibe === "all"
                  ? "border-primary bg-primary/15 text-foreground"
                  : "border-glass-border bg-glass text-muted-foreground hover:text-foreground"
              }`}
            >
              All vibes
            </motion.button>
            {data.vibeFilters.map((v) => (
              <motion.button
                key={v}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setVibe(v)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  vibe === v
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-glass-border bg-glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {v}
              </motion.button>
            ))}
          </div>

          <div className="mx-auto w-full max-w-md shrink-0 lg:mx-0">
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground lg:text-left">
              Max budget
            </p>
            <BudgetSlider
              tiers={data.budgetTiers}
              currentTier={budgetTierIdx}
              onTierChange={setBudgetTierIdx}
              compact
            />
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm text-muted-foreground"
            >
              No spots match this combo — try another vibe or raise your budget tier.
            </motion.p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((spot: SpotJson, index: number) => {
                const style = data.vibeStyles[spot.vibe]
                const gradient = style?.gradient ?? "linear-gradient(135deg, oklch(0.5 0.1 250) 0%, oklch(0.4 0.08 270) 100%)"
                const Icon = vibeIcon(style?.icon ?? "Leaf")
                const tierLabel = data.budgetTiers[spot.budgetTier]?.label ?? "—"

                return (
                  <motion.li
                    key={spot.title}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group relative"
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
                      style={{ backgroundImage: gradient }}
                    />
                    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-glass-border bg-glass p-5 backdrop-blur-xl">
                      <div
                        className="absolute inset-0 opacity-[0.08] transition-opacity group-hover:opacity-[0.14]"
                        style={{ backgroundImage: gradient }}
                      />
                      <div className="relative flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundImage: gradient }}
                        >
                          <Icon className="h-6 w-6 text-background" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md border border-glass-border bg-background/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                              {spot.vibe}
                            </span>
                            <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              {tierLabel}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold tracking-tight text-foreground">
                            {spot.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {spot.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
