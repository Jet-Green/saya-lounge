<!-- components/CocktailCard.vue -->
<script setup lang="ts">
import type { ICocktail } from '../types/ICocktail.interface'

const props = defineProps<{
  cocktail: ICocktail
}>()

// Определяем крепость для отображения
const displayStrength = computed(() => {
  if (props.cocktail.strength) return props.cocktail.strength
  if (typeof props.cocktail.alcohol === 'number') {
    if (props.cocktail.alcohol >= 40) return 'крепкий'
    if (props.cocktail.alcohol >= 30) return 'средний'
    return 'лёгкий'
  }
  // alcohol — строка (например, "~5", "4.5–5")
  if (props.cocktail.alcohol?.includes('0')) return 'безалкогольный'
  if (props.cocktail.alcohol?.includes('~') || props.cocktail.alcohol?.includes('–')) {
    const num = parseFloat(props.cocktail.alcohol.replace(/[^0-9.]/g, ''))
    return num >= 5 ? 'лёгкий' : 'безалкогольный'
  }
  return '—'
})

// Формат цены для отображения
const displayPrice = computed(() => {
  if (typeof props.cocktail.price === 'number') {
    return `${props.cocktail.price} ₽`
  }
  return props.cocktail.price.replace(/\s/g, '').includes('/')
    ? props.cocktail.price + ' ₽'
    : `${props.cocktail.price} ₽`
})
</script>

<template>
  <v-card variant="outlined" rounded="lg" class="h-100" :ripple="false">
    <v-card-title class="text-h6 font-weight-bold pb-1">
      {{ cocktail.name }}
    </v-card-title>

    <v-card-subtitle class="text-caption text-medium-emphasis pb-3">
      {{ cocktail.category }}
    </v-card-subtitle>

    <v-card-text class="pb-2">
      <div class="text-body-2 mb-3">
        {{ cocktail.description }}
      </div>

      <v-list density="compact" class="pa-0">
        <v-list-item>
          <template #prepend>
            <v-icon size="small" color="primary">mdi-bottle-wine</v-icon>
          </template>
          <v-list-item-title class="text-body-2">{{ cocktail.volume }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <template #prepend>
            <v-icon size="small" color="primary">mdi-glass-cocktail</v-icon>
          </template>
          <v-list-item-title class="text-body-2">{{ displayStrength }}</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="cocktail.alcohol">
          <template #prepend>
            <v-icon size="small" color="primary">mdi-alcohol</v-icon>
          </template>
          <v-list-item-title class="text-body-2">{{ cocktail.alcohol }}%</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions class="pt-1">
      <v-chip :color="{
        'бюджет': 'green',
        'средне': 'blue',
        'средне+': 'indigo',
        'премиум': 'purple',
        'люкс': 'deep-orange'
      }[cocktail.tier] || 'grey'" size="small" label>
        {{ cocktail.tier }}
      </v-chip>

      <v-spacer />

      <span class="text-h6 font-weight-bold text-primary">
        {{ displayPrice }}
      </span>
    </v-card-actions>
  </v-card>
</template>