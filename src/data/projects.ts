import type { Locale, ProjectStatus } from '../i18n/types'
import { site } from './site'

export type ProjectEntry = {
  id: string
  /** Имя репозитория на GitHub, например main_site */
  repo: string
  status: ProjectStatus
  title: Record<Locale, string>
  description: Record<Locale, string>
  /** Демо или сайт; если не указано — ссылка на репозиторий */
  liveUrl?: string
}

function githubUsername() {
  const match = site.social.github.match(/github\.com\/([^/?#]+)/i)
  return match?.[1] ?? ''
}

export function projectGithubUrl(repo: string) {
  const user = githubUsername()
  return user ? `https://github.com/${user}/${repo}` : site.social.github
}

/** Добавьте сюда свои репозитории с GitHub */
export const projects: ProjectEntry[] = [
  {
    id: 'site-stroika',
    repo: 'site_stroika',
    status: 'deployed',
    title: {
      ru: 'Сайт-визитка — штукатурка',
      en: 'Portfolio site — plastering',
    },
    description: {
      ru: 'Сайт услуг механизированной штукатурки в Челябинске.',
      en: 'Business site for mechanized plastering services in Chelyabinsk.',
    },
    liveUrl: 'https://thisplug.github.io/site_stroika/',
  },
  {
    id: 'cakes-website',
    repo: 'cakes-website',
    status: 'deployed',
    title: {
      ru: 'Сайт-визитка — кондитерская',
      en: 'Portfolio site — bakery',
    },
    description: {
      ru: 'Сайт-визитка для кондитерской с меню и контактами.',
      en: 'Business card site for a bakery with menu and contacts.',
    },
    liveUrl: 'https://thisplug.github.io/cakes-website/',
  },
]
