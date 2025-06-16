<template>
  <div>
    <button
      @click="$emit('toggle')"
      class="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md"
      :class="isInTopFive ? 'bg-white text-black' : 'bg-[#1DB954] text-white'"
    >
      {{ isInTopFive ? 'Sacar del Top 5' : 'Agregar al Top 5' }}
    </button>

    <p v-if="feedbackMsg" class="mt-2 text-green-400">{{ feedbackMsg }}</p>
  </div>
</template>

<script setup>
defineProps({
  isInTopFive: Boolean,
  feedbackMsg: String
})
</script>
