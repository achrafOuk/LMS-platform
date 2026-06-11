import { HERO_HEADING_ID } from './constants/heroContent'
import { HeroContent } from './components/HeroContent'

export function HeroSection() {
  return (
    <section
      aria-labelledby={HERO_HEADING_ID}
      className="relative  pb-16 sm:pb-20 lg:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-background"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroContent />
      </div>
    </section>
  )
}
