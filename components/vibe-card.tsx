"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface VibeCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  index: number
}

export function VibeCard({ title, description, icon: Icon, gradient, index }: VibeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ backgroundImage: gradient }}
      />
      <div className="relative h-full overflow-hidden rounded-2xl border border-glass-border bg-glass backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity duration-500 group-hover:opacity-20"
          style={{ backgroundImage: gradient }}
        />
        <div className="relative flex flex-col items-center gap-4 p-6 text-center md:p-8">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl md:h-20 md:w-20"
            style={{ backgroundImage: gradient }}
          >
            <Icon className="h-8 w-8 text-background md:h-10 md:w-10" strokeWidth={1.5} />
          </motion.div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-1 w-full origin-left"
          style={{ backgroundImage: gradient }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
