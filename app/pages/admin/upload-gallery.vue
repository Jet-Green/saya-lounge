<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
})



const { uploading, uploadedCount, totalFiles, successMessage, uploadFiles, galleryItems, galleryLoading, galleryError, fetchGallery, deleteGalleryItem, deletingKey } = useAdminGallery()

onMounted(fetchGallery)

// Автоматическое обновление галерии после загрузки файлов
watch(
  () => uploading.value,
  (newVal, oldVal) => {
    if (oldVal && !newVal) {
      fetchGallery()
    }
  }
)

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

const deleteDialogOpen = ref(false)
const deleteDialogKey = ref<string | null>(null)

const openDeleteDialog = (key: string) => {
  deleteDialogKey.value = key
  deleteDialogOpen.value = true
}

const cancelDelete = () => {
  deleteDialogOpen.value = false
  deleteDialogKey.value = null
}

const confirmDelete = async () => {
  if (!deleteDialogKey.value) return
  await deleteGalleryItem(deleteDialogKey.value)
  deleteDialogOpen.value = false
  deleteDialogKey.value = null
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
    <v-row class="mt-8">
      <v-col cols="12">
        <h2 class="mb-4 text-center py-4">Галерея</h2>
        <v-alert v-if="galleryError" type="error" class="mb-4">{{ galleryError }}</v-alert>
        <v-progress-linear v-if="galleryLoading" indeterminate color="primary" class="mb-4"/>
        <v-row v-if="galleryItems.length > 0" dense justify="center" class="gallery-row">
          <v-col v-for="item in galleryItems" :key="item.key" cols="6" sm="4" md="3" lg="2" class="mb-4">
            <v-img :src="item.url" :alt="item.key" aspect-ratio="1" class="gallery-img" cover draggable="false" lazy/>
            <v-btn class="mt-2 btn-danger-background" block :loading="deletingKey === item.key" :disabled="deletingKey === item.key" @click="openDeleteDialog(item.key)">
              Удалить
            </v-btn>
          </v-col>
        </v-row>
        <div v-else-if="!galleryLoading && !galleryError" class="text-center text-grey">Нет изображений в галерее</div>
      </v-col>
    </v-row>

    <v-dialog v-model="deleteDialogOpen" max-width="420">
      <v-card>
        <v-card-title class="text-center">Удалить фото?</v-card-title>
        <v-card-actions class="pa-4 d-flex justify-space-between">
          <v-btn variant="flat" color="white" class="btn-cancel" @click="cancelDelete" :disabled="!!deletingKey">Отмена</v-btn>
          <v-btn color="error" variant="flat" @click="confirmDelete" :loading="!!deletingKey" :disabled="!!deletingKey">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

.btn-danger-background {
  transition: 0.25s;
  border-radius: 28px !important;
  text-transform: none !important;
  font-size: clamp(0.9rem, 0.65rem + 0.8vw, 1rem);
  font-weight: 600;

  padding: 12px 20px !important;
  min-height: 44px;

  border: 2px solid #d32f2f !important;
  background-color: #fff !important;
  color: #d32f2f !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
}

.btn-danger-background:hover {
  background-color: #d32f2f !important;
  color: #fff !important;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12) !important;
}

.btn-cancel {
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  color: #555 !important;
  background-color: #fff !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06) !important;
}

.btn-cancel:hover {
  background-color: #f3f3f3 !important;
  color: #222 !important;
}

.gallery-row {
  column-gap: 12px;
  justify-content: center;
}
</style>

.gallery-img {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s;
  max-width: 140px;
  margin-left: auto;
  margin-right: auto;
}
.gallery-img:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.18);
}
