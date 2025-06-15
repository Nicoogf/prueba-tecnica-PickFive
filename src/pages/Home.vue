<template>
  <div v-if="initialLoading" class="flex justify-center items-center py-12">
    <div class="w-10 h-10 border-4 border-[#1ED760] border-t-transparent rounded-full animate-spin"></div>
  </div>

  <div v-else-if="error" class="text-red-500">{{ error }}</div>

  <div v-else class="">
    <div class="w-[95%] p-2 rounded-2xl mx-auto max-w-[1440px] grid grid-cols-12 gap-4">
      <div
  v-for="game in games"
  :key="game.id"
  class="relative group w-full aspect-square p-3 rounded-lg transition-all duration-300 overflow-hidden col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 pb-4"
  :class="[
    isInTopFive(game.id)
      ? (isDark ? 'bg-[#242424] text-white' : 'bg-[#d5d9e3] text-[#1f2937]')
      : (isDark ? 'bg-transparent text-white' : 'bg-[#e8ecf6] text-[#1f2937]')
  ]"
>
  <!-- Imagen -->
  <router-link :to="`/game/${game.id}`">
    <div class="relative w-full h-[70%] rounded-lg overflow-hidden">
      <img
        :src="game.background_image"
        :alt="game.name"
        class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
      />
      <!-- Botón en hover -->
      <button
        @click.stop.prevent="toggleTopFive(game)"
        :disabled="store.list.length >= 5 && !isInTopFive(game.id)"
        class="cursor-pointer absolute bottom-2 right-2 h-[45px] w-[45px] rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0 flex items-center justify-center"
        :class="isInTopFive(game.id) ? 'bg-white text-black' : 'bg-[#1DB954] text-white'"
      >
        <component :is="isInTopFive(game.id) ? Trash2 : CirclePlus" class="w-5 h-5" />
      </button>
    </div>
  </router-link>

  <!-- Nombre -->
  <h2 class="mt-3 text-xs font-semibold line-clamp-2 leading-tight">
    {{ game.name }}
  </h2>

  <!-- Extra info opcional -->
  <p class="text-xs mt-1 opacity-70">
    Rating: {{ game.rating }}
  </p>
</div>


    </div>

    <div ref="sentinel" class="h-10 mt-4 flex justify-center">
      <div v-if="isFetchingMore" class="flex justify-center items-center py-12">
        <div class="w-10 h-10 border-4 border-[#1ED760] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { fetchPopularGames } from '../utils/api'
import { useTopFive } from '../stores/useTopFive'
import { useTheme } from '../stores/useTheme'
import { CirclePlus, Trash2 } from 'lucide-vue-next'

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

function cardClass(id) {
  return {
    'bg-[#242424] text-white': isDark.value && isInTopFive(id),
    'bg-transparent text-white': isDark.value && !isInTopFive(id),
    'bg-[#d5d9e3] text-[#1f2937]': !isDark.value && isInTopFive(id),
    'bg-[#e8ecf6] text-[#1f2937]': !isDark.value && !isInTopFive(id)
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

function getCardClasses(id) {
  const base = [
    'rounded-lg',
    'transition-all',
    'duration-300',
    'overflow-hidden',
  ]

  if (isDark.value) {
    return [
      ...base,
      isInTopFive(id) ? 'bg-[#242424] text-white' : 'bg-transparent text-white'
    ]
  } else {
    return [
      ...base,
      isInTopFive(id) ? 'bg-[#d5d9e3] text-[#1f2937]' : 'bg-[#e8ecf6] text-[#1f2937]'
    ]
  }
}



</script>

<style>
.bground-gradient {
  background: #2b2b2b;
  background: linear-gradient(180deg, rgba(43, 43, 43, 1) 0%, rgba(18, 18, 18, 1) 100%);
}
</style>
