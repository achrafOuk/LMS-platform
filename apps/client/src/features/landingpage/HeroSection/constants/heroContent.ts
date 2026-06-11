export const HERO_HEADING_ID = 'hero-heading'

export const heroHeading =
  'Master new skills with a learning experience built for you'

export const heroSubheading =
  'Access expert-led courses, track your progress, and earn credentials—all from one intuitive platform.'

export const heroPrimaryCta = {
  label: 'Get Started Free',
  to: '/register' as const,
}

export const heroSecondaryCta = {
  label: 'Browse Courses',
  to: '/courses' as const,
}

export const heroImage = {
  src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
  alt: 'Students collaborating around laptops during an online learning session',
  width: 1600,
  height: 1067,
} as const
