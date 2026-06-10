import { HeroActions } from './HeroActions'
import { HeroHeading } from './HeroHeading'
import { HeroSubheading } from './HeroSubheading'

export function HeroContent() {
  return (
    <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-2 pt-12 text-center sm:gap-8 sm:pt-16 lg:pt-20">
      <HeroHeading />
      <HeroSubheading />
      <HeroActions />
    </header>
  )
}
