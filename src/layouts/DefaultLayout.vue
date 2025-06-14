<template>
  <div :class="{ 'dark': isDark }">
 <div
  class="min-h-screen text-gray-800 transition-colors duration-500"
  :style="{
    backgroundColor: isDark ? '#111827' : '#ffffff',
    color: isDark ? '#f3f4f6' : '#1f2937'
  }"
>
      <header class="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <router-link to="/" class="text-xl font-bold">🎮 PickFive</router-link>
        <div class="flex gap-4">
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

const isDark = ref(localStorage.getItem('theme') === 'dark')

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

watchEffect(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
