<script setup lang="ts">
const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <v-app>
    <v-app-bar flat height="90">
      <v-container class="d-flex justify-center">
        <v-row class="d-flex justify-center">
          <v-col cols="8" xl="5" lg="4" class="d-flex justify-space-between">
            <NuxtLink to="/#about-us">
              О нас
            </NuxtLink>
            <NuxtLink to="/#menu-bar">
              Меню
            </NuxtLink>
            <NuxtLink to="/#contacts">
              Контакты
            </NuxtLink>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main :class="isAdmin ? 'admin-page' : 'home-page'">
      <slot />
    </v-main>

    <Footer />
  </v-app>
</template>