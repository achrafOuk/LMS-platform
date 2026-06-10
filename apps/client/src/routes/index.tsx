import { orpc } from '#/utils/orpc'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ 
  component: Home,
  loader: async () => {
    const response = await orpc.hello()
    return { message: response }
  }
})

function Home() {
  const { message } = Route.useLoaderData()
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{message}</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  )
}
