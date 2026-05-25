import { socialLinks } from '../data/social'

export function SocialButtons() {
  return (
    <div className="mb-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
      {socialLinks.map(({ id, href, label, icon: Icon, color }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/40 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]/70 sm:px-5"
        >
          <Icon className="text-xl" style={{ color }} aria-hidden />
          {label}
        </a>
      ))}
    </div>
  )
}
