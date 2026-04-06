"use client"

import { useState } from "react"
import { BudgetSlider } from "./budget-slider"

const PRICING_TIERS = [
  { label: "Budget", value: 5000, color: "from-green-400 to-emerald-600" },
  { label: "Mid-Range", value: 15000, color: "from-blue-400 to-indigo-600" },
  { label: "Luxury", value: 30000, color: "from-purple-400 to-pink-600" },
  { label: "Signature", value: 100000, color: "from-amber-400 to-orange-600" }
]

export function PricingSection() {
  const [tierIdx, setTierIdx] = useState(0)

  const handleTierChange = (idx: number) => {
    setTierIdx(idx)
    
    // Smooth scroll to the results section
    const trending = document.getElementById("trending")
    if (trending) {
      trending.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      })
    }
  }

  return (
    <section id="pricing" className="py-12 relative z-10 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[120px] opacity-20 transition-colors duration-700 rounded-full bg-gradient-to-r ${PRICING_TIERS[tierIdx].color}`} />

      <div className="mx-auto max-w-2xl px-4 text-center relative z-10">
        <h2 className="text-3xl font-black text-white uppercase italic mb-1 tracking-tighter">
          Set Your Budget
        </h2>
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10 opacity-80">
          Slide to filter the scene
        </p>
        
        <div className="px-4">
          <BudgetSlider 
            tiers={PRICING_TIERS} 
            currentTier={tierIdx} 
            onTierChange={handleTierChange} 
          />
        </div>

        {/* Dynamic Pricing Card */}
        <div className="mt-10 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:bg-white/[0.05]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.5em] mb-2">
              Estimated Spend
            </span>
            <p className="text-white font-black text-5xl italic tracking-tighter">
              ~{PRICING_TIERS[tierIdx].value.toLocaleString()} <span className="text-primary tracking-normal">KES</span>
            </p>
            <div className={`h-1 w-12 rounded-full mt-4 bg-gradient-to-r ${PRICING_TIERS[tierIdx].color}`} />
            <p className="mt-4 text-white font-black uppercase text-[11px] tracking-[0.3em]">
              {PRICING_TIERS[tierIdx].label} <span className="opacity-40 italic">Tier</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}