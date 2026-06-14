import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { orpc } from '#/utils/orpc';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    try {
      const user = await orpc.auth.me();
      if (!user) {
        throw redirect({ to: '/login' })
      }
      console.log(user);
      return { user };
    } catch(error) {
      console.log(error);
      throw redirect({ to: '/login' })
    }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}
