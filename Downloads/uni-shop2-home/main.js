// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//1. 引入网络请求所需要的包
import {
  $http
} from '@escook/request-miniprogram'

// 2.挂载到顶级对象作为自定义属性存在
// 特殊的属性名代表自定义
uni.$http = $http

// 配置基本路径   老师发的网址
$http.baseUrl = 'https://api-hmugo-web.itheima.net'


// 3.请求之前 调用加载方法
$http.beforeRequest = function(options) {
  // console.log(options);
  uni.showLoading({
    title: '数据加载中...'
  })
}
// 请求完成之后做一些事情  关闭加载方法
$http.afterRequest = function(res) {
  // console.log(res);
  uni.hideLoading()
}

// 封装加载提示消息  自定义封装方法记得加$ 使用此方法时也应该加$
uni.$showtitle = function(title = '数据加载错误', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}


Vue.config.productionTip = false

App.mpType = 'app'



const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
