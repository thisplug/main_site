import { useLanguage } from '../i18n/LanguageContext'
import { localeLabels } from '../i18n/translations'
import type { Locale } from '../i18n/types'

const locales: Locale[] = ['ru', 'en']

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex gap-1" role="group" aria-label="Language">
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            locale === code
              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)]'
              : 'text-[var(--color-muted)] hover:text-cyan-300'
          }`}
          aria-pressed={locale === code}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  )
}
