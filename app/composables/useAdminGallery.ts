export const useAdminGallery = () => {
  const { 
    uploading, 
    uploadedCount, 
    totalFiles, 
    successMessage, 
    uploadFiles, 
    items: galleryItems, 
    loading: galleryLoading, 
    error: galleryError, 
    fetchItems: fetchGallery, 
    deleteItem: deleteGalleryItem,
    moveItem: moveGalleryItem,
    deletingKey,
    movingKey
  } = useAdminPhotos('gallery')

  return {
    uploading,
    uploadedCount,
    totalFiles,
    successMessage,
    uploadFiles,
    galleryItems,
    galleryLoading,
    galleryError,
    fetchGallery,
    deleteGalleryItem,
    moveGalleryItem,
    deletingKey,
    movingKey,
  }
}
