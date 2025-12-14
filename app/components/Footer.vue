<script setup lang="ts">

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>

<template>
  <v-footer padless>
    <v-row id="contacts" class="d-flex justify-center">
      <v-col cols="11" md="9">
        <v-row class="d-flex justify-space-between">
          <v-col cols="12" md="6" class="d-flex justify-start">
            <h3>
              г. Пермь, ул. Пермская, 33<br><br>
              <a href="tel:+7 (958) 14 13 321" class="telegram-link">+7 (958) 14 13 321</a><br><br>
              <NuxtLink href="https://t.me/SayaLounge" class="telegram-link" target="_blank">Telegram: @SayaLounge
              </NuxtLink><br>
              <br>
              Время работы:<br>
              Пн-Чт 12:00 — 24:00<br>
              Пт 12:00 — 2:00<br>
              Сб 14:00 — 2:00<br>
              Вс 14:00 — 24:00
            </h3>
          </v-col>

          <v-col cols="12" md="6" class="d-flex justify-md-end justify-center align-center">
            <!-- <v-btn class="btn-black-background" @click="scrollToTop">
              Вернуться наверх
              <v-icon right>mdi-arrow-up-thin</v-icon>
            </v-btn> -->
            <v-row class="d-flex justify-md-end justify-center">
              <v-col cols="5" md="4" lg="3">
                <v-img src="/icons/logo.png" contain></v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
/* Кнопка с черным фоном и белой рамкой */
.btn-black-background {
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

  /* width: max-content !important; */
  width: clamp(180px, fit-content(50%), 400px) !important;
  /* width: 100% !important; */

  /* border: 2px solid white !important; */
}

.btn-black-background:hover {
  /* background-color: white !important; */
  /* color: black !important; */
}
</style>