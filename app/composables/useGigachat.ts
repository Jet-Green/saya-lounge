import { ref } from 'vue'

export function useGigachat() {
  const response = ref('')
  const loading = ref(false)
  const error = ref('')

  async function sendRequest(prompt: string): Promise<void> {
    if (!prompt) return

    loading.value = true
    error.value = ''
    response.value = ''

    try {
      const res: any = await $fetch('/api/gigachat', {
        method: 'POST',
        body: { prompt }
      })

      response.value = res?.choices?.[0]?.message?.content || JSON.stringify(res, null, 2)
    } catch (err: any) {
      error.value = err?.data?.error || err.message || 'Ошибка запроса'
    } finally {
      loading.value = false
    }
  }

  function clearResponse() {
    response.value = ''
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
