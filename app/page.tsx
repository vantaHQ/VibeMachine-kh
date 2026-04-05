"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LiveVibes } from "@/components/live-vibes"
import { Footer } from "@/components/footer"
import { VideoBackground } from "@/components/video-background"

export default function Home() {
  const [budget, setBudget] = useState(5000)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <VideoBackground />
      <Navbar />
      <Hero onBudgetChange={setBudget} />
      <LiveVibes budget={budget} />
      <Footer />
    </main>
  )
}
