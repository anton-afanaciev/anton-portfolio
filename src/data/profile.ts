import type { Photo } from './types'
export const profile: { initials: string; photo?: Photo } = {
  initials: 'АА',
  photo: {
    src: 'photos/portrait-960.webp', alt: 'Антон Афанасьев в чёрной футболке', width: 960, height: 1440,
    sources: [{ src: 'photos/portrait-480.webp', width: 480 }, { src: 'photos/portrait-960.webp', width: 960 }],
  },
}

