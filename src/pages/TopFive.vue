<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">🎯 Tu Top 5</h1>

    <TransitionGroup name="fade" tag="div" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <draggable v-model="topFive" item-key="id" @end="persistOrder" tag="div" :component-data="{ class: '' }">
        <template #item="{ element, index }">
          <div :key="element.id" class="rounded shadow p-4 transition-all duration-300"
            :class="{ 'fade-out': removingIds.includes(element.id) }" :style="{
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
              class="mt-3 w-full text-sm bg-red-600 text-white rounded px-2 py-1 hover:bg-red-700 transition">
              Quitar del Top Five
            </button>
          </div>
        </template>
      </draggable>
    </TransitionGroup>

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
const removingIds = ref([])

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
  removingIds.value.push(id)
  setTimeout(() => {
    topFive.value = removeFromTopFive(id)
    removingIds.value = removingIds.value.filter(rid => rid !== id)
  }, 300) // duración de la animación
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-out {
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>
