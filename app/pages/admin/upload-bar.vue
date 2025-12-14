<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
})

const { uploading, uploadedCount, totalFiles, successMessage, uploadFiles, barItems, barLoading, barError, fetchBar, deleteBarItem, deletingKey } = useAdminBar()

onMounted(fetchBar)

watch(
  () => uploading.value,
  (newVal, oldVal) => {
    if (oldVal && !newVal) {
      fetchBar()
    }
  }
)
</script>

<template>
  <AdminPhotoUpload
    title="Фотографии бара"
    description="Формат названия файла: номер.описание.расширение. Примеры: 1.интерьер.jpg, 2.коктейль.png"
    :uploading="uploading"
    :uploaded-count="uploadedCount"
    :total-files="totalFiles"
    :success-message="successMessage"
    :items="barItems"
    :loading="barLoading"
    :error="barError"
    :deleting-key="deletingKey"
    @upload="uploadFiles"
    @delete="deleteBarItem"
  />
  
</template>
