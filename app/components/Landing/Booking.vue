<script setup lang="ts"></script>
<template>
  <v-row class="d-flex justify-center full-height-block">
    <!-- big screen -->
    <v-col cols="11" md="9" class="d-none d-md-flex justify-center align-center">
      <v-row class="d-flex justify-space-between">
        <v-col cols="12" md="5" class="d-flex flex-column justify-center align-start">
          <h1>BOOKING</h1>
          <div>
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
              <NuxtLink href="https://t.me/SayaLounge" target="_blank" class="telegram-link">Telegram</NuxtLink><br>
              <NuxtLink href="tel:+79581413321">✆&nbsp;+7&nbsp;958&nbsp;141‑33‑21</NuxtLink>
            </h2>

            <v-col class="pt-8">
              <v-btn>
                Провести свое мероприятие
              </v-btn>
            </v-col>
          </div>
        </v-col>

        <v-col cols="12" md="6" lg="5" class="d-flex justify-center">
          <v-img src="/images/dark-cocktail.jpg" class="h-100 user-select-none" draggable="false" cover>
          </v-img>
        </v-col>
      </v-row>
    </v-col>
    <!-- big screen -->

    <!-- small screen! -->
    <v-col cols="12" class="d-flex d-md-none justify-center align-center my-8 img-background">
      <v-row class="d-flex justify-center">
        <v-col cols="11" md="5" class="d-flex flex-column justify-center align-start">
          <h1>BOOKING</h1>
          <div>
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
              <NuxtLink href="https://t.me/SayaLounge" target="_blank" class="telegram-link">Telegram</NuxtLink><br>
              <NuxtLink href="tel:+79581413321">✆&nbsp;+7&nbsp;958&nbsp;141‑33‑21</NuxtLink>
            </h2>

            <v-col class="pt-8">
              <v-btn class="transparent-bg">
                Провести свое мероприятие
              </v-btn>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <!-- small screen! -->
  </v-row>
</template>
<style scoped lang="scss">
.img-background {
  min-height: 80vh;
  background:
    linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.26)),
    url("/images/dark-cocktail.jpg");
  background-position: center;
  background-size: cover;
}
</style>