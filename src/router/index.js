/*
  配置路由
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件：
// 登录组件
import Login from '@/components/login/Login'
// home 组件
import Home from '@/components/home/Home'
// 导入 users组件
import Users from '@/components/users/Users' 
//  导入rules组件
import Roles  from '@/components/roles/Roles'
// 安装插件
Vue.use(VueRouter)

// 创建路由实例，并导出   
const router = new VueRouter({
  routes: [ 
    { path: '/login', component: Login ,name:'login'},
    { path: '/home', component: Home ,name:'home',
      // 子路由
      //  没有/ 就是本身  没有就是home/router
      children:[{ path: '/users', component: Users},{path: '/roles', component:Roles}], 
     }
  ]
})
// 导航守卫
//  router.beforeEach((to,from,next)=>{
//    console.log("切换路由了","导航护卫执行了",localStorage.getItem('token')); 
// // console.log(to,"to");
// // console.log(from,'from');
// //  就是表示要跳转的路由path   也就相当于跳转路由
//   next();
//   // next('/home')
   
  
//  })

  router.beforeEach((to,from,next)=>{
    if(to.path==='/login'){
      next()
      return
    }
    const token=localStorage.getItem('token')
    if(token){
      // 登录
       next()
    }else{
        // 没有登录
      next('/login')
    }
  })
   
export default router


  // 路由index：总结：、
  // 一、准备工作
  //   1、导入vue  结构：(import 名称 from "vue")
  //   2、导入路由 ： import VueRouter from  vue-router(路由是vue的一个插件所有需要安装,依赖于vue)
  //   3、安装路由插件：Vue.use(VueRouter)
  //   4、导入组件：个home,users,login） ：import Login from '@/components/login/Login'
  // 二、创建路由实例  const router = new VueRouter({
  //    routes: [ 
  //      { path: '/login', component: Login ,name:'login'},
  //      { path: '/home', component: Home ,name:'home',
  //         // 子路由
  //     //  没有/ 就是本身  没有就是home/router  子路由的出口在home的模板中设置 <vie-router></vie-router>
  //       children:[{ path: '/users', component: Users}] 
  //       }
  //      ]
  //     })
  // 三、 导航守卫 
  // router.beforeEach((to, from, next) => { 
  //   1 判断访问的是不是  登录页面:如果是 next()放行
  //   2、不是登录页面 获取token
  //   3、if(token){next() 放行}   
  //   4、else next('/login') 调回登录页   
    
  // 四 导出  export default router