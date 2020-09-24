import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

import "./style/common.scss";

import App from "./App.vue";

// 将VueRouter注册到Vue上
Vue.use(VueRouter);
// 将axios挂载到Vue原型链上，方便使用
Vue.prototype.$ajax = axios;

const router = new VueRouter({
	routes: [],
});

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
