import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
})

function CoursesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="font-serif text-3xl font-medium text-foreground">
        Browse courses
      </h1>
      <p className="mt-4 text-muted-foreground">
        The course catalog is coming soon. Check back for expert-led learning paths.
      </p>
    </div>
  )
}
