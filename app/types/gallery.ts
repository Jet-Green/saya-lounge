export type GalleryRenderCell = {
  key: string
  src: string
}

export type GalleryRowCell = GalleryRenderCell & { cols: number }

export type GalleryRowJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around'

export type GalleryRow = {
  key: string
  cells: GalleryRowCell[]
  justify: GalleryRowJustify
}