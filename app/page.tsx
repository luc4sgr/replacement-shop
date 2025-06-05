import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedMachines } from "@/components/sections/featured-machines"
import { ValueProposition } from "@/components/sections/value-proposition"
import { ContactCTA } from "@/components/sections/contact-cta"
import { About } from "@/components/sections/about"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      {/* <ValueProposition /> */}
      <About/>
      <FeaturedMachines />
      <ContactCTA />
    </main>
  )
}
