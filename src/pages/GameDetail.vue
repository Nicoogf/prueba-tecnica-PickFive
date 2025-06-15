<template>
  <div class="w-[95%] mx-auto max-w-4xl py-8 text-sm" :class="isDark ? 'text-gray-300' : 'text-[#1f2937]'">
    <!-- Botón volver -->
    <button
      @click="$router.push('/')"
      class="mb-6 flex items-center gap-2 transition text-sm font-medium"
      :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'"
    >
      ← Volver al inicio
    </button>

    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="w-10 h-10 border-4 border-[#1ED760] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <!-- Contenido principal -->
    <div v-else class="flex flex-col gap-6">
      <!-- Título -->
      <h1 class="text-3xl font-bold leading-tight" :class="isDark ? 'text-white' : 'text-black'">
        {{ game.name }}
      </h1>

      <!-- Imagen principal -->
      <div class="rounded-lg overflow-hidden shadow-md">
        <img
          :src="game.background_image"
          :alt="game.name"
          class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <!-- Info clave -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p class="font-semibold" :class="isDark ? 'text-gray-400' : 'text-gray-500'">🎮 Plataformas</p>
          <p>{{ game.platforms.map(p => p.platform.name).join(', ') }}</p>
        </div>
        <div>
          <p class="font-semibold" :class="isDark ? 'text-gray-400' : 'text-gray-500'">🏷 Géneros</p>
          <p>{{ game.genres.map(g => g.name).join(', ') }}</p>
        </div>
        <div>
          <p class="font-semibold" :class="isDark ? 'text-gray-400' : 'text-gray-500'">⭐ Rating</p>
          <p>{{ game.rating }}/5</p>
        </div>
        <div>
          <p class="font-semibold" :class="isDark ? 'text-gray-400' : 'text-gray-500'">📅 Lanzamiento</p>
          <p>{{ game.released || 'No disponible' }}</p>
        </div>
      </div>

      <!-- Descripción -->
      <div class="leading-relaxed">
        <p v-if="game.description_raw">{{ game.description_raw }}</p>
        <p v-else class="italic" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          Este juego no tiene descripción disponible.
        </p>
      </div>

      <!-- Botón agregar/quitar -->
      <div>
        <button
          @click="toggleTopFive"
          class="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md"
          :class="isInTopFive(game.id) ? 'bg-white text-black' : 'bg-[#1DB954] text-white'"
        >
          {{ isInTopFive(game.id) ? 'Sacar del Top 5' : 'Agregar al Top 5' }}
        </button>

        <!-- Feedback -->
        <p v-if="feedbackMsg" class="mt-2 text-green-400">{{ feedbackMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchGameDetails } from '../utils/api'
import { addToTopFive, removeFromTopFive, isInTopFive as checkInTopFive, getTopFive } from '../utils/topFive'
import { useTheme } from '../stores/useTheme'

const { isDark } = useTheme()

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

  setTimeout(() => (feedbackMsg.value = ''), 2000)
}
</script>