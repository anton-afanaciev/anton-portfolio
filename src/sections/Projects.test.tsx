import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect } from 'vitest'
import { Projects } from './Projects'

it('filters the only real project, announces empty categories, and restores All', () => {
  render(<Projects />)
  expect(screen.getAllByRole('article')).toHaveLength(1)
  expect(screen.getByRole('heading', { name: 'Персональное портфолио' })).toBeVisible()
  expect(screen.getByText('В разработке')).toBeVisible()
  expect(screen.queryByRole('link')).not.toBeInTheDocument()
  for (const category of ['AI', 'QA']) {
    fireEvent.click(screen.getByRole('button', { name: category }))
    expect(screen.getByRole('button', { name: category })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('В этой категории пока нет проектов')
  }
  fireEvent.click(screen.getByRole('button', { name: 'Web' }))
  expect(screen.getAllByRole('article')).toHaveLength(1)
  fireEvent.click(screen.getByRole('button', { name: 'Все' }))
  expect(screen.getByRole('status')).toHaveTextContent('Проектов: 1')
})

