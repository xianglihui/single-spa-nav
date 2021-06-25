import Vue from 'vue'
import App from './App.vue'
import router from './router';
import singleSpaVue from 'single-spa-vue';
import { setPublicPath } from 'systemjs-webpack-interop'
Vue.config.productionTip = false

setPublicPath('nav')
var vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;