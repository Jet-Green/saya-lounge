import { toast } from "vue3-toastify"
import type { ICocktail } from "~/types/ICocktail.interface"

export function useAiDialog() {
  const strengthOptions = ["лёгкий / освежающий", "средней крепости", "крепкий"]
  const tasteOptions = ["сладкий / фруктовый", "кисло-сладкий", "горьковатый / терпкий"]
  const moodOptions = ["лёгкий вечер, прогулка, аперитив", "ярко, празднично, эффектно", "классика, глубина, характер"]


  let resultCocktails = useState<ICocktail[]>(() => [])
  let dialog = useState<boolean>(() => false)

  // preview, select, result
  let step = useState<string>(() => "preview")

  function nextStep(s: string) {
    step.value = s;
  }

  function closeDialog() {
    dialog.value = false

    if (step.value == "result") {
      step.value = 'preview'
    }
  }

  async function askAi(
    strength: number | null,
    taste: number | null,
    mood: number | null) {
    if (strength === null || taste === null || mood === null) return
    try {
      const prompt = `
        Крепость: ${strengthOptions[strength]}
        Вкус: ${tasteOptions[taste]}
        Настроение: ${moodOptions[mood]}
`.trim()

      let res = await $fetch<ICocktail[]>("/api/gigachat", {
        method: "POST",
        body: { prompt }
      })

      resultCocktails.value = res

      nextStep("result")
    } catch (error) {
      toast.error("Ошибка при запросе")
    }
  }

  return {
    // constants
    strengthOptions, tasteOptions, moodOptions,
    // vars
    dialog, step, resultCocktails,
    // functions
    nextStep, closeDialog, askAi
  }
}