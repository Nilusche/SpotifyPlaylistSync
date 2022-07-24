import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../public/output.css'
import { projectAuth } from './firebase/config.js'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"

projectAuth.onAuthStateChanged(()=>{
    createApp(App).use(router).use(Toast).mount('#app')
})
