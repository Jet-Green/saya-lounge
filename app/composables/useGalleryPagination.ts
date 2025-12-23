import { computed, ref, watch, type Ref } from 'vue'
import type { GalleryRenderCell } from '@/types/gallery'

type RawImage = { src?: string }

export function useGalleryPagination(images: Ref<RawImage[]>, imagesPerPage: Ref<number> | number) {
  const currentPageIdx = ref(0)
  const transitionName = ref('gallery-slide-left')

  // imagesPerPage либо computed, либо просто число
  const normalizedImagesPerPage = computed(() => {
    return typeof imagesPerPage === 'number' ? imagesPerPage : imagesPerPage.value
  })

  // список элементов для рендера
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

  // Разбиваем на страницы по imagesPerPage элементов
  const pages = computed(() => {
    const items = normalizedItems.value
    const perPage = normalizedImagesPerPage.value
    const result: GalleryRenderCell[][] = []
    for (let i = 0; i < items.length; i += perPage) {
      result.push(items.slice(i, i + perPage))
    }
    return result
  })

  const totalPages = computed(() => pages.value.length)
  const hasPages = computed(() => totalPages.value > 0)
  const hasMultiplePages = computed(() => totalPages.value > 1)
  const currentPage = computed(() => pages.value[currentPageIdx.value] ?? [])

  // Сбрасываем индекс если он вышел за границы при изменении imagesPerPage
  watch([totalPages], ([total]) => {
    if (currentPageIdx.value >= total && total > 0) {
      currentPageIdx.value = 0
    }
  })

  const nextPage = () => {
    if (totalPages.value === 0) return
    const nextIdx = currentPageIdx.value + 1
    if (nextIdx >= totalPages.value) {
      currentPageIdx.value = 0
    } else {
      currentPageIdx.value = nextIdx
    }
    transitionName.value = 'gallery-slide-left'
  }

  const prevPage = () => {
    if (totalPages.value === 0) return
    const prevIdx = currentPageIdx.value - 1
    if (prevIdx < 0) {
      currentPageIdx.value = totalPages.value - 1
    } else {
      currentPageIdx.value = prevIdx
    }
    transitionName.value = 'gallery-slide-right'
  }

  return {
    pages,
    currentPage,
    currentPageIdx,
    transitionName,
    hasPages,
    hasMultiplePages,
    totalPages,
    nextPage,
    prevPage,
  }
}
