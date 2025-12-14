<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
})

const { uploading, uploadedCount, totalFiles, successMessage, uploadFiles, menuItems, menuLoading, menuError, fetchMenu, deleteMenuItem, deletingKey } = useAdminMenu()

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
    description="Формат названия файла: номер.описание.расширение. Примеры: 1.основное блюдо.jpg, 2.напиток.png"
    :uploading="uploading"
    :uploaded-count="uploadedCount"
    :total-files="totalFiles"
    :success-message="successMessage"
    :items="menuItems"
    :loading="menuLoading"
    :error="menuError"
    :deleting-key="deletingKey"
    @upload="uploadFiles"
    @delete="deleteMenuItem"
  />

  
</template>
