import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import io from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket"] }); // Example URL, adjust as needed

Vue.prototype.$socket = socket;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
