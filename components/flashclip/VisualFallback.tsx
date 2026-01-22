import { useEffect, useState, type ReactNode } from 'react'

interface VisualFallbackProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function VisualFallback({ children, fallback = null }: VisualFallbackProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(!mq.matches)

    update()

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }

    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  return <>{enabled ? children : fallback}</>
}
