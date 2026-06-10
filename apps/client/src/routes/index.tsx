import { HeroSection } from '#/features/landingpage/HeroSection/HeroSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <HeroSection />
    </>
  )
}
