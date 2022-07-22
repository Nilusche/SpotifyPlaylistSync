<template>
  <div>
    <Navbar/>
    <div class=" bg-cblue flex justify-center">
         <div class="main text-left w-5/11 p-20  font-bold ">
            <h1 class="text-4xl mb-6 font-bold text-white">Create new Playlist</h1>
            <input type="text" v-model="title" class="w-full px-4 py-2 mt-3 rounded-md mb-2 border-b focus:border-black-300 border-gray-100 outline-none focus:ring-2 focus:ring-sky-500 bg-white" placeholder="Playlist title">
            <textarea id="message" v-model="description" rows="4" class="block py-2 px-4 mt-1 w-full  outline-none bg-gray-50 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500  dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Playlist description ..."></textarea>
            <input  @change="handleFileChange" type="file" name="" id="" class="block mt-5">
            <p class="mt-2 text-sky-300">{{fileerror}}</p>
            <button @click.prevent="handleCreate" class="px-4 py-2 rounded-full bg-black hover:scale-105 text-white mt-10 hover:cursor-pointer">Create Playlist</button>
            
        </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import useStorage from '@/composables/useStorage.js'
import {pushScopeId, ref} from 'vue'
import { useRouter } from 'vue-router';
import useCollection from '@/composables/useCollection.js'
import getUser from '@/composables/getUser.js'
import { timestamp } from '@/firebase/config.js';

const {filePath, url, uploadFile} = useStorage()
const title = ref('')
const description = ref('')
const file = ref('')
const fileerror = ref('')
const router = useRouter()
const {error, addDoc} =  useCollection('playlists')
const {user} = getUser()

const handleCreate = async () => {
  if(file.value){
    await uploadFile(file.value)
    let data = {
      title: title.value,
      description: description.value,
      userId: user.value.uid,
      userName: user.value.displayName,
      url: url.value,
      filePath: filePath.value,
      songs:[],
      createdAt: timestamp()
    }
    await addDoc(data)
    if(!error){
      console.log("Playlist added")
    }

  }
  router.push('/')
  
}

const types = ['image/png', 'image/jpeg', 'image/jpg']

const handleFileChange = (e)=>{
  
  const selected = e.target.files[0];
  if (selected && types.includes(selected.type)) {
    file.value = selected;
    fileerror.value = ''
  }else{
    file.value = null; 
    fileerror.value = 'Please select a valid image file'
  }
}

</script>

<style>

</style>