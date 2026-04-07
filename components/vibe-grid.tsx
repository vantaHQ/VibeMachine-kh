"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { Sparkles, Heart, Flame, Wine, Beer, Laptop, Sun } from "lucide-react"

const vibes = [
  {
    title: "Signature Series",
    description: "The elite tier. Fine dining, skyline views, and premium service.",
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #92400e 100%)",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Soft Life",
    description: "Aesthetic gardens, cozy brunch spots, and 'Instagrammable' corners.",
    icon: Heart,
    gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "The Hype",
    description: "High energy, loud music, and the best crowds in the city.",
    icon: Flame,
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Cocktails & Tapas",
    description: "Sophisticated lounges for evening wind-downs and small plates.",
    icon: Wine,
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #5b21b6 100%)",
    imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Sundowners",
    description: "Golden hour magic. Rooftops positioned for the Nairobi sunset.",
    icon: Sun,
    gradient: "linear-gradient(135deg, #fb7185 0%, #e11d48 100%)",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Choma & Beers",
    description: "The local soul. Open-air grills and cold drinks.",
    icon: Beer,
    gradient: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
    imageUrl: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Work Remote",
    description: "Fast WiFi, quiet corners, and bottomless coffee.",
    icon: Laptop,
    gradient: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
  },
]

export function VibeGrid() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(0)
  const [setWidth, setSetWidth] = useState(0)
  const pointerStartXRef = useRef<number | null>(null)
  const didDragRef = useRef(false)

  const loopVibes = useMemo(() => [...vibes, ...vibes, ...vibes], [])

  const handleVibeClick = (vibeTitle: string) => {
    const event = new CustomEvent("filterVibe", { 
      detail: { vibe: vibeTitle } 
    })
    window.dispatchEvent(event)

    const trendingSection = document.getElementById("trending")
    if (trendingSection) {
      trendingSection.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      })
    }
  }

  // Measure one "set" width (7 cards) based on the rendered track.
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const children = Array.from(track.children) as HTMLElement[]
      if (children.length < vibes.length) return

      const first = children[0]
      const seventh = children[vibes.length - 1]
      const lastRight = seventh.offsetLeft + seventh.offsetWidth
      setSetWidth(lastRight - first.offsetLeft)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    return () => ro.disconnect()
  }, [])

  // Start centered on the middle set.
  useEffect(() => {
    if (!setWidth) return
    x.set(-setWidth)
  }, [setWidth, x])

  const normalizeToMiddleSet = () => {
    if (!setWidth) return
    let latest = x.get()
    // Only normalize after interaction ends (no mid-drag jumping).
    while (latest > 0) latest -= setWidth
    while (latest < -2 * setWidth) latest += setWidth
    if (latest !== x.get()) x.set(latest)
  }

  const onPointerDownTrack = (e: React.PointerEvent) => {
    pointerStartXRef.current = e.clientX
    didDragRef.current = false
  }

  const onPointerMoveTrack = (e: React.PointerEvent) => {
    if (pointerStartXRef.current === null) return
    if (Math.abs(e.clientX - pointerStartXRef.current) > 6) didDragRef.current = true
  }

  const onPointerUpTrack = () => {
    // Reset start; keep didDragRef until next down so "click after drag" is suppressed.
    pointerStartXRef.current = null
  }

  return (
    <section className="relative px-4 py-8 z-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          {/* Main Title */}
          <h1 className="mb-4 text-xl font-black uppercase tracking-[0.25em] text-white md:text-3xl">
            Discover Your Scene
          </h1>

          {/* CTA */}
          <p className="mx-auto max-w-xl text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-60">
            Tap to filter the city by your current{" "}
            <span className="font-extrabold text-white">VIBES</span>
          </p>
        </div>

        {/* Lookbook Carousel (drag + infinite loop) */}
        <div className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragElastic={0.08}
            dragMomentum={true}
            onDragEnd={normalizeToMiddleSet}
            onPointerDown={onPointerDownTrack}
            onPointerMove={onPointerMoveTrack}
            onPointerUp={onPointerUpTrack}
            onPointerCancel={onPointerUpTrack}
            className="flex flex-row gap-4 whitespace-nowrap cursor-grab active:cursor-grabbing md:gap-6"
          >
            {loopVibes.map((vibe, idx) => {
              const Icon = vibe.icon
              return (
                <motion.button
                  // Duplicate keys are expected due to looping; include idx to keep them stable.
                  key={`${vibe.title}-${idx}`}
                  type="button"
                  onClick={() => {
                    if (didDragRef.current) return
                    handleVibeClick(vibe.title)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="snap-center flex-shrink-0 min-w-[85vw] whitespace-normal text-left md:min-w-[350px]"
                >
                  <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/10">
                    <img
                      src={vibe.imageUrl}
                      alt={vibe.title}
                      className="absolute inset-0 z-0 h-full w-full object-cover"
                      loading="lazy"
                    />

                    <div
                      className="absolute inset-0 z-0 opacity-20"
                      style={{ backgroundImage: vibe.gradient }}
                    />

                    <div className="absolute inset-x-0 bottom-0 z-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                          <Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-base font-black uppercase tracking-tight text-white">
                            {vibe.title}
                          </p>
                          <p className="mt-1 line-clamp-3 text-sm font-medium leading-relaxed text-white/75">
                            {vibe.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}