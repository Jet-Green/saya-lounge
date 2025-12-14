<script setup lang="ts">
import { computed } from 'vue'
import { useGalleryPagination } from '@/composables/useGalleryPagination'
import { useSwipe } from '@/composables/useSwipe'
import { useAutoScroll } from '@/composables/useAutoScroll'
import { useImageOverlay } from '@/composables/useImageOverlay'

interface Props {
  items: any[]
  loading: boolean
  error: string
}

const props = defineProps<Props>()
const rowsPerPage = 2

const images = computed(() => 
  props.items.map(item => ({
    src: item.url,
    key: item.key
  }))
)

const {
  pages,
  currentPage,
  currentPageIdx,
  transitionName,
  hasPages,
  hasMultiplePages,
  nextPage,
  prevPage,
} = useGalleryPagination(images, rowsPerPage)

const swipe = useSwipe({
  onNext: () => nextPage(),
  onPrev: () => prevPage(),
})

const {
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleTouchCancel,
} = swipe

useAutoScroll(hasMultiplePages as any, nextPage, { intervalMs: 20000 })

const overlay = useImageOverlay()

const {
  selectedImage,
  isOverlayActive,
  overlayContentRef,
  handleImageClick,
  closeImage,
  overlayKeyHandler,
} = overlay
</script>

<template>
  <v-alert v-if="error" type="error" class="mb-8">{{ error }}</v-alert>
  <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-8" />

  <div v-if="!loading && !error" class="gallery-wrapper">
    <div v-if="hasPages" class="gallery-pages">
      <transition :name="transitionName" mode="out-in">
        <div :key="currentPageIdx" class="gallery-page" @touchstart.passive="handleTouchStart"
          @touchmove.passive="handleTouchMove" @touchend="handleTouchEnd" @touchcancel="handleTouchCancel">
          <div v-for="(row, rowIdx) in currentPage" :key="`row-${currentPageIdx}-${row.key}`"
            class="gallery-row-container">
            <v-row class="gallery-row" dense :justify="row.justify" align="stretch">
              <v-col v-for="cell in row.cells" :key="cell.key" :cols="cell.cols" class="pa-0">
                <v-img :src="cell.src" class="gallery-img user-select-none" cover :draggable="false" loading="lazy"
                  @click="handleImageClick(cell.src)"></v-img>
              </v-col>
            </v-row>
          </div>
        </div>
      </transition>
    </div>

    <div v-else class="gallery-empty">
      Нет изображений
    </div>
  </div>

  <v-overlay :model-value="isOverlayActive" class="gallery-overlay" :scrim="true" :opacity="0.85" @click="closeImage">
    <div ref="overlayContentRef" class="gallery-overlay-content" tabindex="0" @click.stop
      @keydown="overlayKeyHandler">
      <v-btn icon variant="text" class="gallery-overlay-close" @click.stop="closeImage">
        <v-icon icon="mdi-close" size="36"></v-icon>
      </v-btn>

      <v-img v-if="selectedImage" :src="selectedImage" class="gallery-overlay-img" contain
        @click.stop="closeImage"></v-img>
    </div>
  </v-overlay>
</template>

<style scoped>
.gallery-row {
  margin: 0;
  --v-row-gap: 0px;
  --v-col-gap: 0px;
}

.gallery-wrapper {
  position: relative;
  padding: 0 64px;
  --gallery-card-height: clamp(170px, 18vw, 280px);
}

.gallery-img {
  height: var(--gallery-card-height, clamp(200px, 22vw, 320px));
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
}

.gallery-img :deep(img) {
  object-fit: cover;
}

@media (max-width: 960px) {
  .gallery-wrapper {
    padding: 0 48px;
    --gallery-card-height: clamp(170px, 28vw, 280px);
  }
}

@media (max-width: 600px) {
  .gallery-wrapper {
    padding: 0 24px;
    --gallery-card-height: clamp(120px, 38vw, 180px);
  }
}

.gallery-pages {
  position: relative;
  overflow: hidden;
  min-height: calc(var(--gallery-card-height, clamp(200px, 22vw, 320px)) * 2 + 32px);
}

.gallery-page {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.gallery-row-container+.gallery-row-container {
  margin-top: 0;
}

.gallery-empty {
  padding: 3rem 1rem;
  text-align: center;
  color: #cacaca;
}

.gallery-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-overlay :deep(.v-overlay__content) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.gallery-overlay-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(90vw, 960px);
  max-height: 90vh;
  outline: none;
}

.gallery-overlay-close {
  position: fixed !important;
  top: clamp(12px, 4vw, 24px);
  right: clamp(12px, 4vw, 24px);
  color: #fff !important;
  background-color: rgba(0, 0, 0, 0.45) !important;
  width: 48px !important;
  height: 48px !important;
  min-width: 48px !important;
  min-height: 48px !important;
  border-radius: 999px !important;
  z-index: 11;
}

.gallery-overlay-img {
  max-width: min(90vw, 960px);
  max-height: 90vh;
  width: 100%;
  border-radius: 32px;
  cursor: pointer;
}

.gallery-slide-left-enter-active,
.gallery-slide-left-leave-active,
.gallery-slide-right-enter-active,
.gallery-slide-right-leave-active {
  transition: transform 0.45s ease, opacity 0.45s ease;
}

.gallery-slide-left-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

.gallery-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

.gallery-slide-right-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}

.gallery-slide-right-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
</style>
