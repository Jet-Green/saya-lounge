import { computed } from 'vue'
import { useAdminGallery } from './useAdminGallery'

export function useGallery() {
  const { galleryItems, galleryLoading, galleryError, fetchGallery } = useAdminGallery()

  // Паттерн распределения колонок
  const colsPattern = [6, 6, 6, 12, 4, 4, 4, 6, 6, 6, 6, 6]

  // Преобразование элементов галереи в формат для отображения
  const images = computed(() => 
    galleryItems.value.map((item, index) => ({
      src: item.url,
      cols: colsPattern[index % colsPattern.length],
    }))
  )

  return { 
    images, 
    loading: galleryLoading, 
    error: galleryError, 
    fetchGallery 
  }
}
