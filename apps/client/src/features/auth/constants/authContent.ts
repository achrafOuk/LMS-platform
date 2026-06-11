import { heroImage } from '../../landingpage/HeroSection/constants/heroContent'

export const authVisual = {
  image: heroImage,
  tagline: 'Master new skills with a learning experience built for you',
  highlight:
    'Access expert-led courses, track your progress, and earn credentials—all from one intuitive platform.',
} as const

export const loginContent = {
  headingId: 'login-heading',
  title: 'Welcome back',
  description: 'Sign in to continue your learning journey.',
  submitLabel: 'Sign In',
  pendingLabel: 'Signing in…',
  alternatePrompt: "Don't have an account?",
  alternateLinkLabel: 'Create one',
  alternateTo: '/register' as const,
} as const

export const registerContent = {
  headingId: 'register-heading',
  title: 'Create your account',
  description: 'Join thousands of learners building skills that matter.',
  submitLabel: 'Create Account',
  pendingLabel: 'Creating account…',
  alternatePrompt: 'Already have an account?',
  alternateLinkLabel: 'Sign in',
  alternateTo: '/login' as const,
} as const
