<template>
  <div>
    <Navbar/>
    <div class=" bg-cblue flex justify-center">
         <div class="main text-left w-5/11 p-20  font-bold ">
            <h1 class="text-4xl mb-6 font-bold text-white">Create new Playlist</h1>
            <input type="text" class="w-full px-4 py-2 mt-3 rounded-md mb-2 border-b focus:border-black-300 border-gray-100 outline-none focus:ring-2 focus:ring-sky-500 bg-white" placeholder="Playlist title">
            <textarea id="message" rows="4" class="block py-2 px-4 mt-1 w-full  outline-none bg-gray-50 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:border-sky-500  dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Playlist description ..."></textarea>
        <input type="file" name="" id="" class="block mt-5">
            <button class="px-4 py-2 rounded-full bg-black hover:scale-105 text-white mt-10 hover:cursor-pointer">Create Playlist</button>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'


export default {
  name: 'HomeView',
    components: {
    Navbar,
    Navbar
}
}
</script>

<style>

</style>