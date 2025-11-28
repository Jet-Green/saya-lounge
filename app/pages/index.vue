<script setup lang="ts">
import { computed } from 'vue'
import { useGallery } from '@/composables/useGallery'
import { useGalleryPagination } from '@/composables/useGalleryPagination'
import { useSwipe } from '@/composables/useSwipe'
import { useAutoScroll } from '@/composables/useAutoScroll'
import { useImageOverlay } from '@/composables/useImageOverlay'

const props = defineProps<{ rowsPerPage?: number }>()
const rowsPerPage = props.rowsPerPage ?? 2

const { images } = useGallery()

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
      <v-img src=" /images/first-section.png" class="h-100 d-flex justify-center align-center" draggable="false" cover>
        <v-row class="d-flex justify-center align-center">
          <v-col cols="12" class="d-flex justify-center align-center mb-16">
            <v-img src="/icons/logo.png" height="256px" draggable="false" class="user-select-none"></v-img>
          </v-col>
        </v-row>
      </v-img>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center align-center pa-8">
          <v-col cols="12" md="10" class="justify-center align-center py-8">
            <h1>BOOKING</h1>
            <h2>
              <br>
              Время работы:<br>
              <br>
              Пн‑Чт&nbsp;12:00&nbsp;—&nbsp;24:00<br>
              Пт&nbsp;12:00&nbsp;—&nbsp;2:00<br>
              Сб&nbsp;14:00&nbsp;—&nbsp;2:00<br>
              Вс&nbsp;14:00&nbsp;—&nbsp;24:00<br>
              <br>
              Вы можете забронировать стол в САЯ:<br>
              <a href="https://t.me/" class="telegram-link">Telegram</a><br>
              <a href="tel:+79581413321">✆&nbsp;+7&nbsp;958&nbsp;141‑33‑21</a>
            </h2>

            <v-col class="pt-2">
              <v-btn class="booking-btn" href="https://t.me/" target="_blank">
              Провести свое мероприятие
              </v-btn>
            </v-col>
            
          </v-col>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center align-center pt-2 pa-8">
          <v-img src="/images/dark-cocktail.jpg" class="h-100 d-flex justify-center align-center user-select-none"
            draggable="false"></v-img>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row class="py-8" justify="center">
        <v-col cols="12" class="video-container pa-0">
          <video src="/videos/saya-video-compressed.mp4" autoplay muted loop playsinline draggable="false" class = "video-hero-banner"></video>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12" class="d-flex justify-center align-center pa-8">
          <v-col cols="12" md="9" class="justify-center align-center">
            <!-- <h1>«САЯ»&nbsp;—&nbsp;это тень, в которой вкус раскрывается иначе.</h1> -->
            <h2>
              Лаундж-бар «Сая»: Пристанище в тени
              <br>
              <br>
              Забудьте о суете. Вы входите в другой мир.
              <br>
              <br>
              Лаундж-бар «Сая» — это измерение, где время замедляется, а тревоги остаются за порогом. Наше название, означающее «тень» с тюркского, — это не просто слово, а суть всего, что вас окружает. Это мягкий полумрак, уютные уголки и глубина, в которой можно укрыться.
              <br>
              <br>
              Прикоснитесь к нашей тайне. У входа вас встречают кости таинственных существ — древний оберег, знак того, что здесь царит свой закон, а гости находятся под защитой. Это предвестие уникального опыта, который ждет вас внутри.
            </h2>
          </v-col>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center align-center pa-8">
          <v-img src="/images/hand-cocktail-shrimp.jpg" class="h-100 user-select-none" draggable="false" contain></v-img>
        </v-col>

        <v-col cols="12" md="6" class="d-flex flex-column justify-center align-center pa-8">
          <h2>
            Сая — хозяйка и дух этого места.
            <br>
            <br>
            Она лесная нимфа, дух чащи, которая воплотилась здесь.<br>
            Она рождена из тени.
            <br>
            <br>
            Загадочная, как лесная полночь.
            <br>
            <br>
            Она проводит гостей через их вечер, очаровывая и удивляя.
          </h2>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" class="py-8">
      <div class="gallery-wrapper">
        <div v-if="hasPages" class="gallery-pages">
          <transition :name="transitionName" mode="out-in">
            <div :key="currentPageIdx" class="gallery-page"
              @touchstart.passive="handleTouchStart"
              @touchmove.passive="handleTouchMove"
              @touchend="handleTouchEnd"
              @touchcancel="handleTouchCancel"
              >
              <div v-for="(row, rowIdx) in currentPage" :key="`row-${currentPageIdx}-${row.key}`" class="gallery-row-container">
                <v-row class="gallery-row" dense :justify="row.justify" align="stretch">
                  <v-col v-for="cell in row.cells" :key="cell.key" :cols="cell.cols" class="pa-0">
                    <v-img :src="cell.src" class="gallery-img user-select-none" cover :draggable="false" loading="lazy" @click="handleImageClick(cell.src)"></v-img>
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
      <div ref="overlayContentRef" class="gallery-overlay-content" tabindex="0" @click.stop @keydown="overlayKeyHandler">
        <v-btn icon variant="text" class="gallery-overlay-close" @click.stop="closeImage">
          <v-icon icon="mdi-close" size="36"></v-icon>
        </v-btn>

        <v-img v-if="selectedImage" :src="selectedImage" class="gallery-overlay-img" contain @click.stop="closeImage"></v-img>
      </div>
    </v-overlay>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center align-center pa-8">
          <v-col cols="12" md="10" class="justify-center align-center py-8">
            <h2>
              Не знаешь, что заказать?
              <br>
              Сая поможет!
              <br>
              <br>
              Подберем тебе
              <br>
              "тот самый" напиток
            </h2>

            <v-col cols="12" md="10" class="d-flex align-center py-8">
              <v-btn class="try-btn" href="https://t.me/" target="_blank">
              ПОПРОБОВАТЬ!
              </v-btn>
            </v-col>

            <h3 class="gray-text">
              На основе искуственного интеллекта подберем напиток из раздела “Бар”, учитывая ваши предпочтения
            </h3>
          </v-col>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center align-center pa-8">
          <v-img src="/images/hand-up.jpg" class="h-100 d-flex justify-center align-center user-select-none"
            draggable="false"></v-img>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="4" md="4" class="d-flex justify-center align-center pa-4">
            <v-btn class="flower-btn" href="https://t.me/" target="_blank">
              БАР
            </v-btn>
        </v-col>

        <v-col cols="4" md="4" class="d-flex justify-center align-center">
          <v-img src="/icons/saya-flower.png" draggable="false" class="user-select-none flower-icon"></v-img>
        </v-col>

        <v-col cols="4" md="4" class="d-flex justify-center align-center pa-4">
            <v-btn class="flower-btn" href="https://t.me/" target="_blank">
              МЕНЮ
            </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="full-height-block py-8" cols="12">
      <v-img src="/images/wall-background.png" class="h-100 d-flex justify-center align-end" draggable="false" cover>
        <v-row class="d-flex justify-center align-start">
          
          <v-col cols="6" class="d-flex justify-center align-center pa-8">
            <h2 class="bar-text">
              Илья — шеф-бармен
            </h2>
          </v-col>

          <v-col cols="6" class="d-flex justify-center align-center pa-8">
            <h2 class="bar-text">
              Дмитрий — бармен
            </h2>
          </v-col>

          <v-spacer style="height: 230px;"></v-spacer>
        </v-row>
      </v-img>
    </v-col>

  </v-row>
</template>
<style scoped lang="scss">
.full-height-block {
  height: calc(100vh - 90px);
}

.user-select-none {
  user-select: none;
}

.telegram-link {
  text-decoration: underline !important;
  text-decoration-thickness: 1px !important;
  text-underline-offset: 2px !important;
}

.booking-btn {
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
}

.booking-btn:hover {
  background-color: white !important;
  color: black !important;
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

.flower-btn {
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
  width: clamp(200px, 40vw, 320px) !important;

  border: 2px solid #bababa !important;
}

.flower-btn:hover {
  background-color: white !important;
  color: black !important;
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

.gallery-row-container + .gallery-row-container {
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