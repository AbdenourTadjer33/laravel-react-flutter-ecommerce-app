import { getProducts } from '@/services/product'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/')({
  loader: getProducts
})