<template>
  <div class="expandable-text" :role="isMobile ? 'button' : undefined"
    :aria-expanded="isMobile ? isExpanded : undefined" @click="isMobile && toggleExpanded()">
    <span>
      <span v-html="displayText"></span>

      <v-icon v-if="isMobile && textLength > maxLength" :icon="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        size="x-small" class="expand-icon" @click.stop="toggleExpanded" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  text: string
  length?: number
}>()

const isExpanded = ref(false)
const maxLength = computed(() => props.length ?? 120)
const textLength = computed(() => props.text.length)

const isMobile = ref(false)

let mediaQuery: MediaQueryList

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 768px)')
  isMobile.value = mediaQuery.matches

  mediaQuery.addEventListener('change', handleChange)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener('change', handleChange)
})

function handleChange(e: MediaQueryListEvent) {
  isMobile.value = e.matches
  if (!isMobile.value) {
    isExpanded.value = false
  }
}

const displayText = computed(() => {
  if (!isMobile.value) {
    return props.text
  }

  if (isExpanded.value || textLength.value <= maxLength.value) {
    return props.text
  }

  const truncated = props.text.substring(0, maxLength.value).trim()
  const lastSpace = truncated.lastIndexOf(' ')
  return (
    (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...'
  )
})

function toggleExpanded() {
  if (!isMobile.value) return
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.expandable-text {
  line-height: 1.5;
}

.expandable-text[role='button'] {
  cursor: pointer;
}

.expand-icon {
  margin-left: 4px;
  vertical-align: middle;
}
</style>
