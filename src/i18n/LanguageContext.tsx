import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations } from './translations'
import type { Locale, Translation } from './types'

const STORAGE_KEY = 'portfolio-locale'

type LanguageContextValue = {
  locale: Locale
  t: Translation
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'ru' || stored === 'en') return stored
  const browser = navigator.language.toLowerCase()
  return browser.startsWith('ru') ? 'ru' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale())

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const t = translations[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title

    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t.meta.description)
  }, [locale, t.meta.description, t.meta.title])

  const value = useMemo(
    () => ({ locale, t, setLocale }),
    [locale, t, setLocale],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
