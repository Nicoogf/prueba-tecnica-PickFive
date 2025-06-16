<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
    <div>
      <p class="font-semibold" :class="labelClass">🎮 Plataformas</p>
      <p>{{ platforms }}</p>
    </div>
    <div>
      <p class="font-semibold" :class="labelClass">🏷 Géneros</p>
      <p>{{ genres }}</p>
    </div>
    <div>
      <p class="font-semibold" :class="labelClass">⭐ Rating</p>
      <p>{{ rating }}/5</p>
    </div>
    <div>
      <p class="font-semibold" :class="labelClass">📅 Lanzamiento</p>
      <p>{{ released }}</p>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../stores/theme'
const { isDark } = useTheme()
import { computed } from 'vue'

defineProps({
  platforms: String,
  genres: String,
  rating: Number,
  released: String
})

const labelClass = computed(() =>
  isDark.valueOf ? 'text-gray-400' : 'text-gray-500'
)
</script>
