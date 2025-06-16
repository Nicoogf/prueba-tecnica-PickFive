<template>
  <div class="w-[95%] mx-auto max-w-4xl py-8 text-sm" :class="isDark ? 'text-gray-300' : 'text-[#1f2937]'">
    <BackButton @back="router.push('/')" />

    <div v-if="loading">
      <LoadingSpinner />
    </div>

    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <div v-else class="flex flex-col gap-6">
      <h1 class="text-3xl font-bold leading-tight" :class="isDark ? 'text-white' : 'text-black'">
        {{ game.name }}
      </h1>

      <div class="rounded-lg overflow-hidden shadow-md">
        <img :src="game.background_image" :alt="game.name"
          class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" />
      </div>

      <GameInfoGrid
        :platforms="game.platforms.map(p => p.platform.name).join(', ')"
        :genres="game.genres.map(g => g.name).join(', ')"
        :rating="game.rating"
        :released="game.released || 'No disponible'"
      />

      <GameDescription :description="game.description_raw" />

      <TopFiveButton
        :is-in-top-five="isInTopFive(game.id)"
        :feedback-msg="feedbackMsg"
        @toggle="toggleTopFive"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted ,onBeforeUnmount  } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchGameDetails } from '../utils/api'
import {
  addToTopFive,
  removeFromTopFive,
  isInTopFive as checkInTopFive,
  getTopFive
} from '../utils/topFive'
import { useTheme } from '../stores/theme'
import LoadingSpinner from "../components/LoadingSpinner.vue"

import BackButton from '../components/BackButton.vue'
import GameInfoGrid from '../components/GameInfoGrid.vue'
import GameDescription from '../components/GameDescription.vue'
import TopFiveButton from '../components/TopFiveButton.vue'

const { isDark } = useTheme()
const route = useRoute()
const router = useRouter()

const game = ref(null)
const loading = ref(true)
const error = ref(null)
const feedbackMsg = ref('')
const topFive = ref(getTopFive())
const sentinel = ref(null)
let observer 

onBeforeUnmount(() => {
  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value)
    observer.disconnect()
  }
})


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
