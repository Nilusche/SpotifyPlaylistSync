<template>
  <div>
    <Navbar/>
    <div class="flex justify-center bg-clightgreen">
        <div class="main text-center mt-16 text-black font-bold flex p-5 w-7/12  flex-col lg:flex-row">
          <div class="flex flex-col items-center">
             <img src="https://picsum.photos/500/800" alt="" class="rounded-lg object-fit w-72 h-64 ">
             <p class="text-3xl mt-3 w-72 font-extrabold">Lorem</p>
             <p class="w-72 mt-2 text-sm text-zinc-600">Created by test</p>
            <p class="text-sm w-72 mt-7 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            <button class="px-4 py-2 rounded-full bg-white mt-10 hover:bg-gray-100 hover:cursor-pointer hover:scale-110 ">Delete Playlist</button>
          </div>
          <div class="flex-grow">
              <div class="lg:ml-24 lg:mt-0 mt-8" v-for="element in [1,2,3,4,5]" :key="element">
                  <div class="text-left mb-6 p-5 border-b border-cgreen flex justify-end">
                    <div class="flex-grow">
                      <h3>Lorem ipsum dolor sit.</h3>
                      <p class="font-medium text-zinc-700">Lorem</p>
                    </div>
                    <div class="flex flex-col justify-center px-3">
                      <span class="rounded-full px-2 py-1 hover:bg-gray-100 hover:cursor-pointer hover:scale-110  bg-white text-sm">delete</span>
                    </div>
                  </div>
              </div>
          </div>
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
  }
}
</script>

<style scoped>

</style>
