import Vue from "vue";
import App from "./App.vue";
import store from "./store/Store";
import VueRouter from "vue-router";
import Routes from "./router/Router";


Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes,
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
