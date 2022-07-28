<template>
  <nav class="bg-cblack-200 text-white">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button type="button" @click="show=!show" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
          <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <router-link to="/">
          <div class="flex-shrink-0 flex items-center hover:cursor-pointer">
            <img class="block lg:hidden h-8 w-auto" src="../assets/logo.png" alt="Workflow">
            <img class="hidden lg:block h-8 w-auto"  src="../assets/logo.png" alt="Workflow">
            <p class="text-2xl ml-4 font-bold">Playlist Sync</p>
          </div>
        </router-link>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 flex">
        <!-- Profile dropdown -->
        <router-link v-if="user&& user.uid" to="/create" class="lg:block hidden md:block rounded-full hover:bg-cblack-100 hover:text-cgreen px-3 py-2 text-sm  font-bold">Create Playlist</router-link>
        <router-link v-if="user&& user.uid" to="myplaylists" class="lg:block hidden md:block ml-3  hover:bg-cblack-100 hover:text-cgreen px-3 py-2 rounded-full text-sm font-bold">My Playlists</router-link>
        <router-link v-else to="/login" class="lg:block hidden md:block ml-3  hover:bg-cblack-100 hover:text-cgreen px-3 py-2 rounded-full text-sm font-bold">Signup/login</router-link>
        <div class="ml-3 relative hidden md:block lg:block" v-if="user&& user.uid && !user_token">
          <div>
            <button @click="syncToSpotify" type="button" class=" bg-gray-800 pr-2 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cgreen focus:ring-cgreen" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <img class="h-8 w-8 rounded-full" src="../assets/logo.png" alt="">
              <span class="mt-1 bg-gray-800">Spotify Login/Sync</span>
            </button>
          </div>
        </div>
        <span v-if="user&& user.uid" @click="handleLogout" class="lg:block md:block hidden ml-4 hover:cursor-pointer bg-cblack-100 hover:text-cgreen px-3 py-2 rounded-full text-sm font-bold">Logout</span>
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  <div class="sm:hidden" id="mobile-menu" v-if="show">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <router-link  v-if="user && user.uid" to="/create" class="text-white hover:bg-cblack-100 hover:text-cgreen block px-3 py-2 rounded-md text-base font-medium">Create Playlist</router-link>

      <router-link v-if="user&& user.uid" to="/myplaylists" class="text-gray-300 hover:bg-cblack-100 hover:text-cgreen block px-3 py-2 rounded-md text-base font-medium">My Playlists</router-link>
      <button v-if="user&& user.uid && !user_token" @click="syncToSpotify" type="button" class=" sm:hidden bg-gray-800 pr-2 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cgreen focus:ring-cgreen" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        <img class="h-8 w-8 rounded-full" src="../assets/logo.png" alt="">
        <span class="mt-1 bg-gray-800">Spotify Login/Sync</span>
      </button>
      <span v-if="user&& user.uid" @click="handleLogout" class="text-gray-300 bg-cblack-100 hover:cursor-pointer hover:text-cgreen block px-3 py-2 rounded-md text-base font-medium">Logout</span>
      <router-link v-else to="/login" class="text-gray-300 hover:bg-cblack-100 hover:text-cgreen block px-3 py-2 rounded-md text-base font-medium">Signup/Login</router-link>
      
    </div>
  </div>
</nav>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import useLogout from '@/composables/useLogout.js'
import getUser from '@/composables/getUser.js'
import ApiController from '@/spotify/config.js';
import { onMounted } from 'vue';
import { projectFirestore } from '@/firebase/config';

const {getAuthorization,getAccessToken} = ApiController()
const {user} = getUser()
const show = ref(false)
const router = useRouter()
const user_token = ref(null)


onMounted(async () => {
  
  let params = (new URL(document.location)).searchParams;
  let code = params.get('code');
  if(code){
    const token = await getAccessToken(code);
    await projectFirestore.collection('users').doc(user.value.uid).set({
      accessToken: token
    }, { merge: true });
  }
  
  user_token.value = await projectFirestore.collection('users').doc(user.value.uid).get().then(doc => {
    return doc.data().accessToken
  })
})

const handleLogout = async () => {
  router.push('/')
  await projectFirestore.collection('users').doc(user.value.uid).set({
    accessToken: null
  }, { merge: true });
  const res = await useLogout()
  user_token.value = null
  router.push('/login')
}

const syncToSpotify = async () => {
  await getAuthorization()
}

</script>

<style>

</style>