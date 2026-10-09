import { useState, type ReactNode } from 'react'
import { assetUrl, type Photo } from '../data/types'

interface ImageOptions {
  fallback: ReactNode
  className?: string
  priority?: boolean
  sizes?: string
}

function ImageAttempt({ photo, fallback, className, priority, sizes }: ImageOptions & { photo: Photo }) {
  const [failed, setFailed] = useState(false)
  return failed ? fallback : <img className={className} src={assetUrl(photo.src)}
    srcSet={photo.sources?.map(source => `${assetUrl(source.src)} ${source.width}w`).join(', ')} sizes={sizes}
    width={photo.width} height={photo.height} alt={photo.alt}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async"
    onError={() => setFailed(true)} />
}

export function ImageSlot({ photo, ...options }: ImageOptions & { photo?: Photo }) {
  // A new source gets its own attempt, even if the previous image failed.
  return photo?.src ? <ImageAttempt key={photo.src} photo={photo} {...options} /> : options.fallback
}
