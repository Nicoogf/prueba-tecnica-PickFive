import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import GameDetail from '../pages/GameDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/game/:id', name: 'GameDetail', component: GameDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
