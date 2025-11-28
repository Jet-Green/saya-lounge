export const useRole = () => {

  const isAdmin = computed(() => {
    const authStore = useAuth()

    if (!authStore.user.value) {
      return false;
    }

    const hasAdminRole = authStore.user.value?.roles.includes('admin');
    if (hasAdminRole) {
      return true;
    }
    return false;
  });


  return {
    isAdmin
  };
};