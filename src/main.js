import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import {createPinia} from "pinia";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
