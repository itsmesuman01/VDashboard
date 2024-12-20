import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import { mountTo, hasPermission, showToast, toCamelCase } from './helpers';
import store from "./store";
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);

app.use(store);
app.config.globalProperties.$mountTo = mountTo;
app.config.globalProperties.$hasPermission = hasPermission;
app.config.globalProperties.$showToast = showToast;
app.config.globalProperties.$toCamelCase = toCamelCase;

app.use(router).mount('#app');
