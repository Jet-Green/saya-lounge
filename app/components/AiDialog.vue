<script setup lang="ts">

let {
  strengthOptions, tasteOptions, moodOptions,
  dialog, step, resultCocktails,
  nextStep, closeDialog, askAi
} = useAiDialog()

// answers хранят индексы выбранных опций
const answers = ref<{
  strength: number | null
  taste: number | null
  mood: number | null
}>({
  strength: null,
  taste: null,
  mood: null,
})

function submitPrompt() {
  askAi(answers.value.strength, answers.value.taste, answers.value.mood)
}
</script>

<template>
  <v-dialog v-model="dialog" width="80vw" min-height="80vh" persistent eager>
    <v-card style="position: relative;">
      <!-- Close button -->
      <div style="position: absolute; top: 12px; right: 12px; cursor: pointer; z-index: 1000;" @click="closeDialog">
        <img src="/icons/close-dialog-icon.svg" alt="">
      </div>

      <!-- Preview Step -->
      <v-row v-if="step === 'preview'">
        <v-col cols="6" class="d-flex justify-center align-center">
          <v-row class="d-flex justify-center h-100">
            <v-col cols="8" lg="6" class="d-flex flex-column justify-space-around">
              <h2>Добро пожаловать в мир вкусов, ароматов и экспериментов — здесь каждый коктейль рассказывает историю
              </h2>
              <h3>Просто скажи, что чувствуешь — и я подберу напиток, который идеально подойдёт твоему настроению.</h3>
              <v-btn class="step-button" @click="nextStep('select')">
                <h2 class="my-5">К подбору коктейля</h2>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" style="overflow: hidden; height: 80vh;">
          <ClientOnly>
            <video autoplay loop muted playsinline class="hero-video">
              <source src="https://storage.yandexcloud.net/saya-lounge/videos/ai.mp4" type="video/mp4" />
            </video>
          </ClientOnly>
        </v-col>
      </v-row>

      <!-- Select Step -->
      <v-row v-else-if="step === 'select'" class="background-img d-flex justify-center">
        <v-col cols="12" class="pa-8">

          <!-- Вопрос 1: Крепость -->
          <h2 class="mb-3">Какую крепость вы предпочитаете?</h2>
          <v-chip-group v-model="answers.strength" class="mb-6" selected-class="selected-chip">
            <v-chip v-for="(s, i) in strengthOptions" :key="i" :value="i" size="x-large" variant="outlined">
              {{ s }}
            </v-chip>
          </v-chip-group>

          <!-- Вопрос 2: Вкус -->
          <h2 class="mb-3">Какой профиль вкуса вам ближе?</h2>
          <v-chip-group v-model="answers.taste" class="mb-6" selected-class="selected-chip">
            <v-chip v-for="(t, i) in tasteOptions" :key="i" :value="i" size="x-large" variant="outlined">
              {{ t }}
            </v-chip>
          </v-chip-group>

          <!-- Вопрос 3: Настроение -->
          <h2 class="mb-3">Какое настроение вы хотите передать напитком?</h2>
          <v-chip-group v-model="answers.mood" class="mb-6" selected-class="selected-chip">
            <v-chip v-for="(m, i) in moodOptions" :key="i" :value="i" size="x-large" variant="outlined">
              {{ m }}
            </v-chip>
          </v-chip-group>

        </v-col>

        <!-- Кнопка отправки -->
        <v-col cols="12" md="6" lg="4">
          <v-btn class="step-button"
            :disabled="answers.strength === null || answers.taste === null || answers.mood === null"
            @click="submitPrompt">
            <h2 class="my-4">Подобрать коктейли</h2>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Result Step -->
      <v-row v-else-if="step === 'result'">
        <v-col v-for="cocktail of resultCocktails" class="pa-2" :key="cocktail._id" cols="12" md="6" lg="4">
          <AiCocktail :cocktail="cocktail" />
        </v-col>
        <!-- {{ resultCocktails }} -->
        <!-- сюда можно вывести результат AI -->
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