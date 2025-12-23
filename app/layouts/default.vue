<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))

let routes = computed(() => {
  if (route.path == "/")
    return [{ name: "Галерея", link: "/gallery" }, { name: "Меню", link: "/#menu-bar" }, { name: "Контакты", link: "/#contacts" }]
  return [{ name: "Галерея", link: "/gallery" }, { name: "Главная", link: "/" }, { name: "Контакты", link: "/#contacts" }]
})


watch(route, () => {
  if (route.path == "/master-room" || route.path == "/gallery")
    theme.change('light')
  else
    theme.change('dark')
})
</script>

<template>
  <v-app>
    <v-app-bar flat height="90">
      <v-container class="d-flex justify-center">
        <v-row class="d-flex justify-center">
          <v-col cols="8" xl="5" lg="4" class="d-flex justify-space-between">
            <TransitionGroup name="list">
              <NuxtLink v-for="(l, index) of routes" :key="index" :to="l.link">
                {{ l.name }}
              </NuxtLink>
            </TransitionGroup>
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
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-move {
  transition: transform 0.5s ease;
}
</style>