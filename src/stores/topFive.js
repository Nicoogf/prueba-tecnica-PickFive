import { defineStore } from 'pinia'
import { getTopFive as getFromStorage, addToTopFive, removeFromTopFive } from '../utils/TopFive'


export const useTopFive = defineStore('topFive', {
  state: () => ({
    list: getFromStorage(),
  }),
  actions: {
    add(game) {
      this.list = addToTopFive(game)
    },
    remove(id) {
      this.list = removeFromTopFive(id)
    },
    refresh() {
      this.list = getFromStorage()
    }
  }
})
