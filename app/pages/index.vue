<script setup lang="ts">
import { computed } from 'vue'
import { useGallery } from '@/composables/useGallery'
import { useGalleryPagination } from '@/composables/useGalleryPagination'
import { useSwipe } from '@/composables/useSwipe'
import { useAutoScroll } from '@/composables/useAutoScroll'
import { useImageOverlay } from '@/composables/useImageOverlay'


const props = defineProps<{ rowsPerPage?: number }>()
const rowsPerPage = props.rowsPerPage ?? 2

const { images, loading, error, fetchGallery } = useGallery()

// Загрузка галереи
onMounted(() => {
  fetchGallery()
})

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

// экспортируем обработчики тача, используемые в шаблоне
const {
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleTouchCancel,
} = swipe

useAutoScroll(hasMultiplePages as any, nextPage, { intervalMs: 20000 })

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

const pagesCount = computed(() => pages.value.length)
const currentPageIndex = computed(() => currentPageIdx.value)
const currentPageKey = computed(() => `page-${currentPageIndex.value}`)

// преобразует значение justify в css-класс (шаблон использует класс или prop)
function justifyClass(justify: string) {
  switch (justify) {
    case 'start': return 'justify-start'
    case 'center': return 'justify-center'
    case 'end': return 'justify-end'
    case 'space-between': return 'justify-space-between'
    case 'space-around': return 'justify-space-around'
    default: return 'justify-center'
  }
}
</script>

