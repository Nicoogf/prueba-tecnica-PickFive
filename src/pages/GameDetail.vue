<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <h1 class="text-3xl font-bold mb-4">{{ game.name }}</h1>

      <div class="mb-4">
        <img :src="game.background_image" :alt="game.name" class="rounded w-full" />
      </div>

      <p class="mb-2">Rating: {{ game.rating }}/5</p>
      <p class="mb-2">Géneros: {{ game.genres.map(g => g.name).join(', ') }}</p>
      <p class="mb-2">Plataformas: {{ game.platforms.map(p => p.platform.name).join(', ') }}</p>

      <button
        @click="handleAddToTopFive"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Agregar a Top 5
      </button>

      <div v-if="added" class="text-green-600 mt-2">
        ¡Agregado al Top 5!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchGameDetails } from '../utils/api'
import { addToTopFive } from '../utils/topFive'

const route = useRoute()
const game = ref(null)
const loading = ref(true)
const error = ref(null)
const added = ref(false)

onMounted(async () => {
  try {
    const data = await fetchGameDetails(route.params.id)
    game.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

function handleAddToTopFive() {
  addToTopFive({
    id: game.value.id,
    name: game.value.name,
    background_image: game.value.background_image,
  })
  added.value = true
}
</script>
