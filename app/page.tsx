import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrendingSection } from "@/components/trending-section"
import { VibeGrid } from "@/components/vibe-grid"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"
import { VideoBackground } from "@/components/video-background"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <VideoBackground />
      <Navbar />
      <Hero />
      <TrendingSection />
      <section id="vibes">
        <VibeGrid />
      </section>
      <PricingSection />
      <Footer />
    </main>
  )
}
