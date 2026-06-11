import type { CourseType } from '../types/Course'

export const FEATURED_COURSES_HEADING_ID = 'featured-courses-heading'

export const featuredCourses: CourseType[] = [
  {
    title: 'Advanced React Patterns',
    slug: 'advanced-react-patterns',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    imageWidth: 800,
    imageHeight: 533,
    price: 89,
    category: 'Frontend Development',
    description:
      'Build scalable UIs with compound components, render props, and modern React 19 patterns.',
  },
  {
    title: 'TypeScript Fundamentals',
    slug: 'typescript-fundamentals',
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
    imageWidth: 800,
    imageHeight: 533,
    price: 79,
    category: 'Programming Languages',
    description:
      'Master static typing, generics, and type-safe patterns for production codebases.',
  },
  {
    title: 'UI Design Systems',
    slug: 'ui-design-systems',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    imageWidth: 800,
    imageHeight: 533,
    price: 99,
    category: 'Design',
    description:
      'Create cohesive component libraries with tokens, documentation, and accessibility baked in.',
  },
  {
    title: 'Node.js API Development',
    slug: 'nodejs-api-development',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    imageWidth: 800,
    imageHeight: 533,
    price: 94,
    category: 'Backend Development',
    description:
      'Design RESTful and RPC APIs with validation, authentication, and deployment best practices.',
  },
  {
    title: 'Career Skills for Developers',
    slug: 'career-skills-for-developers',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
    imageWidth: 800,
    imageHeight: 533,
    price: 69,
    category: 'Professional Growth',
    description:
      'Communicate technical decisions, lead reviews, and grow from contributor to team lead.',
  },
]

export const featuredCoursesSubheading =
  'Expert-led paths to help you learn faster and stay current with in-demand skills.'

export const viewAllCoursesLabel = 'View all courses'
