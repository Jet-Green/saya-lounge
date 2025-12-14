export const useAdminBar = () => {
  const { 
    uploading, 
    uploadedCount, 
    totalFiles, 
    successMessage, 
    uploadFiles, 
    items: barItems, 
    loading: barLoading, 
    error: barError, 
    fetchItems: fetchBar, 
    deleteItem: deleteBarItem,
    moveItem: moveBarItem,
    deletingKey,
    movingKey
  } = useAdminPhotos('bar')

  return {
    uploading,
    uploadedCount,
    totalFiles,
    successMessage,
    uploadFiles,
    barItems,
    barLoading,
    barError,
    fetchBar,
    deleteBarItem,
    moveBarItem,
    deletingKey,
    movingKey,
  }
}
