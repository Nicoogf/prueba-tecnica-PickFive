<template>
  <div class="w-[95%] mx-auto max-w-[1440px]">
    <h1 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
      <span>🎧</span> Tu Top 5
    </h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <!-- Juegos del Top 5 -->
      <draggable
        v-model="store.list"
        item-key="id"
        tag="div"
        class="contents"
        @end="persistOrder"
      >
        <template #item="{ element, index }">
          <div
            :key="element.id"
            class="group aspect-square rounded-lg p-4 flex flex-col justify-between transition duration-300 relative overflow-hidden"
            :class="isDark ? 'bg-[#1d1d1d] text-white' : 'bg-[#e8ecf6] text-black'"
          >
            <!-- Imagen + botón -->
            <div class="relative w-full h-full rounded overflow-hidden mb-3">
              <img
                :src="element.background_image"
                :alt="element.name"
                class="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105"
                @error="handleImgError"
              />

              <!-- Botón eliminar -->
              <button
                @click.stop="handleRemove(element.id)"
                class="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:scale-105 shadow-md"
              >
                🗑️
              </button>
            </div>

            <!-- Info del juego -->
            <h2 class="text-sm font-semibold line-clamp-2">{{ element.name }}</h2>
            <p class="text-xs text-gray-400 mt-1">🎖 Puesto número {{ index + 1 }}</p>
          </div>
        </template>
      </draggable>

      <!-- Slots vacíos -->
      <div
        v-for="i in emptySlots"
        :key="'empty-' + i"
        class="aspect-square flex flex-col items-center justify-center rounded-lg border border-dashed text-center transition"
        :class="isDark ? 'bg-[#131313] text-gray-500 border-gray-600' : 'bg-[#f5f5f5] text-gray-700 border-gray-300'"
      >
        <p class="text-sm font-semibold mb-1">Puesto número {{ store.list.length + i }}</p>
        <p class="text-xs">Te queda {{ emptySlots }} {{ emptySlots > 1 ? 'lugares' : 'lugar' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import { useTopFive } from '../stores/useTopFive'
import { useTheme } from '../stores/useTheme'

const store = useTopFive()
const { isDark } = useTheme()

const removingIds = ref([])

const emptySlots = computed(() => 5 - store.list.length)

function persistOrder() {
  localStorage.setItem('top5Games', JSON.stringify(store.list))
}

function handleImgError(event) {
  event.target.src = 'https://via.placeholder.com/300x300?text=No+image'
}

function handleRemove(id) {
  removingIds.value.push(id)
  setTimeout(() => {
    store.remove(id)
    removingIds.value = removingIds.value.filter(rid => rid !== id)
  }, 300)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
