<script setup lang="ts"></script>
<template>
  <v-row>
    <v-col class="full-height-block" cols="12">
      <v-img src=" /images/first-section.png" class="h-100 d-flex justify-center align-center" draggable="false" cover>
        <v-row class="d-flex justify-center align-center">
          <v-col cols="12" class="d-flex justify-center align-center mb-16">
            <v-img src="/icons/logo.png" height="256px" draggable="false" class="user-select-none"></v-img>
          </v-col>
          <v-col cols="12" class="d-flex justify-center align-center">
            <h2>
              Здесь вкус становится искусством
            </h2>
          </v-col>
        </v-row>
      </v-img>
    </v-col>

    <v-col class="full-height-block" cols="12">
      <v-row>
        <v-col cols="12" md="6">
          <h1>BOOKING</h1>
        </v-col>
        <v-col cols="12" md="6">
          white-cocktail.png
        </v-col>
      </v-row>
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
</style>