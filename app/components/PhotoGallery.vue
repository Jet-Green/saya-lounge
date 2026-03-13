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

  <v-row class="d-flex justify-center" v-if="items.length > 0">
    <v-col cols="11" sm="11" md="10">
      <v-row class="d-none d-lg-flex">
        <v-col cols="4">
          <v-img v-for="(item, index) in items.filter((_, i) => i % 3 === 0)" :key="item.key" :src="item.url"
            :alt="item.key" class="my-2" cover draggable="false" lazy @click="handleImageClick(item.url)" />
        </v-col>

        <v-col cols="4" class="px-2">
          <v-img v-for="(item, index) in items.filter((_, i) => i % 3 === 1)" :key="item.key" :src="item.url"
            :alt="item.key" class="my-2" cover draggable="false" lazy @click="handleImageClick(item.url)" />
        </v-col>

        <v-col cols="4">
          <v-img v-for="(item, index) in items.filter((_, i) => i % 3 === 2)" :key="item.key" :src="item.url"
            :alt="item.key" class="my-2" cover draggable="false" lazy @click="handleImageClick(item.url)" />
        </v-col>
      </v-row>
      <v-row class="d-flex d-lg-none">
        <v-col cols="6" class="pr-2">
          <v-img v-for="(item, index) in items.filter((_, i) => i % 2 === 0)" :key="item.key" :src="item.url"
            :alt="item.key" class="my-2" cover draggable="false" lazy @click="handleImageClick(item.url)" />
        </v-col>

        <v-col cols="6">
          <v-img v-for="(item, index) in items.filter((_, i) => i % 2 === 1)" :key="item.key" :src="item.url"
            :alt="item.key" class="my-2" cover draggable="false" lazy @click="handleImageClick(item.url)" />
        </v-col>
      </v-row>
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
