import { useEffect, useState } from 'react'

export type HeroAsciiSettings = {
  textFontSize: number
  asciiFontSize: number
  enableWaves: boolean
  textColor: string
  planeBaseHeight: number
  blendMode: 'difference' | 'normal'
  containerHeight: string
}

function compute(baseFontSize: number, width: number): HeroAsciiSettings {
  if (width < 768) {
    const textFontSize =
      width < 380 ? 118 : width < 480 ? 132 : width < 640 ? 142 : 148

    return {
      textFontSize,
      asciiFontSize: 11,
      enableWaves: false,
      textColor: '#ffffff',
      planeBaseHeight: 11,
      blendMode: 'normal',
      containerHeight: 'h-[min(58vw,400px)] min-h-[330px] sm:h-[360px]',
    }
  }

  const textFontSize =
    width < 1024 ? Math.round(baseFontSize * 0.85) : baseFontSize

  return {
    textFontSize,
    asciiFontSize: 8,
    enableWaves: true,
    textColor: '#c7d2fe',
    planeBaseHeight: 8,
    blendMode: 'difference',
    containerHeight: 'h-[260px] md:h-[300px]',
  }
}

export function useHeroAsciiSettings(baseFontSize: number) {
  const [settings, setSettings] = useState<HeroAsciiSettings>(() =>
    typeof window !== 'undefined'
      ? compute(baseFontSize, window.innerWidth)
      : compute(baseFontSize, 1280),
  )

  useEffect(() => {
    const update = () => setSettings(compute(baseFontSize, window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [baseFontSize])

  return settings
}
