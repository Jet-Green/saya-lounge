<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
})

const { uploading, uploadedCount, totalFiles, successMessage, uploadFiles } = useAdminGallery()

const isDragOver = ref(false)
const fileInput = ref<HTMLInputElement>()

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  const files = Array.from(event.dataTransfer?.files || [])
  const imageFiles = files.filter(file => 
    file.type === 'image/jpeg' || file.type === 'image/png'
  )
  
  if (imageFiles.length > 0) {
    uploadFiles(imageFiles)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  const imageFiles = files.filter(file => 
    file.type === 'image/jpeg' || file.type === 'image/png'
  )
  
  if (imageFiles.length > 0) {
    uploadFiles(imageFiles)
  }
  
  // Сбросить input для возможности выбрать те же файлы снова
  if (target) target.value = ''
}

const openFileDialog = () => {
  fileInput.value?.click()
}
</script>

<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8">
        <v-sheet @drop.prevent="handleDrop" @dragover.prevent="handleDragOver" @dragleave="handleDragLeave"
          class="upload-zone d-flex flex-column align-center justify-center text-center"
          :class="{ 'upload-zone--active': isDragOver }"
          rounded="lg" elevation="4" color="surface" height="400">
          <v-col cols="12" v-if="uploading" class="d-flex flex-column align-center justify-center">
            <v-progress-circular indeterminate color="primary" size="64" class="mb-4"/>
            <h3>
              Загрузка {{ uploadedCount }} из {{ totalFiles }} файлов...
            </h3>
          </v-col>

          <v-col cols="12" v-else-if="successMessage" class="d-flex flex-column align-center justify-center success-message-col">
            <h3 class="text-success success-message-text">
              {{ successMessage }}
            </h3>
          </v-col>

          <template v-else>
            <v-col cols="12" class="d-flex flex-column align-center justify-center text-center h-100">
              <v-icon size="80" color="primary" class="mb-4">mdi-cloud-upload</v-icon>
              <h2 class="font-weight-bold mb-2">
                Перетащите изображения сюда
              </h2>
              <h3 class="mb-6">
                Поддерживаются форматы: JPG, JPEG, PNG
              </h3>
              <v-btn class="btn-white-background" size="large" @click="openFileDialog">
                ВЫБРАТЬ ФАЙЛЫ
              </v-btn>
              <input ref="fileInput" type="file" multiple accept="image/jpeg,image/png" @change="handleFileSelect" style="display: none"/>
            </v-col>
          </template>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.upload-zone {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  background-color: rgba(var(--v-theme-surface), 0.6) !important;
  border: 1px solid rgba(var(--v-border-color), 0.2);
}

.upload-zone:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(var(--v-theme-on-surface), 0.2) !important;
}

.upload-zone--active {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05) !important;
  transform: scale(1.02);
}

.success-message-col {
  min-height: 200px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.success-message-text {
  margin: 0 auto;
  max-width: 80%;
  word-break: break-word;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 24px 0;
}

.btn-white-background {
  transition: 0.25s;
  border-radius: 32px !important;
  text-transform: none !important;
  font-size: clamp(0.875rem, 0.6rem + 1vw, 1.125rem);
  font-weight: 400;

  padding: 16px 32px !important;
  height: clamp(48px, 5vw, 56px) !important;
  line-height: 1 !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  width: clamp(160px, fit-content(50%), 300px) !important;

  border: 2px solid white !important;
  background-color: white !important;
  color: black !important;
}

.btn-white-background:hover {
  background-color: #646464 !important;
  color: white !important;
}
</style>
