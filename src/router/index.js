import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import GameDetail from '../pages/GameDetail.vue'
import TopFive from '../pages/TopFive.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/game/:id', name: 'GameDetail', component: GameDetail },
   { path:'/top-five', name: 'TopFive', component: TopFive }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
