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
        class="bg-white dark:bg-gray-800 p-4 rounded shadow"
      >
        <img :src="game.image" :alt="game.name" class="rounded mb-2 w-full h-32 object-cover" />
        <p class="font-semibold">{{ game.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTopFive } from '../utils/topFive'
import { ref, onMounted } from 'vue'

const topFive = ref([])

onMounted(() => {
  topFive.value = getTopFive()
})
</script>
