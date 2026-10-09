import { useState } from 'react'
import { ru } from '../content/ru'
import { skills } from '../data/skills'
import styles from '../app/App.module.css'

function Tool({ group, name }: { group: string; name: string }) {
  const [open, setOpen] = useState(false)
  const id = `tool-${group}-${name.replace(/[^a-z0-9]/gi, '-')}`
  const copy = ru.skills.tools[name]
  return <div className={styles.tool}>
    <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      <span>{copy.title}</span><span aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <p id={id} hidden={!open}>{copy.description}</p>
  </div>
}

export function Skills() {
  return <section id="skills" tabIndex={-1} className={styles.section}>
    <p className={styles.eyebrow}>{ru.skills.label}</p>
    <div className={styles.sectionHeading}><h2>{ru.skills.title}</h2><p>{ru.skills.text}</p></div>
    <div className={styles.skillsGrid}>{skills.map(group => <article className={styles.skillCard} key={group.id}>
      <span className={styles.skillSymbol} aria-hidden="true">{group.symbol}</span>
      <h3>{ru.skills.items[group.id]}</h3>
      {group.tools.map(name => <Tool key={name} group={group.id} name={name} />)}
    </article>)}</div>
  </section>
}
