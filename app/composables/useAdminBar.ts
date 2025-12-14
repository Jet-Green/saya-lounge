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
    deletingKey 
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
    deletingKey,
  }
}
