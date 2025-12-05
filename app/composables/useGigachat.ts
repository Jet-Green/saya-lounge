import { ref } from 'vue'
import type { ICocktail } from '~/types/ICocktail.interface'

export function useGigachat() {
  const response = ref<ICocktail[]>([])
  const loading = ref(false)
  const error = ref('')

  async function sendRequest(prompt: string): Promise<void> {
    if (!prompt) return

    loading.value = true
    error.value = ''
    response.value = []

    try {
      const res: ICocktail[] = await $fetch('/api/gigachat', {
        method: 'POST',
        body: { prompt }
      })

      response.value = res
    } catch (err: any) {
      error.value = err?.data?.error || err.message || 'Ошибка запроса'
    } finally {
      loading.value = false
    }
  }

  function clearResponse() {
    response.value = []
    error.value = ''
  }

  return {
    response,
    loading,
    error,
    sendRequest,
    clearResponse
  }
}
