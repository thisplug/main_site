import { skills } from '../data/skills'

function SkillItem({ name, icon: Icon, color }: (typeof skills)[number]) {
  return (
    <li className="flex shrink-0 items-center gap-3 whitespace-nowrap">
      <Icon
        className="text-[1.75rem]"
        style={{ color }}
        aria-hidden
      />
      <span className="text-base font-medium tracking-wide text-[var(--color-muted)]">
        {name}
      </span>
    </li>
  )
}

function SkillList() {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {skills.map((skill) => (
        <SkillItem key={skill.id} {...skill} />
      ))}
    </ul>
  )
}

export function SkillsMarquee() {
  return (
    <div className="overflow-hidden py-7">
      <div className="flex w-max animate-marquee gap-0">
        <SkillList />
        <SkillList />
      </div>
    </div>
  )
}
