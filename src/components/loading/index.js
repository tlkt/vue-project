/**
 * Created by root on 17-2-14.
 */
const LoadingComponent = require('./Loading.vue')
const loading = {
    install:function (Vue) {
        Vue.component('loading',LoadingComponent);
    }
}

module.exports=loading
