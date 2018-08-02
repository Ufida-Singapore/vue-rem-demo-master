import "./asset/css/reset"
import Vue from "vue"
import VueRouter from "vue-router"
import store from "./store/"
import routes from "./router/"
import axios from "./config/http"
import util from "./util"
import VueI18n from "vue-i18n"
import lang from "./lang/index.js" //语言包文件
import URLSearchParams from "url-search-params"
import global from './components/global'
import qs from 'qs'
import config from "./config/config"
import data from "./components/tableData"
import httpData from "./components/httpData"

require('./asset/dist/css/adminlte.min.css')
require('./asset/plugins/font-awesome/css/font-awesome.min.css')

Vue.prototype.Util = util;
Vue.prototype.$http = axios;
Vue.prototype.GLOBAL = global;
Vue.prototype.$eventbus = new Vue();
Vue.prototype.tableData = data;
Vue.prototype.httpData = httpData;
Vue.prototype.$config = config;

Vue.prototype.$qs = qs;

if (!window.URLSearchParams) {
    window.URLSearchParams = URLSearchParams
}
URLSearchParams.prototype.add = function(para) {
    if (para instanceof Object) {
        for (let k in para) {
            this.delete(k)
            this.append(k, para[k])
        }
    }
}

Vue.use(VueI18n)
let langKeys = Object.keys(lang),
    language = window.navigator.language.toLocaleLowerCase()
if (langKeys.indexOf(language) < 0) {
    language = "zh-cn"
}
document.querySelector("html").setAttribute("lang", language)
const i18n = new VueI18n({
    locale: language,
    messages: lang
})

//路由
Vue.use(VueRouter)
const router = new VueRouter({
    routes
})

new Vue({
    store,
    router,
    i18n
}).$mount("#app")

