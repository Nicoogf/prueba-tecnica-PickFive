<template>

  <div v-if="initialLoading">
    <LoadingSpinner />
  </div>

  <div v-else-if="error" class="text-red-500">{{ error }}</div>

  <div v-else>
    <div class="w-[95%] p-2 rounded-2xl mx-auto max-w-[1440px] grid grid-cols-12 gap-4">
      <GameCard v-for="game in games" :key="game.id" :game="game" :is-dark="isDark"
        :disabled="store.list.length >= 5 && !isInTopFive(game.id)" :is-in-top-five="isInTopFive"
        @toggle="toggleTopFive" />
    </div>

    <div ref="sentinel" class="h-10 mt-4 flex justify-center">

      <div v-if="isFetchingMore">
        <LoadingSpinner />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { fetchPopularGames } from '../utils/api'
import { useTopFive } from '../stores/topFive'
import { useTheme } from '../stores/theme'
import GameCard from '../components/GameCard.vue'
import LoadingSpinner from "../components/LoadingSpinner.vue"

const theme = useTheme()
const isDark = computed(() => theme.isDark)

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
