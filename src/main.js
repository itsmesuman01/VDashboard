import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import { mountTo, hasPermission } from './helpers';
import store from "./pages/store";

const app = createApp(App);

app.use(store);
app.config.globalProperties.$mountTo = mountTo;
app.config.globalProperties.$hasPermission = hasPermission;

app.use(router).mount('#app');
