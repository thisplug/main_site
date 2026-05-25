import type { IconType } from 'react-icons'
import { SiDiscord, SiGithub, SiTelegram, SiVk } from 'react-icons/si'
import { site } from './site'

export type SocialLink = {
  id: keyof typeof site.social
  href: string
  label: string
  icon: IconType
  color: string
}

export const socialLinks: SocialLink[] = [
  {
    id: 'telegram',
    href: site.social.telegram,
    label: 'Telegram',
    icon: SiTelegram,
    color: '#26A5E4',
  },
  {
    id: 'discord',
    href: site.social.discord,
    label: 'Discord',
    icon: SiDiscord,
    color: '#5865F2',
  },
  {
    id: 'github',
    href: site.social.github,
    label: 'GitHub',
    icon: SiGithub,
    color: '#f0f6fc',
  },
  {
    id: 'vk',
    href: site.social.vk,
    label: 'VK',
    icon: SiVk,
    color: '#0077FF',
  },
]
