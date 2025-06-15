<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">🎯 Tu Top 5</h1>

    <draggable v-model="topFive" item-key="id" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      @end="persistOrder">
      <template #item="{ element, index }">
        <div class="rounded shadow p-4" :style="{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#f3f4f6' : '#1f2937',
        }">
          <div class="text-sm font-bold mb-2 text-center">
            Puesto número {{ index + 1 }}
          </div>

          <img :src="element.background_image" :alt="element.name" class="rounded mb-2 w-full h-32 object-cover"
            @error="handleImgError" />
          <p class="font-semibold text-center text-sm md:text-base">
            {{ element.name }}
          </p>

         <button @click="handleRemove(element.id)"
            class="mt-2 w-full text-sm bg-red-600 text-white rounded px-2 py-1 hover:bg-red-700 transition">
            Quitar del Top 5
          </button>
        </div>
      </template>
    </draggable>

    <!-- Slots vacíos -->
    <div v-for="i in emptySlots" :key="'empty-' + i"
      class="rounded shadow p-4 text-center text-sm text-gray-500 border border-dashed"
      :style="{ backgroundColor: isDark ? '#1f2937' : '#ffffff' }">
      <div class="font-bold mb-2">Puesto número {{ topFive.length + i }}</div>
      Te queda {{ emptySlots }} {{ emptySlots > 1 ? 'lugares' : 'lugar' }} disponible.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import draggable from 'vuedraggable'
import { getTopFive, removeFromTopFive } from '../utils/topFive'

const topFive = ref([])
const isDark = ref(localStorage.getItem('theme') === 'dark')

onMounted(() => {
  topFive.value = getTopFive()
})

const emptySlots = computed(() => 5 - topFive.value.length)

function persistOrder() {
  localStorage.setItem('top5Games', JSON.stringify(topFive.value))
}

function handleImgError(event) {
  event.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible'
}

function handleRemove(id) {
  topFive.value = removeFromTopFive(id)
}




</script>
