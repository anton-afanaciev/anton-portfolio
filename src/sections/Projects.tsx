import { useState } from 'react'
import { ru } from '../content/ru'
import { projects } from '../data/projects'
import { ImageSlot } from '../components/ImageSlot'
import { filterProjects, projectFilters, type ProjectFilter } from '../features/project-filter/filter'
import styles from '../app/App.module.css'

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('all')
  const visible = filterProjects(projects, filter)
  return <section id="projects" tabIndex={-1} className={styles.section}>
    <p className={styles.eyebrow}>{ru.projects.label}</p>
    <div className={styles.sectionHeading}><h2>{ru.projects.title}</h2><p>{ru.projects.text}</p></div>
    <div className={styles.filters} role="group" aria-label={ru.projects.filterLabel}>
      {projectFilters.map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{ru.projects.categories[value]}</button>)}
    </div>
    <p className={styles.filterStatus} role="status">{visible.length ? `${ru.projects.count}: ${visible.length}` : ru.projects.empty}</p>
    <div className={styles.projectGallery}>{visible.map(project => <article className={styles.projectCard} key={project.id}>
      <div className={styles.projectArt}>
        <ImageSlot photo={project.photo} className={styles.projectImage} fallback={<div className={styles.projectFallback} aria-hidden="true">
          <span className={styles.projectCode}>{ru.labels.projectCode}</span><span className={styles.projectLogo}>{ru.projects.items[project.id].title}</span><div className={styles.projectRing}/><span className={styles.projectCode}>{ru.labels.projectCredit} ↗</span>
        </div>} />
      </div>
      <div className={styles.projectInfo}><span className={styles.status}><span className={styles.dot}/>{ru.projects.statuses[project.status]}</span>
        <h3>{ru.projects.items[project.id].title}</h3><p>{ru.projects.items[project.id].description}</p>
        <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        {project.links?.length ? <div className={styles.projectLinks}>{project.links.map(link => <a key={link.kind} href={link.url}>{ru.projects.links[link.kind]} <span aria-hidden="true">↗</span></a>)}</div> : null}
      </div>
    </article>)}</div>
  </section>
}
