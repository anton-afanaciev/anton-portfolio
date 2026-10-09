import { useEffect, useState } from 'react'
import { MOTION_KEY, THEME_KEY, persist, readMotion, readTheme } from './storage'
export function useSettings() {
 const [theme,setTheme] = useState(readTheme)
 const [manualMotion,setManualMotion] = useState(readMotion)
 const [systemMotion,setSystemMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
 useEffect(() => { const media=window.matchMedia('(prefers-reduced-motion: reduce)'); const listener=()=>setSystemMotion(media.matches); media.addEventListener('change',listener); return ()=>media.removeEventListener('change',listener) },[])
 useEffect(()=>{ document.documentElement.dataset.theme=theme; persist(THEME_KEY,theme); document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#101117':'#f5f5fa') },[theme])
 useEffect(()=>{ document.documentElement.dataset.reducedMotion=String(manualMotion||systemMotion); persist(MOTION_KEY,String(manualMotion)) },[manualMotion,systemMotion])
 return {theme,toggleTheme:()=>setTheme(t=>t==='dark'?'light':'dark'),manualMotion,setManualMotion,reducedMotion:manualMotion||systemMotion}
}

