export function Icon({ name }: { name: 'sun' | 'moon' | 'arrow' | 'menu' | 'close' | 'telegram' | 'email' | 'github' }) {
 const paths = {sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,moon:<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>,arrow:<path d="M5 12h14m-6-6 6 6-6 6"/>,menu:<path d="M4 7h16M4 12h16M4 17h16"/>,close:<path d="m6 6 12 12M6 18 18 6"/>}
 const contactPaths = {
  telegram:<path d="m21 3-4 18-6-5-4 3 1-7 9-6-11 8-4-3Z"/>,
  email:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
  github:<><path d="M9 19c-4 1-4-2-6-2m14 4v-4c0-1-.3-2-1-2 3-.4 5-1.5 5-5 0-1.5-.5-2.5-1.5-3.5.3-1 .3-2.2-.2-3.5-1.5 0-2.5.5-3.5 1.2a12 12 0 0 0-7.6 0C7.2 3.5 6.2 3 4.7 3c-.5 1.3-.5 2.5-.2 3.5C3.5 7.5 3 8.5 3 10c0 3.5 2 4.6 5 5-.7 0-1 1-1 2v4"/></>,
 }
 const allPaths = {...paths, ...contactPaths}
 return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{allPaths[name]}</svg>
}

