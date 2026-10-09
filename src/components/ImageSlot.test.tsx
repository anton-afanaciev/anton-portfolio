import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImageSlot } from './ImageSlot'

describe('optional photo', () => {
  const fallback = <p>Место для фотографии</p>
  it('shows an honest placeholder when no photo is supplied', () => {
    render(<ImageSlot fallback={fallback} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Место для фотографии')).toBeVisible()
  })
  it('renders alt text and a base-aware local URL', () => {
    render(<ImageSlot photo={{ src: '/photos/anton.jpg', alt: 'Фото Антона' }} fallback={fallback} />)
    expect(screen.getByRole('img', { name: 'Фото Антона' })).toHaveAttribute('src', `${import.meta.env.BASE_URL}photos/anton.jpg`)
  })
  it('replaces a failed image and retries a newly supplied source', () => {
    const view = render(<ImageSlot photo={{ src: 'broken.jpg', alt: 'Фото' }} fallback={fallback} />)
    fireEvent.error(screen.getByRole('img'))
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Место для фотографии')).toBeVisible()
    view.rerender(<ImageSlot photo={{ src: 'new.jpg', alt: 'Новое фото' }} fallback={fallback} />)
    expect(screen.getByRole('img', { name: 'Новое фото' })).toHaveAttribute('src', `${import.meta.env.BASE_URL}new.jpg`)
    view.rerender(<ImageSlot fallback={fallback} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
  it('resolves responsive sources and gives only the hero loading priority', () => {
    const photo = { src: 'photos/main.webp', alt: 'Портрет', width: 960, height: 1440, sources: [{ src: '/photos/small.webp', width: 480 }, { src: 'photos/main.webp', width: 960 }] }
    const view = render(<ImageSlot photo={photo} fallback={fallback} priority sizes="400px" />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(image).toHaveAttribute('srcset', `${import.meta.env.BASE_URL}photos/small.webp 480w, ${import.meta.env.BASE_URL}photos/main.webp 960w`)
    expect(image).toHaveAttribute('width', '960')
    expect(image).toHaveAttribute('height', '1440')
    view.rerender(<ImageSlot photo={photo} fallback={fallback} />)
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).not.toHaveAttribute('fetchpriority')
  })
})
