<template>
  <div :class="{ dark: isDark }">
    <div class="overflow-hidden h-screen min-h-screen transition-colors duration-500"
         :class="isDark ? 'bg-[#080808] text-gray-100' : 'bg-[#f7f7f7] text-[#1f2937]'"><!-- Shell -->

      <AppHeader :isDark="isDark" :toggleTheme="toggleTheme" />

      <main class="p-4 h-[calc(100%-73px)] overflow-y-scroll transition-colors duration-500"
            :class="isDark ? 'bg-[#121212]' : 'bg-[#ffffff]'">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import AppHeader from '../components/AppHeader.vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>
