import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
  color: 'cyan' | 'tangerine'
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

export default function TechParticles() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const particles: Particle[] = Array.from({ length: 56 }, () => ({
      x: rand(0, 1),
      y: rand(0, 1),
      vx: rand(-0.012, 0.012),
      vy: rand(-0.01, 0.01),
      r: rand(0.6, 1.9),
      a: rand(0.25, 0.9),
      color: Math.random() < 0.78 ? 'cyan' : 'tangerine',
    }))

    const resize = () => {
      const parent = canvas.parentElement
      const rect = parent?.getBoundingClientRect()
      width = Math.max(1, Math.floor((rect?.width ?? window.innerWidth) * dpr))
      height = Math.max(1, Math.floor((rect?.height ?? window.innerHeight) * dpr))
      canvas.width = width
      canvas.height = height
      canvas.style.width = `${Math.floor(width / dpr)}px`
      canvas.style.height = `${Math.floor(height / dpr)}px`
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const grad = ctx.createRadialGradient(width * 0.5, height * 0.35, 0, width * 0.5, height * 0.35, Math.max(width, height) * 0.65)
      grad.addColorStop(0, 'rgba(0, 180, 216, 0.06)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -0.1) particle.x = 1.1
        if (particle.x > 1.1) particle.x = -0.1
        if (particle.y < -0.1) particle.y = 1.1
        if (particle.y > 1.1) particle.y = -0.1

        const x = particle.x * width
        const y = particle.y * height
        const radius = particle.r * dpr

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color === 'cyan' ? `rgba(0, 180, 216, ${particle.a})` : `rgba(255, 107, 107, ${particle.a})`
        ctx.fill()
      }

      raf = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
}
