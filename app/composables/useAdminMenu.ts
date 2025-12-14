export const useAdminMenu = () => {
  const { 
    uploading, 
    uploadedCount, 
    totalFiles, 
    successMessage, 
    uploadFiles, 
    items: menuItems, 
    loading: menuLoading, 
    error: menuError, 
    fetchItems: fetchMenu, 
    deleteItem: deleteMenuItem, 
    deletingKey 
  } = useAdminPhotos('menu')

  return {
    uploading,
    uploadedCount,
    totalFiles,
    successMessage,
    uploadFiles,
    menuItems,
    menuLoading,
    menuError,
    fetchMenu,
    deleteMenuItem,
    deletingKey,
  }
}
