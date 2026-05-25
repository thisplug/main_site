import { useLanguage } from '../i18n/LanguageContext'
import { SocialButtons } from './SocialButtons'

export function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="mb-2 text-center text-sm text-[var(--color-muted)]">
        {t.contact.eyebrow}
      </p>
      <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-white">
        {t.contact.heading}
      </h2>
      <p className="mb-8 text-center text-sm text-[var(--color-muted)]">
        {t.contact.description}
      </p>
      <p className="mb-8 text-center text-sm text-[var(--color-muted)]">
        {t.contact.location}
      </p>

      <SocialButtons />
    </section>
  )
}
