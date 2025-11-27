import { computed, nextTick, ref, watch } from 'vue'

export function useImageOverlay() {
  const selectedImage = ref<string | null>(null)
  const overlayContentRef = ref<HTMLElement | null>(null)

  const isOverlayActive = computed(() => selectedImage.value !== null)

  const handleImageClick = (src?: string) => {
    if (!src) return
    selectedImage.value = src
  }

  const closeImage = () => {
    selectedImage.value = null
  }

  const overlayKeyHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeImage()
    }
  }

  watch(isOverlayActive, async (value) => {
    if (value) {
      await nextTick()
      overlayContentRef.value?.focus?.()
    }
  })

  return {
    selectedImage,
    isOverlayActive,
    overlayContentRef,
    handleImageClick,
    closeImage,
    overlayKeyHandler,
  }
}
