<template>
  <div
    class="relative group w-full aspect-square p-3 pb-4 col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
    :class="cardClasses"
  >
    <router-link :to="`/game/${game.id}`">
      <div class="relative w-full h-[70%] rounded-lg overflow-hidden">
        <img
          :src="game.background_image"
          :alt="game.name"
          class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <button
          @click.stop.prevent="$emit('toggle', game)"
          :disabled="disabled"
          class="cursor-pointer absolute bottom-2 right-2 h-[45px] w-[45px] rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0 flex items-center justify-center"
          :class="isInTopFive(game.id) ? 'bg-white text-black' : 'bg-[#1DB954] text-white'"
        >
          <component :is="isInTopFive(game.id) ? Trash2 : CirclePlus" class="w-5 h-5" />
        </button>
      </div>
    </router-link>

    <h2 class="mt-3 text-xs font-semibold line-clamp-2 leading-tight">
      {{ game.name }}
    </h2>

    <p class="text-xs mt-1 opacity-70">
      Rating: {{ game.rating }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CirclePlus, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  game: Object,
  isDark: Boolean,
  disabled: Boolean,
  isInTopFive: Function
})

const cardClasses = computed(() => {
  if (props.isDark) {
    return props.isInTopFive(props.game.id)
      ? 'bg-[#242424] text-white'
      : 'bg-transparent text-white'
  } else {
    return props.isInTopFive(props.game.id)
      ? 'bg-[#d5d9e3] text-[#1f2937]'
      : 'bg-[#e8ecf6] text-[#1f2937]'
  }
})
</script>