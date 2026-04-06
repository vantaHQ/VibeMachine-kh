"use client"

import { motion } from "framer-motion"
import { Utensils, Coffee, Wine, Music, Sparkles } from "lucide-react"

const activities = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "fine-dining", label: "Fine Dining", icon: Utensils },
  { id: "brunch", label: "Brunch", icon: Coffee },
  { id: "cocktails-tapas", label: "Cocktails & Tapas", icon: Wine },
  { id: "nightlife", label: "Nightlife", icon: Music },
]

interface ActivityFilterProps {
  selected: string
  onChange: (activity: string) => void
}

export function ActivityFilter({ selected, onChange }: ActivityFilterProps) {
  return (
    <div className="relative border-b border-glass-border bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide md:justify-center"
        >
          {activities.map((activity, index) => {
            const Icon = activity.icon
            const isSelected = selected === activity.id
            const isSignature = activity.id === "fine-dining"
            
            return (
              <motion.button
                key={activity.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange(activity.id)}
                className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                  isSelected
                    ? isSignature
                      ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 shadow-lg shadow-amber-500/20"
                      : "bg-primary/20 text-primary shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-glass hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${isSignature && isSelected ? "text-amber-400" : ""}`} />
                <span>{activity.label}</span>
                {isSignature && (
                  <span className="ml-1 rounded bg-gradient-to-r from-amber-500 to-yellow-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                    Signature
                  </span>
                )}
                {isSelected && (
                  <motion.div
                    layoutId="activity-indicator"
                    className={`absolute inset-0 rounded-full border-2 ${
                      isSignature ? "border-amber-500/50" : "border-primary/50"
                    }`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
