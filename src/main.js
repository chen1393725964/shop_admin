// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 导入路由配置
import router from './router'
 
// 公共样式自己样式 
import './assets/css/index.css'
// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'
// 代码优化（axios,基准路径，请求头）
// 导入axios 
import axios from 'axios'
// 把axios 添加Vue的原型中
//  Vue.prototype.axios=axios
//  换成
  Vue.prototype.$http=axios
  // 配置基准路径
   axios.defaults.baseURL='http://localhost:8888/api/private/v1'
    //  请求拦截器
   axios.interceptors.request.use(config=>{
        // 统一添加请求头
       config.headers.Authorization=localStorage.getItem('token')
        //  必须要返回  config
          return config
   })
// 安装插件
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 关联
  router,
  components: { App },
  template: '<App/>'
})
 
  // 入口文件
  // 一、准备工作
      // 1、导入vue   
      // 2、导入 路由配置（index.js）
     //  3、导入跟组件  APP.Vue
     //  4、导入样式（css公共样式）
      //    5、 导入  (1)结构element-ui 
      //              (2)样式 element-ui/lib/theme-chalk/index.css 
      //              （3）安装插件 Vue.use(ElementUI)
   // 二、 Vue.config.productionTip = false    设置代码提示true/false          
     
   // 三、创建Vue实例
      //   new Vue({
      //     el: '#app',
      //    // 关联（八路由挂载到实例上）
      //     router,
      //     components: { App },    把跟组件作为vue 局部组件
      //     template: '<App/>'     把组件的内容作为标签渲染到页面中（index中）
      // })
          
    // 总结：main.js导入了跟组件（template中router-vie有路由的出口）
    //       导入了路由配置（index.js）、路由配置的规则根据哈希值找到 
    //       找到对应组件之后、根据跟组件（APP.Vue）渲染
    //       App组件的内容作为main.js中实例的局部组件 new Vue实例根据template渲染
       
      //  注意子路由： 直接在  routes: [ 
        //      { path: '/login', component: Login ,name:'login'},
        //      { path: '/home', component: Home ,name:'home',
        //         // 子路由
        //     //  没有/ 就是本身  没有就是home/router  子路由的出口在home的模板中设置 <vie-router></vie-router>
        //       children:[{ path: '/users', component: Users}] 
        //       }
        //      ]
        //     })  
        // 这里面的子路由:直接在component:'home',children:[{ path: '/users', component: Users}]   
        // children:[{路由配置对象}    
         
        // 四、优化
        // 1、全局安装axios 
        //     (1)导入axios  import axios from 'axios'
        //     (2)在vue原型中添加axios  Vue.protype.axios=axios 
        //                       或者  Vue.protype.$http=axios
          // 2、配置基准路径
          // axios.defaults.baseURL='http://localhost:8888/api/private/v1'
          // 3、在请求拦截器中添加请求头
              //   axios.interceptors.request.use(config=>{
              //  // 统一添加请求头
              //    config.headers.Authorization=localStorage.getItem('token')
              //   //  必须要返回  config
              //     return config
              //  }) 