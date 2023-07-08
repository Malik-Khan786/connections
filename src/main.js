import { createApp } from 'vue'
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router';
import {eventbus} from '@/eventbus';

createApp(App).use(eventbus).use(router).mount('#app')
