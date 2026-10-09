export type Theme = 'dark' | 'light'
export const THEME_KEY = 'anton.theme.v1'
export const MOTION_KEY = 'anton.motion.v1'
export function readTheme(): Theme { try { return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark' } catch { return 'dark' } }
export function readMotion(): boolean { try { return localStorage.getItem(MOTION_KEY) === 'true' } catch { return false } }
export function persist(key: string, value: string) { try { localStorage.setItem(key, value) } catch { /* Preferences still work for this session. */ } }

