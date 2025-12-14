<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
})

const { uploading, uploadedCount, totalFiles, successMessage, uploadFiles, galleryItems, galleryLoading, galleryError, fetchGallery, deleteGalleryItem, deletingKey } = useAdminGallery()

onMounted(fetchGallery)

watch(
  () => uploading.value,
  (newVal, oldVal) => {
    if (oldVal && !newVal) {
      fetchGallery()
    }
  }
)
</script>

<template>
  <AdminPhotoUpload
    title="Галерея"
    :uploading="uploading"
    :uploaded-count="uploadedCount"
    :total-files="totalFiles"
    :success-message="successMessage"
    :items="galleryItems"
    :loading="galleryLoading"
    :error="galleryError"
    :deleting-key="deletingKey"
    @upload="uploadFiles"
    @delete="deleteGalleryItem"
  />
</template>
