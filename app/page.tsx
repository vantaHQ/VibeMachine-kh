"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LiveVibes } from "@/components/live-vibes"
import { Footer } from "@/components/footer"
import { VideoBackground } from "@/components/video-background"

export default function Home() {
  const [budget, setBudget] = useState(15000)
  const [experience, setExperience] = useState<string | null>(null)

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <VideoBackground />
      <Navbar />
      <Hero 
        onBudgetChange={setBudget} 
        onExperienceChange={setExperience}
        selectedExperience={experience}
      />
      <LiveVibes budget={budget} experience={experience} />
      <Footer />
    </main>
  )
}
