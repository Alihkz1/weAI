import "./assets/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { Modal } from 'ant-design-vue';

const pinia = createPinia();
createApp(App).use(router).use(pinia).use(Modal).mount("#app");
