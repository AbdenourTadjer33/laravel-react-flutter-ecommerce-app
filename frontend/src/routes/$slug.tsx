import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$slug')({
  component: () => <div>Hello /$slug!</div>
})