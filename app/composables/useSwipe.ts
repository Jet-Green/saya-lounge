import { ref } from 'vue'

export type SwipeCallbacks = {
  onNext?: () => void
  onPrev?: () => void
}

export type UseSwipeReturn = {
  // state
  swipeStartX: typeof swipeStartX
  swipeStartY: typeof swipeStartY
  swipeStartTime: typeof swipeStartTime
  isSwipeActive: typeof isSwipeActive
  isSwipeCancelled: typeof isSwipeCancelled
  activePointerId: typeof activePointerId
  // functions
  beginSwipe: (x: number, y: number) => boolean
  continueSwipe: (x: number, y: number) => void
  finalizeSwipe: (x: number, y: number) => void
  resetSwipe: () => void
  // touch handlers for templates
  handleTouchStart: (event: TouchEvent) => void
  handleTouchMove: (event: TouchEvent) => void
  handleTouchEnd: (event: TouchEvent) => void
  handleTouchCancel: () => void
}

const minSwipeDistanceDefault = 60
const maxSwipeDurationDefault = 600

const swipeStartX = ref(0)
const swipeStartY = ref(0)
const swipeStartTime = ref(0)
const isSwipeActive = ref(false)
const isSwipeCancelled = ref(false)
const activePointerId = ref<number | null>(null)

export function useSwipe(callbacks?: SwipeCallbacks, opts?: { minDistance?: number; maxDuration?: number }): UseSwipeReturn {
  const minSwipeDistance = opts?.minDistance ?? minSwipeDistanceDefault
  const maxSwipeDuration = opts?.maxDuration ?? maxSwipeDurationDefault

  const resetSwipe = () => {
    isSwipeActive.value = false
    isSwipeCancelled.value = false
    activePointerId.value = null
  }

  const beginSwipe = (x: number, y: number): boolean => {
    // включать только если есть хотя бы один callback (чтобы избежать лишней обработки свайпов)
    if (!callbacks) return false
    if (!callbacks.onNext && !callbacks.onPrev) return false

    swipeStartX.value = x
    swipeStartY.value = y
    swipeStartTime.value = Date.now()
    isSwipeActive.value = true
    isSwipeCancelled.value = false
    return true
  }

  const continueSwipe = (x: number, y: number) => {
    if (!isSwipeActive.value || isSwipeCancelled.value) return
    const deltaX = Math.abs(x - swipeStartX.value)
    const deltaY = Math.abs(y - swipeStartY.value)
    // вертикальное движение отменяет горизонтальный свайп
    if (deltaY > deltaX && deltaY > 16) {
      isSwipeCancelled.value = true
      isSwipeActive.value = false
    }
  }

  const finalizeSwipe = (x: number, y: number) => {
    if (!isSwipeActive.value || isSwipeCancelled.value) {
      resetSwipe()
      return
    }

    const deltaX = x - swipeStartX.value
    const deltaY = y - swipeStartY.value
    const duration = Date.now() - swipeStartTime.value

    resetSwipe()

    if (Math.abs(deltaX) < minSwipeDistance || Math.abs(deltaX) <= Math.abs(deltaY) || duration > maxSwipeDuration) {
      return
    }

    if (deltaX < 0) {
      callbacks?.onNext?.()
    } else {
      callbacks?.onPrev?.()
    }
  }

  // DOM-обработчики касаний (подключаются к внешнему контейнеру)
  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length !== 1) return
    const touch = event.touches.item(0)
    if (!touch) return
    beginSwipe(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length !== 1) return
    const touch = event.touches.item(0)
    if (!touch) {
      resetSwipe()
      return
    }
    continueSwipe(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = (event: TouchEvent) => {
    const touch = event.changedTouches.item(0)
    if (!touch) {
      resetSwipe()
      return
    }
    finalizeSwipe(touch.clientX, touch.clientY)
  }

  const handleTouchCancel = () => {
    resetSwipe()
  }

  return {
    swipeStartX,
    swipeStartY,
    swipeStartTime,
    isSwipeActive,
    isSwipeCancelled,
    activePointerId,
    beginSwipe,
    continueSwipe,
    finalizeSwipe,
    resetSwipe,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel,
  }
}
