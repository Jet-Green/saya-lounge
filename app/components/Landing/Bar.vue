<script setup lang="ts"></script>
<template>
  <v-col cols="12" class="image-bg" style="margin: 50px 0 !important;">
    <v-row class="d-flex justify-center">
      <v-col cols="11" md="9" class="d-flex flex-column justify-center align-center">
        <v-row class="d-flex justify-start align-start">
          <v-col cols="12" md="8" lg="6" class="d-flex align-center">
            <v-col cols="12" md="10" class="">
              <h1>Бар</h1>
              <h2>
                <br>
                Бармены со скрупулезной точностью исполняют ритуалы приготовления напитков.<br>
                <br>
                Каждый коктейль — это зашифрованное послание, а каждый вечер — новое путешествие вглубь собственных
                ощущений.<br>
                <br>
                Наша барная карта – это виртуозно составленная коллекция напитков со всего мира, где каждая позиция
                подобрана для вашего идеального вечера.
              </h2>
            </v-col>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-end align-end" style="margin: 100px 0 !important;">
          <v-col cols="12" md="8" class="d-flex justify-end align-center">
            <v-col cols="12" md="10" class="justify-center align-center">
              <h1>
                Не знаешь, что заказать?
                <br>
                Сая поможет!
              </h1>

              <v-col cols="12" md="10" style="margin: 40px 0 !important;" class="d-flex align-center">
                <v-btn class="transparent-bg" href="https://t.me/" target="_blank">
                  Подобрать напиток
                </v-btn>
              </v-col>

              <h3 class="text-grey-lighten-1">
                На основе искусственного интеллекта подберем напиток из раздела “Бар”, учитывая ваши предпочтения
              </h3>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>

</template>
<style scoped lang="scss">
.image-bg {
  min-height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("/images/shrimp-comp.jpg");
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

@media (max-width: 1024px) {
  .image-bg {
    background-position: center !important;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/shrimp-comp.jpg");
  }
}
</style>