<template>
  <v-row>
    <!-- <v-col class="fill-height-block" cols="12">
      <v-img src="/images/first-section.png" class="h-100 d-flex justify-center align-center" draggable="false" cover>
      </v-img>
    </v-col> -->
    <v-col class="full-height-block" cols="12">
      <v-parallax src=" /images/first-section.jpg" class="h-100 d-flex justify-center align-center user-select-none"
        draggable="false" cover gradient="to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.65)">
        <v-row class="d-flex justify-center align-center">
          <v-col cols="12" class="d-flex justify-center align-center mb-16">
            <v-img src="/icons/logo.png" height="256px" draggable="false" class="user-select-none"
              :style="{ height: 'clamp(12.5rem, 2.5568rem + 28.4091vw, 25rem)', width: 'auto', maxWidth: 'min(90vw, 400px)' }"></v-img>
          </v-col>
        </v-row>
      </v-parallax>
    </v-col>


    <v-col cols="12">
      <LandingBooking />
    </v-col>

    <v-col cols="12" style="margin: clamp(3.125rem, -10.2083rem + 20.8333vw, 6.25rem) 0 !important;">
      <v-row id="about-us" class="d-flex justify-center py-8">
        <v-col cols="11" md="9" class="justify-center align-center">
          <h2>
            САЯ — место вашей личной тишины среди городского шума<br>
            Лаундж-бар САЯ — новое концептуальное заведение от бренд-шефа Александра Ежова. Это пространство, где
            время
            замедляет свой бег, чтобы вы смогли обрести внутренне равновесие и перезагрузить чувства.<br>
            В интерьере глубокие, обволакивающие тона, игра света и тени, этнические артефакты и уникальные предметы
            искусства, которые создают атмосферу полной приватности и расслабления. Здесь вы остаетесь наедине с
            беседой,
            вкусами и своими мыслями.
          </h2>
        </v-col>
      </v-row>
    </v-col>


    <!-- margin in the component -->
    <LandingBar />

    <v-col cols="12" style="margin: clamp(3.125rem, -10.2083rem + 20.8333vw, 6.25rem) 0 !important;">
      <v-row class="d-flex justify-center">
        <v-col cols="11" md="9" class="justify-center align-center">
          <h1>Интерьер</h1>
          <h2>
            <br>
            Интерьер в этно-стиле, созданный известным дизайнером Ириной Райхер, погружает гостей в атмосферу
            таинственности: у входа вас встречают кости-оберегиневиданных животных и уникальные полотна, созданные
            современной художницей по мотивам древних ручных тканей.
            <br>
            Деревянные скульптуры выполненные из цельного куска дерева белорусским мастером воплощают в себе силу
            природы.
            <br>
            <br>
            Оригинальные светильники отбрасывают загадочные тени и смягчают свет. Росписи на стенах завораживают, ведь
            в
            их причудливых линиях можно разглядеть и птицу, и ската, и насекомое, а также собственные символы и знаки.
            Барная стойка – особый артефакт, созданный вручную и испещренный древними посланиями предков. САЯ – это
            погружение в первобытный вневременной мир, где каждый гость считывает свою историю, находясь внутри нее.
          </h2>
        </v-col>
      </v-row>
    </v-col>

    <!-- Карусель фоток -->
    <v-col cols="12" class="py-8">
      <div class="gallery-wrapper">
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
          Галерея будет доступна позже
        </div>
      </div>
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

    <v-col cols="12" style="margin: clamp(3.125rem, -10.2083rem + 20.8333vw, 6.25rem) 0 !important;">
      <v-row class="d-flex justify-center align-center">
        <v-col cols="11" md="9">
          <h1>Гастрономия</h1>
          <h2>
            <br>
            Кухня под руководством бренд-шефа Александра Ежова предлагает гастрономические композиции, которые станут
            идеальным сопровождением к бокалу редкого виски или авторскому коктейлю.
          </h2>
        </v-col>
      </v-row>
    </v-col>

    <!-- anchor for navigation -->
    <v-col class="py-8" cols="12">
      <div></div>
      <v-parallax id="menu-bar" src="/images/wall-background.jpg" class="h-100 d-flex justify-center align-center"
        draggable="false" cover>
        <v-row class="d-flex justify-center align-start">

          <!-- <v-col cols="12" md="6" class="d-flex justify-center align-center pa-4"
            style="margin: clamp(3.125rem, -10.2083rem + 20.8333vw, 6.25rem) 0 !important;">
            <v-btn class="transparent-bg" href="https://t.me/" target="_blank"> -->
          <v-col cols="12" md="6" class="d-flex justify-center align-center pa-4"
            style="margin: clamp(3.125rem, -10.2083rem + 20.8333vw, 6.25rem) 0 !important;">
            <v-btn class="transparent-bg" to="/bar">
              БАР
            </v-btn>
          </v-col>

          <v-col cols="12" md="6" class="d-flex justify-center align-center pa-4">
            <v-btn class="transparent-bg" to="/menu"
              style="margin: clamp(3.125rem, -10.2083rem + 20.8333vw, 6.25rem) 0 !important;">
              МЕНЮ
            </v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.btn-choice-cocktail {
  border: 2px solid white !important;
  width: max-content !important;
}

.video-container {
  height: 50vh;
  overflow: hidden;
  position: relative;
}

.video-hero-banner {
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  object-fit: cover;
}

.try-btn {
  transition: 0.25s;
  border-radius: 32px !important;
  text-transform: none !important;
  font-size: clamp(1rem, 0.7rem + 1.2vw, 1.5rem);
  font-weight: 400;

  padding: 32px !important;
  min-height: auto !important;
  line-height: 1 !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: max-content !important;

  background-color: white !important;
  color: black !important;
}

.try-btn:hover {
  background-color: #646464 !important;
  color: white !important;
}

.gray-text {
  color: #575757;
}

.flower-icon {
  width: clamp(100px, 20vw, 256px);
  height: auto;
  max-height: 256px;
  object-fit: contain;
}

.bar-text {
  font-weight: 700 !important
}

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

/*
.btn-transparent-background {
  transition: 0.25s;
  border-radius: 32px !important;
  text-transform: none !important;
  font-size: clamp(1rem, 0.7rem + 1.2vw, 1.5rem);
  font-weight: 400;

  padding: 24px 48px !important;
  height: clamp(56px, 6vw, 64px) !important;
  line-height: 1 !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  width: clamp(120px, 30vw, 300px) !important;

  border: 2px solid #bababa !important;
  background-color: transparent;
}

.btn-transparent-background:hover {
  background-color: white !important;
  color: black !important;
}*/
</style>