import Vue from "vue";
import App from "./App.vue";
import singleSpaVue from "single-spa-vue";
import { setPublicPath } from "systemjs-webpack-interop";
Vue.config.productionTip = false;
// if (process.env.NODE_ENV === "local") {
//   new Vue({
//     render: (h) => h(App),
//   }).$mount("#app");
// }else{

// }
// console.log('singleSpaNavigate',window.singleSpaNavigate)
// if (!window.singleSpaNavigate) {
//   new Vue({
//     render: (h) => h(App),
//   }).$mount("#app");
// }
setPublicPath("nav");

const vueLifeCycles = singleSpaVue({
  Vue,
  appOptions: {
    // el：挂载的dom节点，在主项目需要有；没有el的话会添加到body下
    render: (h) => h(App),
  },
});

// var vueLifecycles = singleSpaVue({
//   Vue,
//   appOptions: {
//     render: (h) => h(App),
//   },
// });

export const bootstrap = vueLifeCycles.bootstrap;
export const mount = vueLifeCycles.mount;
export const unmount = vueLifeCycles.unmount;
