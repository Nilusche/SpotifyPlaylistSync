<template>
<router-link :to="'/playlist/' + document.id">
  <div class="text-white font-bold flex justify-center -mb-10">
    <div class="rounded-xl flex  p-5 shadow-md w-7/12 bg-cgray2 mb-12 hover:cursor-pointer transition ease-in-out hover:scale-110">
        <div class="object-cover w-28 mr-5">
            <img v-if="url" :src="url" :alt="document.title" class="rounded-lg duration-100">
            <img v-else src="../assets/fallbackimage.jpg" alt="" class="rounded-lg duration-100">
        </div>
        <div class="grow">
            <div class="flex w-full items-center justify-between border-b pb-3">
            <div class="flex items-center space-x-3">
                <div class="text-lg font-bold text-w:ite-700">{{document.title}}</div>
            </div>
            <div class="flex items-center space-x-8">
                <div v-if="document.songs && document.songs.length==1" class="text-xs text-neutral-300">{{document.songs.length}} Song</div>
                <div v-else class="text-xs text-neutral-300">0 Songs</div>
            </div>
            </div>

            <div class="mt-4 mb-6">
                <div class="mb-3 text-md text-neutral-400 text-left font-bold">{{document.description}}</div>
            </div>
        </div>
    <div>
    </div>
  </div>
  </div>
  </router-link>
</template>

<script>
export default {
    props:['document', 'url'],
}
</script>

<style scoped>


</style>