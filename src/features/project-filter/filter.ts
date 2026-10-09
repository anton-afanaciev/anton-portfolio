import type { ProjectCategory } from '../../data/types'
export type ProjectFilter = 'all' | ProjectCategory
export const projectFilters: readonly ProjectFilter[] = ['all', 'web', 'ai', 'qa']
export function filterProjects<T extends { category: ProjectCategory }>(items: readonly T[], filter: ProjectFilter): readonly T[] {
  return filter === 'all' ? items : items.filter(item => item.category === filter)
}
