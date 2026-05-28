import { projects, projectGithubUrl } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'

export function Projects() {
  const { locale, t } = useLanguage()

  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="mb-2 text-center text-sm text-[var(--color-muted)]">
        {t.projects.eyebrow}
      </p>
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">
        {t.projects.heading}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => {
          const url = project.liveUrl ?? projectGithubUrl(project.repo)
          const title = project.title[locale]
          const description = project.description[locale]
          const imageUrl = project.image
            ? `${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`
            : undefined

          return (
            <a
              key={project.id}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm transition-colors hover:border-[var(--color-accent)]"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="h-44 w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-44 items-center justify-center bg-[#1a1a1f] text-[var(--color-muted)]">
                  {title}
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-white group-hover:text-[var(--color-accent)]">
                    {title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-muted)]">
                    {t.projects.status[project.status]}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  {description}
                </p>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
