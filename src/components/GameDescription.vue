<!-- components/GameDescription.vue -->
<template>
  <div class="leading-relaxed">
    <p v-if="description">{{ description }}</p>
    <p v-else class="italic" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
      Este juego no tiene descripción disponible.
    </p>
  </div>
</template>

<script setup>
import { useTheme } from '../stores/theme'
const { isDark } = useTheme()

defineProps({
  description: String
})
</script>
