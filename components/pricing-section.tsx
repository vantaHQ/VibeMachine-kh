"use client"

import { motion } from "framer-motion"
import spotsData from "@/data/spots.json"
import type { SpotsData } from "@/types/spots"
import { BudgetSlider } from "./budget-slider"

const data = spotsData as SpotsData

export function PricingSection() {
  return (
    <section id="pricing" className="relative px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Simple Pricing
          </h2>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <BudgetSlider tiers={data.budgetTiers} defaultTier={1} />
      </div>
    </section>
  )
}
