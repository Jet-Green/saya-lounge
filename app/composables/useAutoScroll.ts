import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

type UseAutoScrollOptions = {
  intervalMs?: number
}

/**
 * useAutoScroll принимает:
 *  - hasMultiplePages (computed/ref булево значение)
 *  - nextPage (функция)
 *
 * Автопрокрутка включается только на десктопе (не sm/md) и только если существует несколько страниц.
 */
export function useAutoScroll(hasMultiplePages: { value: boolean }, nextPage: () => void, opts?: UseAutoScrollOptions) {
  const display = useDisplay()
  const intervalMs = opts?.intervalMs ?? 20000
  const autoScrollTimer = ref<number | null>(null)

  const isDesktop = computed(() => !display.smAndDown.value && !display.mdAndDown.value)

  const startAutoScroll = () => {
    if (!isDesktop.value || !hasMultiplePages.value) return
    stopAutoScroll()
    // window.setInterval возвращает число
    autoScrollTimer.value = window.setInterval(() => {
      nextPage()
    }, intervalMs) as unknown as number
  }

  const stopAutoScroll = () => {
    if (autoScrollTimer.value !== null) {
      clearInterval(autoScrollTimer.value)
      autoScrollTimer.value = null
    }
  }

  onMounted(() => {
    startAutoScroll()
  })

  onUnmounted(() => {
    stopAutoScroll()
  })

  watch([isDesktop, () => hasMultiplePages.value], ([desktop, multi]) => {
    if (desktop && multi) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }
  })

  return {
    isDesktop,
    startAutoScroll,
    stopAutoScroll,
  }
}
