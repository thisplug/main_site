import { useHeroAsciiSettings } from '../hooks/useHeroAsciiSettings'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { AsciiText } from './AsciiText'
import { DecryptedText } from './DecryptedText'

const titleGradient =
  'bg-gradient-to-r from-[var(--color-accent-cyan)] via-[var(--color-accent)] to-[var(--color-accent-pink)] bg-clip-text font-extrabold tracking-tight text-transparent'

/** Символы для «расшифровки», без букв */
const decryptSymbols = '!@#$%^&*+-=<>[]{}?/\\|~_█▓▒░:;'

export function Hero() {
  const { t } = useLanguage()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const baseFontSize = t.hero.titleFontSize ?? 160
  const ascii = useHeroAsciiSettings(baseFontSize)

  return (
    <section
      id="home"
      className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16"
    >
      <p className="mb-6 text-base font-medium tracking-tight text-[var(--color-muted)] sm:text-lg">
        {t.hero.greeting}{' '}
        <span className="bg-gradient-to-r from-[var(--color-accent-cyan)] via-[var(--color-accent)] to-[var(--color-accent-pink)] bg-clip-text text-transparent">
          {site.name}
        </span>
      </p>

      <div
        className={`mx-auto flex w-full max-w-4xl items-center justify-center overflow-visible px-1 sm:px-2 ${
          isMobile
            ? 'min-h-[140px] py-4'
            : ascii.containerHeight
        }`}
      >
        {isMobile ? (
          <DecryptedText
            key={t.hero.title}
            text={t.hero.title}
            animateOn="view"
            sequential
            revealDirection="start"
            useOriginalCharsOnly={false}
            characters={decryptSymbols}
            speed={240}
            maxIterations={28}
            parentClassName="block w-full text-center leading-none"
            className={titleGradient}
            encryptedClassName="text-indigo-300/35"
            style={{
              fontSize: 'clamp(2.25rem, 11.5vw, 3.75rem)',
              lineHeight: 1.05,
            }}
          />
        ) : (
          <AsciiText
            key={`${t.hero.title}-${ascii.textFontSize}-${ascii.enableWaves}`}
            text={t.hero.title}
            textFontSize={ascii.textFontSize}
            textColor={ascii.textColor}
            asciiFontSize={ascii.asciiFontSize}
            planeBaseHeight={ascii.planeBaseHeight}
            enableWaves={ascii.enableWaves}
            enableMouseTilt={false}
            blendMode={ascii.blendMode}
            className="h-full w-full"
          />
        )}
      </div>

      <p className="mx-auto mt-6 max-w-xl px-1 text-sm text-[var(--color-muted)] sm:mt-8 sm:text-base">
        {t.hero.tagline}
      </p>
    </section>
  )
}
