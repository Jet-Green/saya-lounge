<script setup lang="ts">
let { dialog, step, nextStep, closeDialog } = useAiDialog()

const answers = ref({
  strength: null,
  taste: null,
  mood: null,
})

function askAi() {

}
</script>
<template>
  <v-dialog v-model="dialog" width="80vw" min-height="80vh" persistent eager>
    <v-card style="position: relative;">
      <div style="position: absolute; top: 10px; right: 10px; cursor: pointer; z-index: 1000;" @click="closeDialog">
        <img src="/icons/close-dialog-icon.svg" alt="">
      </div>
      <v-row v-if="step == 'preview'">
        <v-col cols="6" class="d-flex justify-center align-center">
          <v-row class="d-flex justify-center h-100">
            <v-col cols="8" lg="6" class="d-flex flex-column justify-space-around">
              <h2>Добро пожаловать в мир вкусов, ароматов и экспериментов
                — здесь каждый коктейль рассказывает историю</h2>

              <h3>Просто скажи, что чувствуешь — и я подберу напиток, который идеально подойдёт твоему настроению.</h3>

              <v-btn class="step-button" @click="nextStep('select')">
                <h2 class="my-5">
                  К подбору коктейля
                </h2>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6" style="overflow: hidden; height: 80vh;">
          <ClientOnly>
            <video autoplay loop muted playsinline class="hero-video">
              <source src="https://storage.yandexcloud.net/saya-lounge/videos/ai.mp4" type="video/mp4" />
              <!-- <source src="/videos/first-section.webm" type="video/webm" /> -->
            </video>
          </ClientOnly>
        </v-col>
      </v-row>
      <v-row v-else-if="step == 'select'" class="background-img d-flex justify-center">
        <v-col cols="12" class="pa-8">
          <!-- Вопрос 1 -->
          <h2 class="mb-3">Какую крепость вы предпочитаете?</h2>
          <v-chip-group v-model="answers.strength" class="mb-6" selected-class="selected-chip">
            <v-chip value="light" variant="outlined" size="x-large">
              🫧 Лёгкий / освежающий
            </v-chip>

            <v-chip value="medium" variant="outlined" size="x-large">
              🍹 Средней крепости
            </v-chip>

            <v-chip value="strong" variant="outlined" size="x-large">
              🥃 Крепкий
            </v-chip>
          </v-chip-group>

          <!-- Вопрос 2 -->
          <h2 class="mb-3">Какой профиль вкуса вам ближе?</h2>
          <v-chip-group v-model="answers.taste" class="mb-6" selected-class="selected-chip">
            <v-chip value="sweet" variant="outlined" size="x-large">
              🍭 Сладкий / фруктовый
            </v-chip>

            <v-chip value="sour" variant="outlined" size="x-large">
              🍋 Кисло-сладкий
            </v-chip>

            <v-chip value="bitter" variant="outlined" size="x-large">
              🌿 Горьковатый / терпкий
            </v-chip>
          </v-chip-group>

          <!-- Вопрос 3 -->
          <h2 class="mb-3">Какое настроение вы хотите передать напитком?</h2>
          <v-chip-group v-model="answers.mood" selected-class="selected-chip">
            <v-chip value="evening" variant="outlined" size="x-large">
              🌅 Лёгкий вечер, прогулка, аперитив
            </v-chip>

            <v-chip value="party" variant="outlined" size="x-large">
              🎉 Ярко, празднично, эффектно
            </v-chip>

            <v-chip value="classic" variant="outlined" size="x-large">
              🖤 Классика, глубина, характер
            </v-chip>
          </v-chip-group>

        </v-col>
        <v-col cols="12" md="6" lg="4">
          <v-btn class="step-button" :disabled="!answers.strength || !answers.taste || !answers.mood">
            <h2 class="my-4">
              Подобрать коктейли
            </h2>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-else-if="step == 'result'">

      </v-row>
    </v-card>
  </v-dialog>
</template>
<style>
.step-button {
  background-color: white;
  color: black;
  text-transform: none;
  height: fit-content !important;
  width: 100%;
}

.hero-video {
  object-fit: fill;
  object-position: center;
}

.background-img {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.55)), url("/images/first-section.jpg");
  background-position: center;
  background-size: cover;
}

.selected-chip {
  background-color: white;
  color: black;
  /* background-color: rgba(255, 255, 255, 0.5); */
  /* box-shadow: 0 2px 2px rgba(255, 255, 255, 0.8); */
}
</style>