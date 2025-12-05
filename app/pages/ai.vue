<script setup lang="ts">
const prompt = ref('')

const { preferences, options, buildPrompt } = useCocktailSelector()
const { response, loading, error, sendRequest } = useGigachat()

async function testGigachat() {
  const finalPrompt = buildPrompt(prompt.value)
  await sendRequest(finalPrompt)
}
</script>

<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center pa-8">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" class="mb-6">
            <h1 class="text-h4">Подбор коктейля</h1>
          </v-col>

          <v-col cols="12" class="mb-6">
            <v-row>
              <v-col cols="12" class="mb-3">
                <h2>Крепость / тип алкоголя</h2>
              </v-col>
              <v-col cols="12">
                <v-chip-group v-model="preferences.strength" multiple column>
                  <v-chip v-for="option in options.strength" :key="option" :value="option" filter variant="outlined"
                    size="large">
                    {{ option }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" class="mb-6">
            <v-row>
              <v-col cols="12" class="mb-3">
                <h2>Вкус / аромат</h2>
              </v-col>
              <v-col cols="12">
                <v-chip-group v-model="preferences.taste" multiple column>
                  <v-chip v-for="option in options.taste" :key="option" :value="option" filter variant="outlined"
                    size="large">
                    {{ option }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" class="mb-6">
            <v-row>
              <v-col cols="12" class="mb-3">
                <h2>Объём / подача</h2>
              </v-col>
              <v-col cols="12">
                <v-chip-group v-model="preferences.volume" multiple column>
                  <v-chip v-for="option in options.volume" :key="option" :value="option" filter variant="outlined"
                    size="large">
                    {{ option }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" class="mb-6">
            <v-row>
              <v-col cols="12" class="mb-3">
                <h2>Цена</h2>
              </v-col>
              <v-col cols="12">
                <v-chip-group v-model="preferences.price" multiple column>
                  <v-chip v-for="option in options.price" :key="option" :value="option" filter variant="outlined"
                    size="large">
                    {{ option }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" class="mb-4">
            <v-textarea v-model="prompt" label="Дополнительные пожелания (необязательно)" rows="2" variant="outlined"
              maxlength="100" counter />
          </v-col>

          <v-col cols="12">
            <v-btn color="primary" :loading="loading" @click="testGigachat" block size="large">
              Подобрать коктейль
            </v-btn>
          </v-col>

          <v-col v-if="error" cols="12" class="mt-4">
            <v-alert type="error">
              {{ error }}
            </v-alert>
          </v-col>

          <v-col v-for="(cocktail, index) of response" :key="index" cols="12" class="mt-4">
            <CocktailCard :cocktail="cocktail" />
            <!-- <v-sheet color="grey-lighten-4" rounded="lg" class="pa-4">
              <v-row>
                <v-col cols="12">
                  <h2 class="text-body-1">{{ response }}</h2>
                </v-col>
              </v-row>
            </v-sheet> -->
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-row>
</template>
