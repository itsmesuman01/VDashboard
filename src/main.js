import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import { mountTo } from './helpers';

const app = createApp(App);

app.config.globalProperties.$mountTo = mountTo;

app.use(router).mount('#app');
