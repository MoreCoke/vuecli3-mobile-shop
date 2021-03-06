import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "bootstrap";
import "vue-loading-overlay/dist/vue-loading.css";
import VeeValidate, { Validator } from "vee-validate";
import zhTWValidate from "vee-validate/dist/locale/zh_TW";
import VueI18n from "vue-i18n";

import App from "./App";
import router from "./router";
import store from "./store/index";
import currencyFilter from "./filters/currency";
import date from "./filters/date";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.use(VeeValidate);
Validator.localize("zh_TW", zhTWValidate);
Vue.use(VueI18n);

Vue.component("Loading", Loading);
Vue.filter("currency", currencyFilter);
Vue.filter("date", date);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  // ...
  // console.log("to",to,"from",from,"next",next);
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}api/user/check`; // "https://vue-course-api.hexschool.io/api/morecoke/products?page=:page";
    axios.post(api).then((response) => {
      // console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});
