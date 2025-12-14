<script setup lang="ts">
const { items, loading, error, fetchItems } = useAdminPhotos('bar')

onMounted(() => {
  fetchItems()
})
</script>

<template>
  <v-container class="py-8">
    <v-row class="mb-8">
      <v-col cols="12" class="text-center">
        <h1>Бар</h1>
      </v-col>
    </v-row>

    <PhotoGallery :items="items" :loading="loading" :error="error" />
  </v-container>
</template>
