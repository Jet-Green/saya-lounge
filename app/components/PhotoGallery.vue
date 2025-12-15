<script setup lang="ts">
import { useImageOverlay } from '@/composables/useImageOverlay'

interface Props {
  items: any[]
  loading: boolean
  error: string
}

defineProps<Props>()

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

  <v-row v-if="items.length > 0" dense justify="center">
    <v-col v-for="item in items" :key="item.key" cols="12" md="6" class="pa-3">
      <v-img :src="item.url" :alt="item.key" class="photo-img" cover draggable="false" lazy
        @click="handleImageClick(item.url)" />
    </v-col>
  </v-row>

  <v-row v-else-if="!loading && !error" class="justify-center">
    <v-col cols="12" class="text-center text-grey">
      Нет изображений
    </v-col>
  </v-row>

  <v-overlay :model-value="isOverlayActive" class="gallery-overlay" :scrim="true" :opacity="0.85" @click="closeImage">
    <div ref="overlayContentRef" class="gallery-overlay-content" tabindex="0" @click.stop @keydown="overlayKeyHandler">
      <v-btn icon variant="text" class="gallery-overlay-close" @click.stop="closeImage">
        <v-icon icon="mdi-close" size="36"></v-icon>
      </v-btn>

      <v-img v-if="selectedImage" :src="selectedImage" class="gallery-overlay-img" contain
        @click.stop="closeImage"></v-img>
    </div>
  </v-overlay>
</template>

<style scoped>
.photo-img {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.photo-img:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
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
</style>
