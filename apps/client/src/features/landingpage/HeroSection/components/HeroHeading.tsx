import { HERO_HEADING_ID, heroHeading } from '../constants/heroContent'

export function HeroHeading() {
  return (
    <h1
      id={HERO_HEADING_ID}
      className="max-w-3xl text-balance font-serif text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-foreground"
    >
      {heroHeading}
    </h1>
  )
}
