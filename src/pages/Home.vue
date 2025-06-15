<template>
  <div v-if="initialLoading">Cargando...</div>
  <div v-else-if="error" class="text-red-500">{{ error }}</div>
  <div v-else>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="game in games" :key="game.id" class="bg-white p-4 rounded shadow relative">
        <router-link :to="`/game/${game.id}`">
          <div class="hover:shadow-lg transition">
            <img :src="game.background_image" :alt="game.name" class="mb-2 rounded w-full h-40 object-cover" />
            <h2 class="font-semibold text-lg">{{ game.name }}</h2>
          </div>
        </router-link>

        <button
          @click.stop="toggleTopFive(game)"
          :disabled="store.list.length >= 5 && !isInTopFive(game.id)"
          class="mt-2 text-sm px-3 py-1 rounded w-full transition
                 text-white
                 hover:bg-blue-700
                 bg-blue-600
                 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isInTopFive(game.id) ? 'Sacar de la lista' : 'Agregar al Top 5' }}
        </button>
      </div>
    </div>

    <div ref="sentinel" class="h-10 mt-4 flex justify-center">
      <div v-if="isFetchingMore" class="text-sm text-gray-500">Cargando más juegos...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { fetchPopularGames } from '../utils/api'
import { useTopFive } from '../stores/useTopFive'

const store = useTopFive()

const games = ref([])
const error = ref(null)
const page = ref(1)
const sentinel = ref(null)

const initialLoading = ref(true)
const isFetchingMore = ref(false)

function isInTopFive(id) {
  return store.list.some((g) => g.id === id)
}

function toggleTopFive(game) {
  if (isInTopFive(game.id)) {
    store.remove(game.id)
  } else if (store.list.length < 5) {
    store.add({
      id: game.id,
      name: game.name,
      background_image: game.background_image
    })
  }
}

async function loadGames() {
  if (page.value === 1) {
    initialLoading.value = true
  } else {
    isFetchingMore.value = true
  }

  try {
    const newGames = await fetchPopularGames(page.value)
    games.value.push(...newGames)
  } catch (err) {
    error.value = err.message
  } finally {
    initialLoading.value = false
    isFetchingMore.value = false
  }
}

onMounted(async () => {
  await loadGames()

  await nextTick()
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting && !isFetchingMore.value) {
      page.value++
    }
  })

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
})

watch(page, () => {
  if (page.value > 1) loadGames()
})
</script>
