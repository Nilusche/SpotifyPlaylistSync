<template>
<div>
  <div class="content">
      <router-view/>
    
    </div>
   <footer class="bg-black text-center fixed w-full bottom-0 left-0">
      <div class="text-gray-300 text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
        For educational purposes only. Playlist Sync is in no way affiliated with Spotify and is purely fictive
      </div>
    </footer> 
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');
*{
  font-family: Raleway;
  
}
.content, html, body {
  margin: 0;
  background:#222326;
}


</style>
