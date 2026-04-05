"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Zap, Crown } from "lucide-react"

const tiers = [
  { value: 0, label: "Free", price: "$0", icon: Sparkles, features: ["Basic vibes", "5 soundscapes", "Community access"] },
  { value: 1, label: "Pro", price: "$9", icon: Zap, features: ["Unlimited vibes", "50+ soundscapes", "HD audio", "Offline mode"] },
  { value: 2, label: "Elite", price: "$19", icon: Crown, features: ["Everything in Pro", "Exclusive drops", "Custom mixes", "Priority support"] },
]

export function BudgetSlider() {
  const [currentTier, setCurrentTier] = useState(1)
  const tier = tiers[currentTier]
  const TierIcon = tier.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="relative space-y-6">
          <div className="text-center">
            <motion.p 
              className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Choose Your Vibe
            </motion.p>
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
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent"
                >
                  <TierIcon className="h-6 w-6 text-background" />
                </motion.div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-foreground">{tier.label}</h3>
                  <p className="text-lg font-semibold text-primary">{tier.price}<span className="text-sm text-muted-foreground">/mo</span></p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Custom Slider */}
          <div className="space-y-4">
            <div className="relative h-3 rounded-full bg-secondary">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: "50%" }}
                animate={{ width: `${(currentTier / 2) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-1">
                {tiers.map((t, i) => (
                  <motion.button
                    key={t.label}
                    onClick={() => setCurrentTier(i)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative z-10 h-5 w-5 rounded-full border-2 transition-colors ${
                      i <= currentTier 
                        ? "border-primary bg-primary shadow-lg shadow-primary/50" 
                        : "border-muted bg-background"
                    }`}
                  >
                    {i === currentTier && (
                      <motion.div
                        layoutId="sliderGlow"
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

          {/* Features */}
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
        </div>
      </div>
    </motion.div>
  )
}
