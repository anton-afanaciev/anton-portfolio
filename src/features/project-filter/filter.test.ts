import { describe, it, expect } from 'vitest'
import { filterProjects } from './filter'
import type { ProjectCategory } from '../../data/types'

describe('project categories', () => {
  const items: readonly { id: string; category: ProjectCategory }[] = Object.freeze([
    { id: 'web-example', category: 'web' },
    { id: 'ai-example', category: 'ai' },
    { id: 'web-second', category: 'web' },
  ])
  it('includes every item in All, preserving order', () => {
    expect(filterProjects(items, 'all').map(item => item.id)).toEqual(['web-example', 'ai-example', 'web-second'])
  })
  it('selects categories without modifying source data', () => {
    expect(filterProjects(items, 'web').map(item => item.id)).toEqual(['web-example', 'web-second'])
    expect(filterProjects(items, 'ai').map(item => item.id)).toEqual(['ai-example'])
    expect(items).toHaveLength(3)
  })
  it('returns an empty selection for a missing category or empty source', () => {
    expect(filterProjects(items, 'qa')).toEqual([])
    expect(filterProjects([], 'all')).toEqual([])
    expect(filterProjects([], 'web')).toEqual([])
  })
})
