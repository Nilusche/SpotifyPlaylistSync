<template>
  <div>
    <Navbar/>
      <div class="main text-center mt-16" v-for="doc in docs" :key="doc.id">
        <ListView :document="doc" :url="doc.url" class=""/>
      </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import ListView from '@/components/ListView.vue'
import getCollection  from '@/composables/getCollection.js';
import { projectFirestore } from '@/firebase/config';
import { onMounted } from 'vue';
import {ref} from 'vue'


const docs = ref('')

onMounted(async ()=>{
  const snapshot = await projectFirestore.collection('playlists').get();
  let results = []
  snapshot.docs.map(doc => doc.data().createdAt && results.push({...doc.data(), id: doc.id}));
  docs.value = results; 
})



</script>

<style scoped>

</style>
