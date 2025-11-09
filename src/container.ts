import { getContainer } from '@/lib/ioc'
import type { Container } from '@/services/serviceRegistry'

export const container: Container = getContainer()

if (import.meta.env.DEV) {
  ;(window as any).container = container
}
