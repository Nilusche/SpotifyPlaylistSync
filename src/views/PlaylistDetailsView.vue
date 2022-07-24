<template>
  <div>
    <Navbar/>
    <div class="flex justify-center bg-clightgreen">
        <div class="main text-center mt-16 text-black font-bold flex p-5 w-8/12  flex-col lg:flex-row">
          <div class="flex flex-col items-center">
             <img :src="docu.url" alt="" class="rounded-lg object-fit w-72 h-64 ">
             <p class="text-3xl mt-3 w-72 font-extrabold">{{docu.title}}</p>
             <p class="w-72 mt-2 text-sm text-zinc-600">Created by {{docu.userName}}</p>
            <p class="text-sm w-72 mt-7 font-medium">{{docu.description}}</p>
            <button @click="handleDeletion" v-if="user.uid == docu.userId" class="px-4 py-2 rounded-full bg-white mt-10 hover:bg-gray-100 hover:cursor-pointer hover:scale-110 ">Delete Playlist</button>
            <button @click="syncToSpotify" v-if="token" class="px-4 py-2 rounded-full bg-clightgreen mt-4 border border-white hover:bg-cgreen hover:cursor-pointer hover:scale-110 ">Add Playlist to Spotify</button>
          </div>
          <div class="flex-grow">
              <div class="lg:ml-24 lg:mt-0 mt-8" v-for="element in docu.songs" :key="element">
                  <div class="text-left mb-6 p-5 border-b border-cgreen flex justify-end">
                    <div class="flex-grow">
                      <h3>{{element.title}}</h3>
                      <p class="font-medium text-zinc-700">{{element.artist}}</p>
                    </div>
                    <div class="flex flex-col justify-center px-3">
                      <span v-if="user.uid == docu.userId" @click="handleDeleteSong(element.id)" class="rounded-full px-2 py-1 hover:bg-gray-100 hover:cursor-pointer hover:scale-110  bg-white text-sm">delete</span>
                    </div>
                  </div>
              </div>
              <div  class="lg:ml-24 lg:mt-0 mt-8 text-left mb-8 p-5 bg-white rounded-lg">
                <button @click="showform=!showform" v-if="user.uid == docu.userId && !showform" class="justify-start px-4  py-2 rounded-full  bg-clightgreen  hover:bg-cgreen hover:cursor-pointer hover:scale-110 ">Add Song</button>
                <div v-if="user.uid == docu.userId && showform">
                  <h2>Add a New Song</h2>
                  <div >
                    <input type="text" v-model="searchword" class="w-full px-4 py-2 mt-3 rounded-md mb-2 border-b focus:border-gray-300 border-gray-100 outline-none bg-white" placeholder="Search Song by title">
                    <button @click.prevent="searchSongs" class="px-4 py-2 mt-2 rounded-lg bg-sky-500 text-white hover:bg-cblue hover:cursor-pointer hover:scale-110 ">Search Track</button>
                  </div>
                  <div @click="addToSelected(track)" :id="'searchcontainer_'+track.id" v-for="track in searchresuls" :key="track.id" class="mt-4 border border-green-400 rounded-lg p-2 hover:cursor-pointer hover:bg-gray-100 flex justify-between">
                      <div class="flex">
                        <div class="mr-2">
                          <img :src="track.album.images[2].url" alt="">
                        </div>
                        <div>
                          <div>{{track.name}}</div>
                          <span v-for="artist in track.artists" :key="artist.id">
                            <span class="before:content-['/'] text-gray-400">{{artist.name}}</span>
                          </span>
                        </div>
                      </div>
                      <div class="flex flex-col justify-center ml-4 text-gray-400">
                        <span>{{track.album.name}}</span>
                      </div>
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
import ApiController from '@/spotify/config.js';
import { useToast } from "vue-toastification";

const showform = ref(true)
const route = useRoute()
const r = useRouter()
const docu = ref('')
const {user} = getUser()
const {deleteFile} = useStorage()
const searchresuls = ref([])
const {getTracks, getUserid, createPlaylist, addTracksToPlaylist} = ApiController()
const searchword = ref('')
const selected = ref([])
const toast = useToast();
const token = ref('')


const syncToSpotify = async () => {
  const uid = await getUserid(token.value)
  const createdPlaylist = await createPlaylist(token.value, uid, docu.value.title, docu.value.description);
  const trackuris = docu.value.songs.map(song => song.uri)
  const addedTracks = await addTracksToPlaylist(token.value, createdPlaylist.id, trackuris)


  toast.success("Playlist added to Spotify");
}

const addToSelected = (track)=> {
  selected.value.push(track)
  const searchid = 'searchcontainer' + '_' +track.id;
  document.getElementById(searchid).style.backgroundColor= '#1ED760';
}

const searchSongs = async () => {
  const tracks  = await getTracks(searchword.value);
  searchresuls.value = tracks
}

const handleAddSong = async () => {
  if(selected.value.length == 0){
    return
  }
  const selectedsongs = []
  selected.value.forEach(element => {
    selectedsongs.push({
      id: element.id,
      title: element.name,
      artist: element.artists[0].name,
      album: element.album.name,
      album_image: element.album.images[2].url,
      track_url: element.external_urls.spotify,
      uri: element.uri
    })
  }); 
  

  let songs= [... docu.value.songs, ...selectedsongs]
  let unique_songs = [...new Set(songs.map(item => item.id))].map(id => songs.find(item => item.id === id))
  await projectFirestore.collection('playlists').doc(route.params.id)
  .update({
    songs: unique_songs
  })
  docu.value.songs = unique_songs

  selected.value = []
  searchresuls.value = []
  searchword.value = ''
  
}

const handleDeleteSong = async (id) => {
  const songs = docu.value.songs.filter(song => song.id !== id)
  await projectFirestore.collection('playlists').doc(route.params.id)
  .update({
    songs: songs
  })
  docu.value.songs = songs
}


onMounted(async ()=>{
  const snapshot = await projectFirestore.collection('playlists').get();
  let results = []
  snapshot.docs.map(doc => doc.data().createdAt && results.push({...doc.data(), id: doc.id}));
  token.value = await (await projectFirestore.collection('users').doc(user.value.uid).get()).data().accessToken
  results.forEach(doc => {
    if(doc.id === route.params.id){
      docu.value = doc;
    }
  })
})

const handleDeletion=async () => {
  await deleteFile(docu.value.filePath)
  projectFirestore.collection('playlists').doc(route.params.id).delete();
  r.push('/')
}


</script>

<style scoped>

</style>
