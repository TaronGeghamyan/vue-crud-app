import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import states from "@/store/story";

createApp(App).use(states).use(router).mount("#app");
