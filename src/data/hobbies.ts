import type { Photo } from './types'

export type HobbyId = 'swim' | 'football' | 'enduro'
export const hobbies: readonly { id: HobbyId; number: string; photo: Photo }[] = [
  { id: 'swim', number: '01', photo: { src: 'photos/swim-960.webp', alt: 'Мужчина плывёт кролем в бассейне, вид со спины, вокруг брызги', width: 960, height: 1440, sources: [{ src: 'photos/swim-480.webp', width: 480 }, { src: 'photos/swim-960.webp', width: 960 }] } },
  { id: 'football', number: '02', photo: { src: 'photos/football-960.webp', alt: 'Футболист выполняет удар через себя перед воротами, мяч у поднятой ноги', width: 960, height: 1200, sources: [{ src: 'photos/football-480.webp', width: 480 }, { src: 'photos/football-960.webp', width: 960 }] } },
  { id: 'enduro', number: '03', photo: { src: 'photos/enduro-960.webp', alt: 'Личный снимок Антона: прыжок на эндуро среди сосен, мотоцикл целиком в воздухе', width: 960, height: 1280, sources: [{ src: 'photos/enduro-480.webp', width: 480 }, { src: 'photos/enduro-960.webp', width: 960 }] } },
]

