<script setup lang="ts">
const prompt = ref('')
const response = ref('')
const loading = ref(false)
const error = ref('')

const preferences = ref({
  strength: [] as string[],
  taste: [] as string[],
  volume: [] as string[],
  price: [] as string[]
})

const options = {
  strength: ['крепкие', 'средние', 'низкие', 'безалкогольные'],
  taste: ['кислые', 'цитрус', 'фруктовые', 'ягодные', 'сладкие', 'десертные', 'горькие', 'травяные', 'свежие', 'пряные', 'дымные', 'медовые', 'ореховые', 'кофейные', 'чайные'],
  volume: ['короткие 30–60 мл', 'коктейли до 200 мл', 'лонгдринки 350–400 мл'],
  price: ['доступные', 'средние', 'премиум']
}

function buildPrompt() {
  const parts = []
  
  if (preferences.value.strength.length) parts.push(`Крепость: ${preferences.value.strength.join(', ')}`)
  if (preferences.value.taste.length) parts.push(`Вкус: ${preferences.value.taste.join(', ')}`)
  if (preferences.value.volume.length) parts.push(`Объём: ${preferences.value.volume.join(', ')}`)
  if (preferences.value.price.length) parts.push(`Цена: ${preferences.value.price.join(', ')}`)
  
  if (prompt.value.trim()) parts.push(prompt.value.trim())
  
  return parts.join('. ')
}

async function testGigachat() {
  const finalPrompt = buildPrompt()
  if (!finalPrompt) return
  
  loading.value = true
  error.value = ''
  response.value = ''
  
  try {
    const res: any = await $fetch('/api/gigachat', {
      method: 'POST',
      body: { prompt: finalPrompt }
    })
    
    response.value = res?.choices?.[0]?.message?.content || JSON.stringify(res, null, 2)
  } catch (err: any) {
    error.value = err?.data?.error || err.message || 'Ошибка запроса'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-sheet rounded="lg" class="pa-6">
          <h1 class="text-h4 mb-6">Подбор коктейля</h1>
          
          <div class="mb-6">
            <h3 class="text-h6 mb-3">Крепость / тип алкоголя</h3>
            <v-chip-group
              v-model="preferences.strength"
              multiple
              column
            >
              <v-chip
                v-for="option in options.strength"
                :key="option"
                :value="option"
                filter
                variant="outlined"
              >
                {{ option }}
              </v-chip>
            </v-chip-group>
          </div>
          
          <div class="mb-6">
            <h3 class="text-h6 mb-3">Вкус / аромат</h3>
            <v-chip-group
              v-model="preferences.taste"
              multiple
              column
            >
              <v-chip
                v-for="option in options.taste"
                :key="option"
                :value="option"
                filter
                variant="outlined"
              >
                {{ option }}
              </v-chip>
            </v-chip-group>
          </div>
          
          <div class="mb-6">
            <h3 class="text-h6 mb-3">Объём / подача</h3>
            <v-chip-group
              v-model="preferences.volume"
              multiple
              column
            >
              <v-chip
                v-for="option in options.volume"
                :key="option"
                :value="option"
                filter
                variant="outlined"
              >
                {{ option }}
              </v-chip>
            </v-chip-group>
          </div>
          
          <div class="mb-6">
            <h3 class="text-h6 mb-3">Цена</h3>
            <v-chip-group
              v-model="preferences.price"
              multiple
              column
            >
              <v-chip
                v-for="option in options.price"
                :key="option"
                :value="option"
                filter
                variant="outlined"
              >
                {{ option }}
              </v-chip>
            </v-chip-group>
          </div>
          
          <v-textarea
            v-model="prompt"
            label="Дополнительные пожелания (необязательно)"
            rows="2"
            variant="outlined"
            maxlength="100"
            counter
            class="mb-4"
          />
          
          <v-btn
            color="primary"
            :loading="loading"
            @click="testGigachat"
            block
            size="large"
          >
            Подобрать коктейль
          </v-btn>
          
          <v-alert
            v-if="error"
            type="error"
            class="mt-4"
          >
            {{ error }}
          </v-alert>
          
          <v-sheet
            v-if="response"
            color="grey-lighten-4"
            rounded="lg"
            class="pa-4 mt-4"
          >
            <div class="text-body-1">{{ response }}</div>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
