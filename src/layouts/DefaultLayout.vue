<template>
  <div :class="{ 'dark': isDark }">
    <div class="overflow-hidden h-screen min-h-screen text-gray-800 transition-colors duration-500"
      :class="isDark ? 'bg-[#080808] text-gray-100' : 'bg-[#f7f7f7] text-[#1f2937]'">
      <header class="flex justify-between items-center p-4 border-b"
        :class="isDark ? 'border-[#242424]' : 'border-gray-300'">
        <section class="flex flex-row justify-between w-[95%] mx-auto max-w-[1440px]">
          <!-- Logo -->
          <div class="flex items-center justify-around gap-4">
            <router-link to="/" class="text-xl font-bold">
              <img :src="isDark ? darkLogo : lightLogo" class="w-28" alt="Logo" />
            </router-link>
          </div>

          <!-- Indicador visual Top 5 -->
          <div class="flex gap-2 items-center">
            <div v-for="i in 5" :key="i" class="w-5 h-5 rounded-md transition-all duration-500" :class="[
              i <= store.list.length
                ? 'bg-[#1DB954]'
                : isDark
                  ? 'bg-[#242424]'
                  : 'bg-gray-300'
            ]" />
          </div>

          <!-- Botones -->
          <div class="flex gap-4 items-center">
            <!-- Toggle theme -->
            <div @click="toggleTheme"
              class="w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 shadow-inner"
              :class="isDark ? 'bg-[#4b4b4b]' : 'bg-[#b3b3b3]'">
              <div class="w-5 h-5 rounded-full transform transition-transform duration-300 shadow-md"
                :class="isDark ? 'translate-x-6 bg-[#1ED760]' : 'translate-x-0 bg-white'"></div>
            </div>

            <!-- Botón Top 5 -->
            <router-link to="/top-five"
              class="bg-[#1ED760] text-black font-semibold text-sm rounded-full px-6 py-2 hover:brightness-110 transition duration-200 shadow-sm">
              Mi Top 5
            </router-link>
          </div>
        </section>
      </header>

      <!-- Contenido -->
      <main class="p-4 h-[calc(100%-73px)] overflow-y-scroll transition-colors duration-500"
        :class="isDark ? 'bg-[#121212]' : 'bg-[#ffffff]'">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useTopFive } from '../stores/useTopFive'
const darkLogo = new URL('../assets/pfblanco.png', import.meta.url).href
const lightLogo = new URL('../assets/pfnegro.png', import.meta.url).href

const store = useTopFive()

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
