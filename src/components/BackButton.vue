<!-- components/BackButton.vue -->
<template>
  <button
    @click="$emit('back')"
    class="mb-6 flex items-center gap-2 transition text-sm font-medium"
    :class="isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'"
  >
    ← Volver al inicio
  </button>
</template>

<script setup>
import { useTheme } from '../stores/theme'
const { isDark } = useTheme()
</script>
