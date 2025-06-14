<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">🎯 Tu Top 5</h1>

    <div v-if="topFive.length === 0" class="text-gray-500">
      Aún no elegiste ningún juego.
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        v-for="game in topFive"
        :key="game.id"
        class="rounded shadow p-4"
        :style="{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
        }"
      >
        <img
          :src="game.background_image"
          :alt="game.name"
          class="rounded mb-2 w-full h-32 object-cover"
          @error="handleImgError"
        />
        <p class="font-semibold text-center text-sm md:text-base">{{ game.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTopFive } from '../utils/topFive'
import { ref, onMounted } from 'vue'

const topFive = ref([])
const isDark = ref(localStorage.getItem('theme') === 'dark')

onMounted(() => {
  topFive.value = getTopFive()
})

function handleImgError(event) {
  event.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible'
}
</script>