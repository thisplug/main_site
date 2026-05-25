import type { IconType } from 'react-icons'
import {
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

export type Skill = {
  id: string
  name: string
  icon: IconType
  color: string
}

export const skills: Skill[] = [
  { id: 'react', name: 'React', icon: SiReact, color: '#61DAFB' },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { id: 'vite', name: 'Vite', icon: SiVite, color: '#BD34FE' },
  { id: 'html5', name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { id: 'css3', name: 'CSS3', icon: SiCss, color: '#1572B6' },
  { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { id: 'git', name: 'Git', icon: SiGit, color: '#F05032' },
  { id: 'postgresql', name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { id: 'python', name: 'Python', icon: SiPython, color: '#3776AB' },
]
