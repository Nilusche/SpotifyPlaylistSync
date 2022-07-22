import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/LoginView.vue'
import PlaylistDetails from '../views/PlaylistDetailsView.vue'
import PlaylistCreate from '../views/PlaylistCreateView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login

  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlaylistDetails
  },
  {
    path: '/create',
    name: 'playlist-create',
    component: PlaylistCreate
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
