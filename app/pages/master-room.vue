<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme()

const images = [
  // 1–3: ровный старт
  { src: 'images/master-room/1.jpg', cols: 12, md: 4, lg: 4 },
  { src: 'images/master-room/2.jpg', cols: 12, md: 4, lg: 4 },
  { src: 'images/master-room/3.jpg', cols: 12, md: 4, lg: 4 },

  // 4–5: стандарт 6/6
  { src: 'images/master-room/4.jpg', cols: 12, md: 6, lg: 6 },
  { src: 'images/master-room/5.jpg', cols: 12, md: 6, lg: 6 },

  // 6–8: снова плотная тройка
  { src: 'images/master-room/6.jpg', cols: 12, md: 4, lg: 4 },
  { src: 'images/master-room/7.jpg', cols: 12, md: 4, lg: 4 },
  { src: 'images/master-room/8.jpg', cols: 12, md: 4, lg: 4 },

  // 9–10: редкий акцент
  { src: 'images/master-room/9.jpg', cols: 12, md: 8, lg: 8 },
  { src: 'images/master-room/10.jpg', cols: 12, md: 4, lg: 4 },

  // 11–12: финал 6/6
  { src: 'images/master-room/11.jpg', cols: 12, md: 6, lg: 6 },
  { src: 'images/master-room/12.jpg', cols: 12, md: 6, lg: 6 },
]

theme.change("light")
</script>
<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12">
      <v-parallax src="/images/bones.png" max-height="500px" scale="0.7" class="d-flex justify-center align-center">
        <v-img src="/icons/logo.png" style="height: clamp(12.5rem, 2.5568rem + 28.4091vw, 25rem)"></v-img>
      </v-parallax>
    </v-col>

    <v-col cols="11" md="9" style="margin: 80px 0 !important;">
      <h3>
        Идеальный банкет в полной приватности<br>
        Лаундж-бар САЯ можно выкупить для приватного мероприятия. Полностью изолированное пространство, персональное
        обслуживание и индивидуальный подход к составлению меню сделают ваш банкет — будь то деловой ужин или личное
        торжество — безупречным событием.</h3>
    </v-col>

    <v-col cols="12" class="mb-8">
      <v-row>
        <v-col v-for="(img, index) of images" :key="index" :cols="img.cols" :md="img.md" :lg="img.lg">
          <v-img cover :src="img.src" class="h-100"></v-img>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>