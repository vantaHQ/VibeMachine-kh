"use client"

import * as Slider from "@radix-ui/react-slider"

interface BudgetSliderProps {
  tiers: any[]
  currentTier: number
  onTierChange: (idx: number) => void
  compact?: boolean
}

export function BudgetSlider({ tiers, currentTier, onTierChange, compact }: BudgetSliderProps) {
  const max = (tiers?.length || 1) - 1

  return (
    <div className={`w-full ${compact ? "" : "py-2"}`}>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-8 cursor-pointer"
        value={[currentTier]}
        max={max}
        step={1}
        onValueChange={(vals: number[]) => onTierChange(vals[0])}
      >
        <Slider.Track className="bg-white/10 relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-primary rounded-full h-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-6 h-6 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full hover:scale-110 transition-transform focus:outline-none border-[3px] border-primary cursor-grab active:cursor-grabbing"
          aria-label="Budget"
        />
      </Slider.Root>
      
      {!compact && (
        <div className="flex justify-between px-1 mt-2">
          {tiers.map((t, i) => (
            <span 
              key={i} 
              className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${
                i === currentTier ? "text-primary opacity-100" : "text-white/20"
              }`}
            >
              {t.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}