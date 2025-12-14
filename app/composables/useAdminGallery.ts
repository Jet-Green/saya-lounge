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
    deletingKey 
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
    deletingKey,
  }
}
