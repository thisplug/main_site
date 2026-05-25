import { useLanguage } from '../i18n/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'

const navIds = ['home', 'projects', 'contact'] as const

export function Header() {
  const { t } = useLanguage()

  const labels = {
    home: t.nav.home,
    projects: t.nav.projects,
    contact: t.nav.contact,
  }

  return (
    <header className="sticky top-0 z-50 border-b border-indigo-500/20 bg-[var(--color-surface)]/50 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex min-w-0 flex-1 items-center justify-center gap-4 sm:gap-8">
          {navIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-xs font-medium tracking-wide text-[var(--color-muted)] transition-colors hover:text-white sm:text-sm"
            >
              {labels[id]}
            </a>
          ))}
        </div>
        <LanguageSwitcher />
      </nav>
    </header>
  )
}
