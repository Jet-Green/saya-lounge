<script setup>

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
        таинственности: у входа вас встречают кости-оберег и невиданных животных и уникальные полотна, созданные
        современной художницей по мотивам древних ручных тканей. Деревянные скульптуры выполненные из цельного куска
        дерева белорусским мастером воплощают в себе силу природы.
      </h3>
    </v-col>

    <v-col cols="12" class="mb-8">
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="11" md="10">
          <v-img src="/images/master-room/main.jpg" cover></v-img>
        </v-col>
        <!-- <v-col v-for="(img, index) of images" :key="index" :cols="img.cols" :md="img.md" :lg="img.lg">
            <v-img cover :src="img.src" class="h-100"></v-img>
          </v-col> -->
      </v-row>
    </v-col>
  </v-row>
</template>