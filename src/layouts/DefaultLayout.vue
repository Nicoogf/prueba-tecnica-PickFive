<template>
  <div :class="{ 'dark': isDark }">
    <div class="min-h-screen text-gray-800 transition-colors duration-500" :style="{
      backgroundColor: isDark ? '#111827' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937'
    }">
      <header class="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <div class="flex items-center gap-4">
          <router-link to="/" class="text-xl font-bold">🎮 PickFive</router-link>

          <!-- Indicador visual Top 5 -->
          <div class="flex gap-1">
            <div v-for="i in 5" :key="i" class="w-5 h-5 rounded transition-all duration-300" :class="{
              'bg-orange-500': i <= store.list.length,
              'bg-gray-400': i > store.list.length
            }" />
          </div>
        </div>

        <div class="flex gap-4 items-center">
          <router-link to="/top-five" class="underline">Mi Top 5</router-link>
          <button @click="toggleTheme">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </header>
      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { getTopFive } from '../utils/topFive'
import { useTopFive } from '../stores/useTopFive'

const store = useTopFive()

// 🟢 Primero definís isDark
const isDark = ref(localStorage.getItem('theme') === 'dark')

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// 🟢 Recién después usás watchEffect
watchEffect(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})


</script>


<style scoped>
.bg-orange-500 {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    transform: scale(0.8);
    opacity: 0.3;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>