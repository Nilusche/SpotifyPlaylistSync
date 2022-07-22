<template>
<router-link to="/playlist">
  <div class="text-white font-bold flex justify-center ">
    <div class="rounded-xl flex  p-5 shadow-md w-7/12 bg-cgray2 mb-12 hover:cursor-pointer transition ease-in-out hover:scale-110">
        <div class="object-cover w-28 mr-5">
            <img src="https://picsum.photos/200/200" alt="" class="rounded-lg duration-100">
        </div>
        <div class="grow">
            <div class="flex w-full items-center justify-between border-b pb-3">
            <div class="flex items-center space-x-3">

                <div class="text-lg font-bold text-white-700">Joe Smith</div>
            </div>
            <div class="flex items-center space-x-8">
                <div class="text-xs text-neutral-300">2 Songs</div>
            </div>
            </div>

            <div class="mt-4 mb-6">
                <div class="mb-3 text-md text-neutral-400 text-left font-bold">Nulla sed leo tempus, feugiat velit vel, rhoncus neque?</div>
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

}
</script>

<style scoped>


</style>