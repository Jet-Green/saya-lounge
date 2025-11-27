import { computed, nextTick, ref, watch, type Ref } from 'vue'
import { useDisplay } from 'vuetify'
import type { GalleryRenderCell, GalleryRow, GalleryRowCell, GalleryRowJustify } from '@/types/gallery'

type RawImage = { src?: string }

export function useGalleryPagination(images: Ref<RawImage[]>, rowsPerPage = 2) {
  const display = useDisplay()

  // нормализованный плоский список элементов для рендера
  const normalizedItems = computed<GalleryRenderCell[]>(() => {
    const items: GalleryRenderCell[] = []
    images.value.forEach((item, idx) => {
      if (!item || !item.src) return
      items.push({
        key: `item-${idx}`,
        src: item.src,
      })
    })
    return items
  })

  // Шаблоны раскладки
  const rows = computed<GalleryRow[]>(() => {
    const result: GalleryRow[] = []
    const items = normalizedItems.value
    if (!items.length) return result

    const smallScreenLayouts: number[][] = [[12]]
    const mediumScreenLayouts: number[][] = [[7, 5], [6, 6], [5, 7]]
    const largeScreenLayouts: number[][] = [
      [3, 3, 3, 3],
      [4, 4, 4],
      [5, 3, 4],
      [4, 5, 3],
      [3, 4, 5],
    ]
    const fallbackLayouts: Record<number, number[]> = {
      1: [12],
      2: [6, 6],
      3: [4, 4, 4],
      4: [3, 3, 3, 3],
    }

    const selectLayout = (rowIndex: number, remaining: number): number[] => {
      const sm = display.smAndDown.value
      const md = display.mdAndDown.value && !display.smAndDown.value
      let patterns = largeScreenLayouts

      if (sm) {
        patterns = smallScreenLayouts
      } else if (md) {
        patterns = mediumScreenLayouts
      }

      const basePattern = patterns.length ? patterns[rowIndex % patterns.length] ?? patterns[0] : undefined
      let pattern: number[]

      if (basePattern && basePattern.length) {
        pattern = [...basePattern]
      } else if (fallbackLayouts[remaining]?.length) {
        pattern = [...fallbackLayouts[remaining]]
      } else {
        pattern = [12]
      }

      if (pattern.length > remaining) {
        pattern = fallbackLayouts[remaining] ? [...fallbackLayouts[remaining]] : pattern.slice(0, remaining)
      }

      // Нормализовать до суммы 12
      if (pattern.reduce((acc, val) => acc + val, 0) !== 12) {
        const total = pattern.reduce((acc, val) => acc + val, 0)
        if (total !== 0) {
          pattern = pattern.map((val) => Math.round((val / total) * 12))
          const adjustedTotal = pattern.reduce((acc, val) => acc + val, 0)
          const lastIndex = pattern.length - 1
          if (lastIndex >= 0) {
            if (adjustedTotal > 12) {
              pattern[lastIndex] = (pattern[lastIndex] ?? 0) - (adjustedTotal - 12)
            } else if (adjustedTotal < 12) {
              pattern[lastIndex] = (pattern[lastIndex] ?? 0) + (12 - adjustedTotal)
            }
          }
        } else {
          pattern = fallbackLayouts[remaining] ?? [12]
        }
      }

      return pattern
    }

    const justifyCycleDesktop: GalleryRowJustify[] = ['start', 'center', 'space-between', 'end', 'space-around']
    const justifyCycleMedium: GalleryRowJustify[] = ['center', 'space-between', 'start', 'space-around']

    const computeJustify = (rowIndex: number, itemCount: number): GalleryRowJustify => {
      if (itemCount <= 1 || display.smAndDown.value) {
        return 'center'
      }

      const isMedium = display.mdAndDown.value && !display.smAndDown.value
      const cycle = isMedium ? justifyCycleMedium : justifyCycleDesktop
      if (!cycle.length) return 'center'
      return cycle[rowIndex % cycle.length] ?? 'center'
    }

    let itemIndex = 0
    let rowIndex = 0

    while (itemIndex < items.length) {
      const remaining = items.length - itemIndex
      const layout = selectLayout(rowIndex, remaining)

      const cells: GalleryRowCell[] = []

      layout.forEach((cols) => {
        if (itemIndex >= items.length) return
        const source = items[itemIndex]
        itemIndex += 1
        if (!source) return
        cells.push({
          key: source.key,
          src: source.src,
          cols: Math.max(Math.min(cols, 12), 1),
        })
      })

      result.push({
        key: `row-${rowIndex}`,
        cells,
        justify: computeJustify(rowIndex, cells.length),
      })

      rowIndex += 1
    }

    return result
  })

  // разбить строки на страницы
  const pages = computed<GalleryRow[][]>(() => {
    const chunked: GalleryRow[][] = []
    const rowList = rows.value
    for (let i = 0; i < rowList.length; i += rowsPerPage) {
      chunked.push(rowList.slice(i, i + rowsPerPage))
    }
    return chunked
  })

  const currentPageIdx = ref(0)
  const direction = ref<'forward' | 'backward'>('forward')
  const transitionName = computed(() => (direction.value === 'forward' ? 'gallery-slide-left' : 'gallery-slide-right'))

  watch(
    pages,
    (newPages) => {
      if (!newPages.length) {
        currentPageIdx.value = 0
        direction.value = 'forward'
        return
      }
      if (currentPageIdx.value >= newPages.length) {
        direction.value = 'forward'
        currentPageIdx.value = 0
      }
    },
    { immediate: true }
  )

  const hasPages = computed(() => pages.value.length > 0)
  const hasMultiplePages = computed(() => pages.value.length > 1)

  const currentPage = computed(() => {
    const allPages = pages.value
    if (!allPages.length) return []
    return allPages[currentPageIdx.value] ?? []
  })

  const nextPage = () => {
    if (!hasPages.value) return
    direction.value = 'forward'
    currentPageIdx.value = (currentPageIdx.value + 1) % pages.value.length
  }

  const prevPage = () => {
    if (!hasPages.value) return
    direction.value = 'backward'
    currentPageIdx.value = (currentPageIdx.value + pages.value.length - 1) % pages.value.length
  }

  return {
    // data
    normalizedItems,
    rows,
    pages,
    currentPageIdx,
    direction,
    transitionName,
    hasPages,
    hasMultiplePages,
    currentPage,
    // actions
    nextPage,
    prevPage,
    // helpers
    rowsPerPage,
  }
}
