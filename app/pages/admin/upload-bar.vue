<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "admin"
})

const { uploading, uploadedCount, totalFiles, successMessage, uploadFiles, barItems, barLoading, barError, fetchBar, deleteBarItem, moveBarItem, deletingKey, movingKey } = useAdminBar()

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
    description=""
    :uploading="uploading"
    :uploaded-count="uploadedCount"
    :total-files="totalFiles"
    :success-message="successMessage"
    :items="barItems"
    :loading="barLoading"
    :error="barError"
    :deleting-key="deletingKey"
    :moving-key="movingKey"
    @upload="uploadFiles"
    @delete="deleteBarItem"
    @move="moveBarItem"
  />
  
</template>
