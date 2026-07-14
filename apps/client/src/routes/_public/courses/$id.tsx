import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/courses/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();
  return <div>Hello "/_public/courses/$id" {id}!</div>
}
