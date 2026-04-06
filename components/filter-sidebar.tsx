"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Wallet, MapPin, RotateCcw, SlidersHorizontal, X } from "lucide-react"
import { useState, useCallback, useRef, useEffect } from "react"

const MIN_BUDGET = 500
const MAX_BUDGET = 30000
const STEP = 500

const locations = [
  { id: "all", label: "All Locations" },
  { id: "westlands", label: "Westlands" },
  { id: "karen", label: "Karen" },
  { id: "gigiri", label: "Gigiri" },
  { id: "loresho", label: "Loresho" },
  { id: "cbd", label: "CBD" },
]

function formatKES(value: number) {
  return new Intl.NumberFormat('en-KE').format(value)
}

interface FilterSidebarProps {
  budget: number
  location: string
  onBudgetChange: (budget: number) => void
  onLocationChange: (location: string) => void
  onReset: () => void
  hasActiveFilters: boolean
}

export function FilterSidebar({
  budget,
  location,
  onBudgetChange,
  onLocationChange,
  onReset,
  hasActiveFilters,
}: FilterSidebarProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const percentage = ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newBudget = Number(e.target.value)
    
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onBudgetChange(newBudget)
    }, 150)
  }, [onBudgetChange])

  // Desktop Sidebar
  const SidebarContent = (
    <div className="space-y-6">
      {/* Budget Slider */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-foreground">Budget (KES)</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <AnimatePresence mode="wait">
              <motion.span
                key={budget}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                className="text-2xl font-bold text-foreground"
              >
                {formatKES(budget)}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs text-muted-foreground">max</span>
          </div>

          {/* Slider */}
          <div className="relative h-2 rounded-full bg-secondary/80">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${percentage}%` }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
            
            <motion.div
              className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary/40 blur-md"
              style={{ left: `calc(${percentage}% - 8px)` }}
              animate={{ scale: isDragging ? 1.5 : 1 }}
            />
            
            <input
              type="range"
              min={MIN_BUDGET}
              max={MAX_BUDGET}
              step={STEP}
              defaultValue={budget}
              onChange={handleSliderChange}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
            />
            
            <motion.div
              className="pointer-events-none absolute top-1/2 z-10 -translate-y-1/2"
              style={{ left: `calc(${percentage}% - 8px)` }}
              animate={{ scale: isDragging ? 1.15 : 1 }}
            >
              <div className="h-4 w-4 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50" />
            </motion.div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatKES(MIN_BUDGET)}</span>
            <span>{formatKES(MAX_BUDGET)}</span>
          </div>
        </div>
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-foreground">Location</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {locations.map((loc) => (
            <motion.button
              key={loc.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onLocationChange(loc.id)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                location === loc.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-glass border border-glass-border text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              {loc.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-glass-border bg-glass px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All Filters
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30 lg:hidden"
      >
        <SlidersHorizontal className="h-5 w-5 text-background" />
        {hasActiveFilters && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-background">
            !
          </span>
        )}
      </motion.button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-glass-border bg-background p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-glass text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="sticky top-24 hidden h-fit w-72 shrink-0 rounded-2xl border border-glass-border bg-glass p-5 backdrop-blur-xl lg:block">
        <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Refine Results
        </h3>
        {SidebarContent}
      </aside>
    </>
  )
}
