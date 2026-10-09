import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { readTheme, readMotion, persist, THEME_KEY } from './storage'
import { useSettings } from './useSettings'
function Harness(){ const s=useSettings();return <><button onClick={s.toggleTheme}>{s.theme}</button><label>motion<input aria-label="motion" type="checkbox" checked={s.manualMotion} onChange={e=>s.setManualMotion(e.target.checked)}/></label><output>{String(s.reducedMotion)}</output></> }
describe('preferences',()=>{
 it('defaults to dark and ignores invalid stored values',()=>{expect(readTheme()).toBe('dark');localStorage.setItem(THEME_KEY,'invalid');expect(readTheme()).toBe('dark')})
 it('restores light and saves switching after remount',()=>{localStorage.setItem(THEME_KEY,'light');const view=render(<Harness/>);fireEvent.click(screen.getByRole('button',{name:'light'}));expect(localStorage.getItem(THEME_KEY)).toBe('dark');view.unmount();render(<Harness/>);expect(screen.getByRole('button',{name:'dark'})).toBeInTheDocument()})
 it('handles unavailable storage reads and writes',()=>{vi.spyOn(Storage.prototype,'getItem').mockImplementation(()=>{throw new Error('blocked')});vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw new Error('quota')});expect(readTheme()).toBe('dark');expect(readMotion()).toBe(false);expect(()=>persist('key','value')).not.toThrow();render(<Harness/>);fireEvent.click(screen.getByRole('button',{name:'dark'}));expect(document.documentElement.dataset.theme).toBe('light')})
 it('manual reduction persists and controls the document',()=>{render(<Harness/>);fireEvent.click(screen.getByRole('checkbox'));expect(document.documentElement.dataset.reducedMotion).toBe('true');expect(localStorage.getItem('anton.motion.v1')).toBe('true')})
 it('cannot override system reduction',()=>{vi.mocked(window.matchMedia).mockReturnValue({matches:true,addEventListener:vi.fn(),removeEventListener:vi.fn()} as unknown as MediaQueryList);render(<Harness/>);fireEvent.click(screen.getByRole('checkbox'));fireEvent.click(screen.getByRole('checkbox'));expect(screen.getByRole('status')).toHaveTextContent('true')})
})
