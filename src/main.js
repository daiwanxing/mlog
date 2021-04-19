import { createApp } from 'vue';
import router from './router/index';
import App from './App.vue';
import "animate.css";

const app = createApp(App); // 通过createApp函数创建一个新的Vue应用
app.use(router);
app.mount('#app'); // 返回根组件的实例
