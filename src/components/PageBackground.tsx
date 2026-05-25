import { ColorBends } from './ColorBends'

export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <ColorBends
        colors={['#ff5c7a', '#8a5cff', '#00ffd1']}
        rotation={90}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={0}
        noise={0.15}
        parallax={0}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
        transparent
        autoRotate={0}
        className="h-full w-full"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 10, 15, 0.35) 0%, rgba(10, 10, 15, 0.82) 100%)',
        }}
      />
    </div>
  )
}
