import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
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
      <section id="vibes">
        <VibeGrid />
      </section>
      <PricingSection />
      <Footer />
    </main>
  )
}
