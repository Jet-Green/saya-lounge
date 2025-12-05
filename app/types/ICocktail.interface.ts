export interface ICocktail {
  _id: number
  category: string
  name: string
  price: number | string // число для простых цен, строка для вилок («860 / 640»)
  volume: string
  type: string
  alcohol?: number | string // число для %, строка для диапазонов («4.5–5», «~5»)
  description: string
  tier: string
  strength?: string // только для коктейлей («средняя крепость», «крепкий» и т.д.)
}