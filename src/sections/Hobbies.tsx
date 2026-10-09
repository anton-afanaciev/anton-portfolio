import { ru } from '../content/ru'
import { hobbies } from '../data/hobbies'
import { ImageSlot } from '../components/ImageSlot'
import layout from '../app/App.module.css'
import styles from './Hobbies.module.css'

export function Hobbies() {
  return <section id="hobbies" tabIndex={-1} className={layout.section}>
    <p className={layout.eyebrow}>{ru.hobbies.label}</p>
    <h2>{ru.hobbies.title}</h2>
    <p className={layout.sectionIntro}>{ru.hobbies.text}</p>
    <div className={styles.grid}>{hobbies.map(hobby => <article className={styles.card} key={hobby.id} data-kind={hobby.id}>
      <div className={styles.scene}>
        <ImageSlot photo={hobby.photo} className={styles.photo} sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1099px) calc((100vw - 72px) / 3), 400px" fallback={<div className={styles.fallback}>{ru.hobbies.unavailable}</div>} />
        <span className={styles.number} aria-hidden="true">{hobby.number}</span>
      </div>
      <div className={styles.copy}><h3>{ru.hobbies.items[hobby.id].title}</h3><p>{ru.hobbies.items[hobby.id].note}</p></div>
    </article>)}</div>
  </section>
}

