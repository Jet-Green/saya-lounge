import { ref } from 'vue'

export type CocktailPreferences = {
  strength: string[]
  taste: string[]
  volume: string[]
  price: string[]
}

export function useCocktailSelector() {
  const preferences = ref<CocktailPreferences>({
    strength: [],
    taste: [],
    volume: [],
    price: []
  })

  const options = {
    strength: ['крепкие', 'средние', 'низкие', 'безалкогольные'],
    taste: ['кислые', 'цитрус', 'фруктовые', 'ягодные', 'сладкие', 'десертные', 'горькие', 'травяные', 'свежие', 'пряные', 'дымные', 'медовые', 'ореховые', 'кофейные', 'чайные'],
    volume: ['короткие 30–60 мл', 'коктейли до 200 мл', 'лонгдринки 350–400 мл'],
    price: ['доступные', 'средние', 'премиум']
  }

  function buildPrompt(additionalText: string = ''): string {
    const parts: string[] = []
    
    if (preferences.value.strength.length) {
      parts.push(`Крепость: ${preferences.value.strength.join(', ')}`)
    }
    if (preferences.value.taste.length) {
      parts.push(`Вкус: ${preferences.value.taste.join(', ')}`)
    }
    if (preferences.value.volume.length) {
      parts.push(`Объём: ${preferences.value.volume.join(', ')}`)
    }
    if (preferences.value.price.length) {
      parts.push(`Цена: ${preferences.value.price.join(', ')}`)
    }
    
    if (additionalText.trim()) {
      parts.push(additionalText.trim())
    }
    
    return parts.join('. ')
  }

  function resetPreferences() {
    preferences.value = {
      strength: [],
      taste: [],
      volume: [],
      price: []
    }
  }

  return {
    preferences,
    options,
    buildPrompt,
    resetPreferences
  }
}
