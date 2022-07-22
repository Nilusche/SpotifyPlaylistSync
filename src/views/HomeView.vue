<template>
  <div>
    <Navbar/>
      <div class="main text-center mt-16">
        <ListView/>
        <ListView/>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ListView from '@/components/ListView.vue'


export default {
  name: 'HomeView',
    components: {
      Navbar,
      ListView,
  }
}
</script>

<style scoped>

</style>
