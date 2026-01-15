<script setup lang="ts">
let { galleryItems, fetchGallery } = useAdminGallery()
import { useTheme } from 'vuetify'

let theme = useTheme()
theme.change("light")

await fetchGallery()

const twoCols = computed<{ one: string[]; two: string[] }>(() => {
  const cols = {
    one: [] as string[],
    two: [] as string[],
  }

  galleryItems.value.forEach((item, index) => {
    if (index % 2 === 0) cols.one.push(item.url)
    else cols.two.push(item.url)
  })

  return cols
})

const threeCols = computed<{ one: string[]; two: string[]; three: string[] }>(() => {
  const cols = {
    one: [] as string[],
    two: [] as string[],
    three: [] as string[],
  }

  galleryItems.value.forEach((item, index) => {
    if (index % 3 === 0) cols.one.push(item.url)
    else if (index % 3 === 1) cols.two.push(item.url)
    else cols.three.push(item.url)
  })

  return cols
})


const overlay = useImageOverlay()

// экспортируем привязки оверлея, используемые в шаблоне
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
  <v-row class="d-flex justify-center">
    <v-col cols="12">
      <v-parallax src="/images/bones.webp" max-height="500px" scale="0.9" class="d-flex justify-center align-center">
        <v-img src="/icons/logo.png" style="height: clamp(12.5rem, 2.5568rem + 28.4091vw, 25rem)"></v-img>
      </v-parallax>
    </v-col>

    <v-col cols="11" md="9" style="margin: 80px 0 !important;">
      <h3>
        Интерьер в этно-стиле, созданный известным дизайнером Ириной Райхер, погружает гостей в атмосферу
        таинственности: у входа вас встречают кости-оберег невиданных животных и уникальные полотна, созданные
        современной художницей по мотивам древних ручных тканей. Деревянные скульптуры выполненные из цельного куска
        дерева белорусским мастером воплощают в себе силу природы.
      </h3>
    </v-col>

    <v-col cols="12" class="mb-8">
      <v-row class="d-flex justify-center">
        <v-col cols="11" sm="11" md="10">
          <v-row class="d-none d-lg-flex">
            <v-col cols="4">
              <v-img v-for="(img, index) in threeCols.one" @click="handleImageClick(img)" :key="index" :src="img"
                class="my-2"></v-img>
            </v-col>

            <v-col cols="4" class="px-2">
              <v-img v-for="(img, index) in threeCols.two" @click="handleImageClick(img)" :key="index" :src="img"
                class="my-2"></v-img>
            </v-col>

            <v-col cols="4">
              <v-img v-for="(img, index) in threeCols.three" @click="handleImageClick(img)" :key="index" :src="img"
                class="my-2"></v-img>
            </v-col>
          </v-row>
          <v-row class="d-flex d-lg-none">
            <v-col cols="6" class="pr-2">
              <v-img v-for="(img, index) in twoCols.one" @click="handleImageClick(img)" :key="index" :src="img"
                class="my-2"></v-img>
            </v-col>

            <v-col cols="6">
              <v-img v-for="(img, index) in twoCols.two" @click="handleImageClick(img)" :key="index" :src="img"
                class="my-2"></v-img>
            </v-col>
          </v-row>
          <!-- {{ galleryItems }} -->
          <!-- <v-img src="/images/master-room/main.jpg" cover></v-img> -->
        </v-col>
        <!-- <v-col v-for="(img, index) of images" :key="index" :cols="img.cols" :md="img.md" :lg="img.lg">
            <v-img cover :src="img.src" class="h-100"></v-img>
          </v-col> -->
      </v-row>
    </v-col>

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
  </v-row>
</template>