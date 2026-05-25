import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-10 text-center text-sm text-[var(--color-muted)]">
      <p className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <span>{t.footer.builtWith}</span>
        <span>·</span>
        <span>{t.footer.styledWith}</span>
      </p>
      <p>
        Copyright © {year} {site.name}. {t.footer.copyright}
      </p>
    </footer>
  )
}
