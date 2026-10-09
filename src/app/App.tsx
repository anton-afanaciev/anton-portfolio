import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { ru } from '../content/ru'
import { profile } from '../data/profile'
import { directions } from '../data/skills'
import { Skills } from '../sections/Skills'
import { Projects } from '../sections/Projects'
import { ImageSlot } from '../components/ImageSlot'
import { Hobbies } from '../sections/Hobbies'
import { contacts } from '../data/contacts'
import { useSettings } from '../features/settings/useSettings'
import styles from './App.module.css'
export function App() {
 const settings=useSettings()
 useEffect(()=>{
  const id=window.location.hash.slice(1)
  if(!id)return
  const frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:'instant'}))
  return ()=>cancelAnimationFrame(frame)
 },[])
 return <>
 <a className="skip-link" href="#main">{ru.ui.skip}</a>
 <Header theme={settings.theme} toggleTheme={settings.toggleTheme}/>
 <main id="main" tabIndex={-1}>
 <section id="home" tabIndex={-1} className={styles.hero}>
 <div className={styles.heroCopy}><p className={styles.heroRole}><span className={styles.dot}/><strong>{ru.labels.roleQa}</strong><span className={styles.aiRole}>{ru.labels.roleAi}</span></p>
 <h1 className={styles.heroName} aria-label={ru.name}>{ru.firstName}{' '}<span className={styles.gradient}>{ru.lastName}</span></h1>
 <p className={styles.heroSlogan}>{ru.heroSlogan[0]}<br/>{ru.heroSlogan[1]}</p>
 <p className={styles.intro}>{ru.intro}</p><div className={styles.actions}><a className={styles.primary} href="#projects">{ru.ui.projects}<Icon name="arrow"/></a><a className={styles.secondary} href="#contacts">{ru.ui.contact}<span aria-hidden="true">↗</span></a></div>
 </div>
 <div className={styles.heroVisual}><div className={styles.visualTop}><span>{ru.labels.space}</span></div><div className={styles.orbit} aria-hidden="true"/><div className={styles.photoFrame}><ImageSlot photo={profile.photo} className={styles.profileImage} priority sizes="(max-width: 700px) min(80vw, 410px), (max-width: 1099px) 40vw, 380px" fallback={<><div className={styles.photoMonogram} aria-hidden="true">{profile.initials}<span>+</span></div><div className={styles.photoCaption}><span className={styles.dot}/><div><strong>{ru.ui.photo}</strong><p>{ru.ui.photoLater}</p></div></div></>}/></div><div className={styles.visualTag}><span aria-hidden="true">✳</span> {ru.labels.visualTag}</div><div className={styles.visualBottom}><span>{ru.labels.detail}</span><span aria-hidden="true">↙</span></div></div>
 <div className={styles.heroFoot}><span>{ru.labels.visualTag}</span><a href="#about">{ru.labels.scroll} <span aria-hidden="true">↓</span></a></div>
 </section>
 <section id="about" tabIndex={-1} className={styles.section}><p className={styles.eyebrow}>{ru.about.label}</p><div className={styles.aboutGrid}><h2>{ru.about.title}</h2><div><p className={styles.bodyCopy}>{ru.about.text}</p><div className={styles.aboutNote}><span aria-hidden="true">↗</span><p>{ru.labels.roleQa}<br/><span>{ru.labels.roleAi}</span></p></div></div></div></section>
 <Skills/>
 <section id="directions" tabIndex={-1} className={styles.section}><p className={styles.eyebrow}>{ru.directions.label}</p><h2>{ru.directions.title}</h2><div className={styles.directionList}>{directions.map((item,i)=><div key={item}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{ru.directions.items[item]}</h3><p>{ru.directions.descriptions[item]}</p></div><span aria-hidden="true">↗</span></div>)}</div></section>
 <Projects/>
 <Hobbies/>
 <section id="contacts" tabIndex={-1} className={styles.contactSection}><p className={styles.eyebrow}>{ru.contacts.label}</p><h2>{ru.contacts.title}<span aria-hidden="true">↗</span></h2><p className={styles.sectionIntro}>{ru.contacts.text}</p><div className={styles.contactGrid}>{contacts.filter(contact=>contact.url).map(contact=><a key={contact.id} href={contact.url} target={contact.id === 'email' ? undefined : '_blank'} rel={contact.id === 'email' ? undefined : 'noopener noreferrer'}><span className={styles.contactIcon}><Icon name={contact.id}/></span><div className={styles.contactCopy}><strong>{contact.title}</strong><span>{contact.display ?? contact.url}</span></div><span className={styles.contactArrow} aria-hidden="true">↗</span></a>)}</div></section>
 </main>
 <footer className={styles.footer}><div><a href="#home" className={styles.footerLogo}>{ru.name}</a><p>{ru.footer}</p></div><div className={styles.footerControls}><label><input type="checkbox" checked={settings.manualMotion} onChange={e=>settings.setManualMotion(e.target.checked)}/>{ru.ui.motion}</label><a href="#home">{ru.ui.back} ↑</a></div></footer>
 </>
}





