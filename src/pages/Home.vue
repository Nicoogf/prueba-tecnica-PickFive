<template>
<div v-if="initialLoading">Cargando...</div>
<div v-else-if="error" class="text-red-500">{{ error }}</div>
<div v-else>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div 
      v-for="game in games" 
      :key="game.id" 
      class="bg-white shadow p-4 rounded"
    >
      <img 
        :src="game.background_image" 
        :alt="game.name" 
        class="mb-2 rounded w-full h-40 object-cover"
      />
      <h2 class="font-semibold text-lg">{{ game.name }}</h2>
    </div>
  </div>

  <div ref="sentinel" class="h-10 mt-4 flex justify-center">
    <div v-if="isFetchingMore" class="text-sm text-gray-500">Cargando más juegos...</div>
  </div>
</div>


</template>

<script setup>
import { ref, onMounted, watch ,nextTick } from 'vue'
import { fetchPopularGames } from '../utils/api'

const games = ref([])
const error = ref(null)
const page = ref(1)
const sentinel = ref(null)

const initialLoading = ref(true)
const isFetchingMore = ref(false)

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

  await nextTick() // Esperamos a que el DOM esté completamente montado

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