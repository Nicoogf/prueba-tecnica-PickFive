<template>
  <div class="p-6 max-w-4xl mx-auto">
    <button
      @click="$router.push('/')"
      class="mb-4 text-blue-600 underline"
    >
      ← Volver al inicio
    </button>

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
        @click="toggleTopFive"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {{ isInTopFive(game.id) ? 'Sacar del Top 5' : 'Agregar al Top 5' }}
      </button>

      <div v-if="feedbackMsg" class="mt-2 text-green-600">
        {{ feedbackMsg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchGameDetails } from '../utils/api'
import {
  addToTopFive,
  removeFromTopFive,
  isInTopFive as checkInTopFive,
  getTopFive
} from '../utils/topFive'

const route = useRoute()
const router = useRouter()

const game = ref(null)
const loading = ref(true)
const error = ref(null)
const feedbackMsg = ref('')
const topFive = ref(getTopFive())

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

function isInTopFive(id) {
  return topFive.value.some((g) => g.id === id)
}

function toggleTopFive() {
  if (!game.value) return

  if (isInTopFive(game.value.id)) {
    topFive.value = removeFromTopFive(game.value.id)
    feedbackMsg.value = 'Juego eliminado del Top 5'
  } else {
    topFive.value = addToTopFive({
      id: game.value.id,
      name: game.value.name,
      background_image: game.value.background_image,
    })
    feedbackMsg.value = '¡Agregado al Top 5!'
  }

  setTimeout(() => feedbackMsg.value = '', 2000)
}
</script>