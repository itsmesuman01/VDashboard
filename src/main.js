import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import { mountTo, hasPermission } from './helpers';

const app = createApp(App);

app.config.globalProperties.$mountTo = mountTo;
app.config.globalProperties.$hasPermission = hasPermission;

app.use(router).mount('#app');
