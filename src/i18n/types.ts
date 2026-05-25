export type Locale = 'ru' | 'en'

export type ProjectStatus = 'deployed' | 'development' | 'contributor'

export type Translation = {
  meta: {
    title: string
    description: string
  }
  nav: {
    home: string
    projects: string
    contact: string
  }
  hero: {
    greeting: string
    title: string
    titleFontSize?: number
    tagline: string
  }
  whatIDo: {
    heading: string
    services: { title: string; items: string[] }[]
  }
  projects: {
    eyebrow: string
    heading: string
    status: Record<ProjectStatus, string>
  }
  contact: {
    eyebrow: string
    heading: string
    description: string
    location: string
  }
  footer: {
    builtWith: string
    styledWith: string
    copyright: string
  }
}
