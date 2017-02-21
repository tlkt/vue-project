import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import stores from './store/store'
import ElementUI from 'element-ui'
import Loading from './components/loading'
import qs from 'querystring'
import routes from './router.config'
import 'element-ui/lib/theme-default/index.css'
import * as filters from './filters'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Loading);

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes
});

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) //注册过滤器

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token') === null) {
        if (to.path != '/login') {
            router.push('/login');
        }
    }
    next();
});

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = 'http://180.97.80.42:8098/';

// Vue.prototype.$http = axios;

Vue.prototype.$http = axios.create({
    baseURL: 'http://180.97.80.42:8098',
    //baseURL: 'http://api.test.com',
    timeout: 10000,
    responseType: 'text',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    validateStatus: function (status) {
        return true;
    }
});

Vue.prototype.$http.interceptors.request.use(function (config) {  //配置发送请求的信息
    //stores.dispatch('loadingShow')
    config.data = qs.stringify(config.data);
    if (config.url.indexOf('site/login') == -1) {
        var token = JSON.parse(localStorage.getItem('token'));
        if (config.params == undefined) {
            config.params = {access_token: token};
        } else {
            config.params['access_token'] = token;
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

Vue.prototype.$http.interceptors.response.use(function (response) { //配置请求回来的信息
    //stores.dispatch('loadingHide')
    //返回的状态是401 并且　地址不是site/login　重置登录状态并跳转到登录页面
    if ((response.status == 401) && (response.config.url.indexOf('site/login') == '-1')) {
        localStorage.removeItem('token');
        router.push('/login');
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

import baseJs from './components/base'
Vue.use(baseJs);

import configParams from './components/configs'
Vue.use(configParams);

new Vue({
    el: '#app',
    router,
    store: stores,
    qs: qs,
    render: h => h(App)
});
