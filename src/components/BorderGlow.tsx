// Ported from React Bits — https://reactbits.dev/components/border-glow

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from 'react'
import './BorderGlow.css'

export type BorderGlowProps = {
  children?: ReactNode
  className?: string
  edgeSensitivity?: number
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  animated?: boolean
  animateOnView?: boolean
  animateOnHover?: boolean
  animationDelay?: number
  interactive?: boolean
  colors?: string[]
  fillOpacity?: number
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 40, s: 80, l: 80 }
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  }
}

function buildGlowVars(
  glowColor: string,
  intensity: number,
): Record<string, string> {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  const vars: Record<string, string> = {}
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] =
      `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`
  }
  return vars
}

const GRADIENT_POSITIONS = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
]
const GRADIENT_KEYS = [
  '--gradient-one',
  '--gradient-two',
  '--gradient-three',
  '--gradient-four',
  '--gradient-five',
  '--gradient-six',
  '--gradient-seven',
]
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors: string[]): Record<string, string> {
  const vars: Record<string, string> = {}
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)]
    vars[GRADIENT_KEYS[i]] =
      `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return vars
}

function easeOutCubic(x: number) {
  return 1 - (1 - x) ** 3
}
function easeInCubic(x: number) {
  return x * x * x
}

type AnimateOpts = {
  start?: number
  end?: number
  duration?: number
  delay?: number
  ease?: (t: number) => number
  onUpdate: (v: number) => void
  onEnd?: () => void
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: AnimateOpts) {
  const t0 = performance.now() + delay
  function tick() {
    const elapsed = performance.now() - t0
    const t = Math.min(elapsed / duration, 1)
    onUpdate(start + (end - start) * ease(t))
    if (t < 1) requestAnimationFrame(tick)
    else onEnd?.()
  }
  window.setTimeout(() => requestAnimationFrame(tick), delay)
}

const CARD_COLORS = [
  ['#c084fc', '#f472b6', '#38bdf8'],
  ['#22d3ee', '#818cf8', '#f472b6'],
  ['#f472b6', '#a78bfa', '#34d399'],
  ['#34d399', '#22d3ee', '#c084fc'],
]

export function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '250 70% 75%',
  backgroundColor = 'rgba(10, 10, 15, 0.88)',
  borderRadius = 20,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  animateOnView = false,
  animateOnHover = false,
  animationDelay = 0,
  interactive = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const sweepGenRef = useRef(0)

  const getCenterOfElement = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const getEdgeProximity = useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el)
      const dx = x - cx
      const dy = y - cy
      let kx = Infinity
      let ky = Infinity
      if (dx !== 0) kx = cx / Math.abs(dx)
      if (dy !== 0) ky = cy / Math.abs(dy)
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
    },
    [getCenterOfElement],
  )

  const getCursorAngle = useCallback(
    (el: HTMLElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el)
      const dx = x - cx
      const dy = y - cy
      if (dx === 0 && dy === 0) return 0
      const radians = Math.atan2(dy, dx)
      let degrees = radians * (180 / Math.PI) + 90
      if (degrees < 0) degrees += 360
      return degrees
    },
    [getCenterOfElement],
  )

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const edge = getEdgeProximity(card, x, y)
      const angle = getCursorAngle(card, x, y)

      card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`)
      card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
    },
    [getEdgeProximity, getCursorAngle],
  )

  const runSweep = useCallback((card: HTMLDivElement, delay: number) => {
    const gen = ++sweepGenRef.current
    const angleStart = 110
    const angleEnd = 465
    card.classList.add('sweep-active')
    card.style.setProperty('--cursor-angle', `${angleStart}deg`)
    card.style.setProperty('--edge-proximity', '0')

    const finish = () => {
      if (sweepGenRef.current === gen) {
        card.classList.remove('sweep-active')
      }
    }

    animateValue({
      delay,
      duration: 500,
      onUpdate: (v) => {
        if (sweepGenRef.current === gen) {
          card.style.setProperty('--edge-proximity', `${v}`)
        }
      },
    })
    animateValue({
      ease: easeInCubic,
      delay,
      duration: 1500,
      end: 50,
      onUpdate: (v) => {
        if (sweepGenRef.current === gen) {
          card.style.setProperty(
            '--cursor-angle',
            `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`,
          )
        }
      },
    })
    animateValue({
      ease: easeOutCubic,
      delay: delay + 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (v) => {
        if (sweepGenRef.current === gen) {
          card.style.setProperty(
            '--cursor-angle',
            `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`,
          )
        }
      },
    })
    animateValue({
      ease: easeInCubic,
      delay: delay + 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (v) => {
        if (sweepGenRef.current === gen) {
          card.style.setProperty('--edge-proximity', `${v}`)
        }
      },
      onEnd: finish,
    })
  }, [])

  const handlePointerEnter = useCallback(() => {
    if (!animateOnHover || !cardRef.current) return
    runSweep(cardRef.current, 0)
  }, [animateOnHover, runSweep])

  useEffect(() => {
    if (!animated || animateOnView || !cardRef.current) return
    runSweep(cardRef.current, animationDelay)
  }, [animated, animateOnView, animationDelay, runSweep])

  useEffect(() => {
    if (!animated || !animateOnView || !cardRef.current) return

    const card = cardRef.current
    let played = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return
        played = true
        runSweep(card, animationDelay)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [animated, animateOnView, animationDelay, runSweep])

  const glowVars = buildGlowVars(glowColor, glowIntensity)
  const gradientVars = buildGradientVars(colors)

  const cardStyle = {
    ...glowVars,
    ...gradientVars,
    '--card-bg': backgroundColor,
    '--border-radius': `${borderRadius}px`,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': String(coneSpread),
    '--edge-sensitivity': String(edgeSensitivity),
    '--fill-opacity': String(fillOpacity),
  } as CSSProperties

  return (
    <div
      ref={cardRef}
      className={`border-glow-card h-full w-full ${className}`}
      style={cardStyle}
      onPointerEnter={animateOnHover ? handlePointerEnter : undefined}
      onPointerMove={interactive ? handlePointerMove : undefined}
    >
      <div className="edge-light" style={glowVars} />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}

export { CARD_COLORS }
