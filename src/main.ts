import { createApp } from 'vue'
import './index.css'

import App from './App.vue'
import router from './router'
import pinia from './stores/pinia';

import './utilities/date-extensions'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
