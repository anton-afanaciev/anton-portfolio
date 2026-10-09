export interface Photo {
  src: string
  alt: string
  width?: number
  height?: number
  sources?: readonly { src: string; width: number }[]
}

export type ProjectCategory = 'web' | 'ai' | 'qa'
export interface Project {
  id: string
  slug: string
  category: ProjectCategory
  tags: readonly string[]
  status: 'development'
  photo?: Photo
  links?: readonly { kind: 'site' | 'source'; url: string }[]
}

// Local files live in public/; resolve against Vite base for subfolder hosting.
export function assetUrl(src: string) {
  return /^(https?:|data:|blob:)/i.test(src) ? src : `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`
}
