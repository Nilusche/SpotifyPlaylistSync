import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/LoginView.vue'
import PlaylistDetails from '../views/PlaylistDetailsView.vue'
import PlaylistCreate from '../views/PlaylistCreateView.vue'
import Register from '../views/auth/RegisterView.vue'
import {projectAuth} from '../firebase/config.js'

const requireAuth = (to, from , next) => {
    let user = projectAuth.currentUser;
    if(!user){
        next('/login');
    }else{
        next();
    }
}

const requireNoAuth = (to, from , next) => {  
    let user = projectAuth.currentUser;
    if(user){
        next('/');
    }else{  
        next();
    }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,


  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlaylistDetails,
    beforeEnter: requireAuth
  },
  {
    path: '/create',
    name: 'playlist-create',
    component: PlaylistCreate,
    beforeEnter: requireAuth
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
