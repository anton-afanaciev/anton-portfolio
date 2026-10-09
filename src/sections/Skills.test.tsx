import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect } from 'vitest'
import { Skills } from './Skills'
import { skills } from '../data/skills'
import { ru } from '../content/ru'

it('all tools have accessible independent disclosures with truthful descriptions', () => {
  render(<Skills />)
  expect(screen.getAllByRole('button')).toHaveLength(skills.flatMap(group => group.tools).length)
  for (const group of skills) {
    for (const tool of group.tools) {
      const copy = ru.skills.tools[tool]
      const button = screen.getByRole('button', { name: copy.title })
      const panel = document.getElementById(button.getAttribute('aria-controls')!)!
      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(panel).not.toBeVisible()
      fireEvent.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')
      expect(panel).toHaveTextContent(copy.description)
      expect(panel).toBeVisible()
      fireEvent.click(button)
      expect(panel).not.toBeVisible()
    }
  }
})
