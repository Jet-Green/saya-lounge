<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
})

const { uploading, uploadedCount, totalFiles, successMessage, uploadFiles, menuItems, menuLoading, menuError, fetchMenu, deleteMenuItem, moveMenuItem, deletingKey, movingKey } = useAdminMenu()

onMounted(fetchMenu)

watch(
  () => uploading.value,
  (newVal, oldVal) => {
    if (oldVal && !newVal) {
      fetchMenu()
    }
  }
)
</script>

<template>
  <AdminPhotoUpload
    title="Фотографии меню"
    description=""
    :uploading="uploading"
    :uploaded-count="uploadedCount"
    :total-files="totalFiles"
    :success-message="successMessage"
    :items="menuItems"
    :loading="menuLoading"
    :error="menuError"
    :deleting-key="deletingKey"
    :moving-key="movingKey"
    @upload="uploadFiles"
    @delete="deleteMenuItem"
    @move="moveMenuItem"
  />

  
</template>
