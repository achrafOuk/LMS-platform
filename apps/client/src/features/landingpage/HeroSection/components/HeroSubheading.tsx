import { heroSubheading } from '../constants/heroContent'

export function HeroSubheading() {
  return (
    <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
      {heroSubheading}
    </p>
  )
}
