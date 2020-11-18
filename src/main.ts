import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { RegisterComponents } from './components'

const app = createApp(App);
RegisterComponents(app);
app.use(store);
app.use(router);
app.mount('#app');
