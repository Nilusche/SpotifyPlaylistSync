<template>
  <div>
    <Navbar/>
    <div class="flex justify-center bg-clightgreen">
        <div class="main text-center mt-16 text-black font-bold flex p-5 w-8/12  flex-col lg:flex-row">
          <div class="flex flex-col items-center">
             <img :src="document.url" alt="" class="rounded-lg object-fit w-72 h-64 ">
             <p class="text-3xl mt-3 w-72 font-extrabold">{{document.title}}</p>
             <p class="w-72 mt-2 text-sm text-zinc-600">Created by {{document.userName}}</p>
            <p class="text-sm w-72 mt-7 font-medium">{{document.description}}</p>
            <button @click="handleDeletion" v-if="user.uid == document.userId" class="px-4 py-2 rounded-full bg-white mt-10 hover:bg-gray-100 hover:cursor-pointer hover:scale-110 ">Delete Playlist</button>
          </div>
          <div class="flex-grow">
              <div class="lg:ml-24 lg:mt-0 mt-8" v-for="element in document.songs" :key="element">
                  <div class="text-left mb-6 p-5 border-b border-cgreen flex justify-end">
                    <div class="flex-grow">
                      <h3>{{element.title}}</h3>
                      <p class="font-medium text-zinc-700">{{element.artist}}</p>
                    </div>
                    <div class="flex flex-col justify-center px-3">
                      <span v-if="user.uid == document.userId" @click="handleDeleteSong(element.id)" class="rounded-full px-2 py-1 hover:bg-gray-100 hover:cursor-pointer hover:scale-110  bg-white text-sm">delete</span>
                    </div>
                  </div>
              </div>
              <div  class="lg:ml-24 lg:mt-0 mt-8 text-left mb-8 p-5 bg-white rounded-lg">
                <button @click="showform=!showform" v-if="user.uid == document.userId && !showform" class="justify-start px-4  py-2 rounded-full  bg-clightgreen  hover:bg-cgreen hover:cursor-pointer hover:scale-110 ">Add Song</button>
                <div v-if="user.uid == document.userId && showform">
                  <h2>Add a New Song</h2>
                  <div >
                    <input type="text" v-model="title" class="w-full px-4 py-2 mt-3 rounded-md mb-2 border-b focus:border-gray-300 border-gray-100 outline-none bg-white" placeholder="Song title">
                    <input type="text" v-model="artist" class="w-full px-4 py-2 rounded-md border-b focus:border-gray-300 border-gray-100 outline-none bg-white" placeholder="Artist">
                  </div>
                  <button @click.prevent="handleAddSong" class="px-4 py-2 rounded-lg bg-cgreen mt-8 hover:bg-clightgreen hover:cursor-pointer hover:scale-110 ">Add</button>
                </div>
                
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { projectFirestore } from '@/firebase/config';
import { onMounted } from 'vue';
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import getUser from '@/composables/getUser.js';
import useStorage from '@/composables/useStorage.js';


const showform = ref(false)
const route = useRoute()
const r = useRouter()
const document = ref('')
const {user} = getUser()
const {deleteFile} = useStorage()
const title = ref('')
const artist = ref('')


const handleAddSong = async () => {
  const song = {
    title: title.value,
    artist: artist.value,
    id : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const songs = [... document.value.songs, song]
  await projectFirestore.collection('playlists').doc(route.params.id)
  .update({
    songs: songs
  })
  document.value.songs = songs
  
  title.value = ''
  artist.value = ''
  r.push(`/playlist/${route.params.id}`)

}

const handleDeleteSong = async (id) => {
  const songs = document.value.songs.filter(song => song.id !== id)
  await projectFirestore.collection('playlists').doc(route.params.id)
  .update({
    songs: songs
  })
  document.value.songs = songs
}


onMounted(async ()=>{
  const snapshot = await projectFirestore.collection('playlists').get();
  let results = []
  snapshot.docs.map(doc => doc.data().createdAt && results.push({...doc.data(), id: doc.id}));
  
  results.forEach(doc => {
    if(doc.id === route.params.id){
      document.value = doc;
    }
  })
})

const handleDeletion=async () => {
  await deleteFile(document.value.filePath)
  projectFirestore.collection('playlists').doc(route.params.id).delete();
  r.push('/')
}


</script>

<style scoped>

</style>
