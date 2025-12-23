<script setup lang="ts">
import type { ICocktail } from '~/types/ICocktail.interface';

defineProps<{
  cocktail: ICocktail
}>()

</script>
<template>
  <v-card variant="outlined" class="h-100 d-flex flex-column">
    <v-img :src="cocktail.images[0]" max-height="600" cover></v-img>
    <div class="ma-3">
      <h2>{{ cocktail.name }}</h2>
      {{ cocktail.description }}
    </div>
    <v-spacer></v-spacer>
    <div class="ma-3">
      <b>Ингредиенты:</b>
      {{ cocktail.ingredients }}
    </div>
  </v-card>
</template>