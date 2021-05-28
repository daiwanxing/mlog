import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";
import "animate.css";
import "@/assets/css/icon.module.css";

const app = createApp(App); // 通过createApp函数创建一个新的Vue应用
app.use(router);

router.isReady().then(function () {
  app.mount("#app"); // 返回根组件的实例
}).catch(e => {
    console.error("mount routes error", e);
});
