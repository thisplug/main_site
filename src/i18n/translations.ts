import type { Locale, Translation } from './types'

export const translations: Record<Locale, Translation> = {
  ru: {
    meta: {
      title: 'Портфолио | Разработчик',
      description: 'Личное портфолио — разработчик программного обеспечения',
    },
    nav: {
      home: 'Главная',
      projects: 'Проекты',
      contact: 'Контакты',
    },
    hero: {
      greeting: 'Привет, я',
      title: 'Разработчик',
      titleFontSize: 140,
      tagline:
        'Превращаю идеи в интерактивные цифровые продукты с современным фронтендом.',
    },
    whatIDo: {
      heading: 'Чем занимаюсь?',
      services: [
        { title: 'Телеграм-боты', items: [] },
        { title: 'Скрипты', items: [] },
        { title: 'Сайты-визитки', items: [] },
        { title: 'Сайты под бизнес', items: [] },
      ],
    },
    projects: {
      eyebrow: 'Мои работы',
      heading: 'Проекты',
      status: {
        deployed: 'Запущен',
        development: 'В разработке',
        contributor: 'Участник',
      },
    },
    contact: {
      eyebrow: 'Давайте поговорим',
      heading: 'Контакты',
      description: 'Есть вопрос или идея проекта? Напишите — отвечу.',
      location: 'Локация: Россия',
    },
    footer: {
      builtWith: 'Собрано на React',
      styledWith: 'Стили — Tailwind CSS',
      copyright: 'Все права защищены.',
    },
  },
  en: {
    meta: {
      title: 'Portfolio | Developer',
      description: 'Personal portfolio — software developer',
    },
    nav: {
      home: 'Home',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      title: 'Developer',
      titleFontSize: 140,
      tagline:
        'Transforming ideas into interactive digital experiences with modern frontend development.',
    },
    whatIDo: {
      heading: 'What I do?',
      services: [
        { title: 'Telegram Bots', items: [] },
        { title: 'Scripts', items: [] },
        { title: 'Portfolio Sites', items: [] },
        { title: 'Business Websites', items: [] },
      ],
    },
    projects: {
      eyebrow: 'My work',
      heading: 'Projects',
      status: {
        deployed: 'Deployed',
        development: 'On Development',
        contributor: 'Contributor',
      },
    },
    contact: {
      eyebrow: "Let's talk",
      heading: 'Contact',
      description: 'Have a question or a project in mind? Feel free to reach out.',
      location: 'Location: Russia',
    },
    footer: {
      builtWith: 'Built with React',
      styledWith: 'Styled with Tailwind CSS',
      copyright: 'All rights reserved.',
    },
  },
}

export const localeLabels: Record<Locale, string> = {
  ru: 'RU',
  en: 'EU',
}
