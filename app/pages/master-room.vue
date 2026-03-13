<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme()

const items = [
  { key: '5', url: 'https://storage.yandexcloud.net/saya-lounge/master-room/5.jpg' },
  { key: '10', url: 'https://storage.yandexcloud.net/saya-lounge/master-room/10.jpg' },
  { key: '14', url: 'https://storage.yandexcloud.net/saya-lounge/master-room/14.jpg' },
  { key: '19', url: 'https://storage.yandexcloud.net/saya-lounge/master-room/19.jpg' },
  { key: '50', url: 'https://storage.yandexcloud.net/saya-lounge/master-room/50.jpg' },
  { key: '51', url: 'https://storage.yandexcloud.net/saya-lounge/master-room/51.jpg' },
  { key: '39', url: 'https://storage.yandexcloud.net/saya-lounge/master-room/39.jpg' },
  { key: '40', url: 'https://storage.yandexcloud.net/saya-lounge/master-room/40.jpg' },
]

const loading = ref(false)
const error = ref('')

theme.change("light")
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
        Идеальный банкет в полной приватности<br>
        Лаундж-бар САЯ можно забронировать для приватного мероприятия. Полностью изолированное пространство,
        персональное
        обслуживание и индивидуальный подход к составлению меню сделают ваш банкет — будь то деловой ужин или личное
        торжество — безупречным событием.</h3>
    </v-col>

    <v-col cols="12" class="mb-8">
      <PhotoGallery :items="items" :loading="loading" :error="error" />
    </v-col>
  </v-row>
</template>