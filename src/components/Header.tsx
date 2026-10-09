import { useEffect, useRef, useState } from 'react'
import { ru } from '../content/ru'
import { Icon } from './Icon'
import type { Theme } from '../features/settings/storage'
import styles from './Layout.module.css'
export function Header({theme,toggleTheme}:{theme:Theme;toggleTheme:()=>void}) {
 const [open,setOpen]=useState(false)
 const trigger=useRef<HTMLButtonElement>(null)
 useEffect(()=>{ if(!open)return; const close=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);trigger.current?.focus()}}; const media=window.matchMedia('(min-width: 1100px)'); const resize=()=>{if(media.matches)setOpen(false)}; document.addEventListener('keydown',close); media.addEventListener('change',resize); return ()=>{document.removeEventListener('keydown',close);media.removeEventListener('change',resize)} },[open])
 const navigate=(id:string)=>{setOpen(false);window.setTimeout(()=>document.getElementById(id)?.focus({preventScroll:true}),0)}
 return <header className={styles.header}><div className={styles.headerInner}>
 <a className={styles.logo} href="#home" onClick={()=>navigate('home')} aria-label={ru.labels.home}><span className={styles.monogram} aria-hidden="true">АА</span></a>
 <nav id="site-navigation" aria-label={ru.labels.navigation} className={styles.nav} data-open={open}>{ru.nav.map(item=><a key={item.id} href={'#'+item.id} onClick={()=>navigate(item.id)}>{item.label}</a>)}</nav>
 <div className={styles.controls}><button className={styles.iconButton} onClick={toggleTheme} aria-label={theme==='dark'?ru.ui.light:ru.ui.dark}><Icon name={theme==='dark'?'sun':'moon'}/></button><button ref={trigger} className={styles.menuButton} aria-expanded={open} aria-controls="site-navigation" aria-label={open?ru.ui.close:ru.ui.menu} onClick={()=>setOpen(!open)}><Icon name={open?'close':'menu'}/></button></div>
 </div></header>
}


