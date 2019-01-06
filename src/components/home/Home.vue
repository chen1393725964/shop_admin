<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header class="home-header">
     <!-- el-row 行el-col 列-->
     <!-- 一行三列 -->
      <el-row type="flex" align="middle" >
        <el-col :span="6" > 
          <img src="@/assets/imgs/logo.png" alt>
        </el-col>
        <el-col > 
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="6">
          <div>
           <span>欢迎上海前端31期星曜会员</span> 
            <a href="javascript:;" class="logout"  @click="logout">退出</a>
          </div>
        </el-col>
      </el-row> 
    </el-header>
    <el-container>
       <!-- 侧边栏 -->
    <el-aside width="200px" class="home-aside">
       <!-- 菜单组件 -->
       <!-- :router启用路由模式 -->
      <el-menu default-active="2" 
      class="el-menu-vertical-demo" 
      background-color="#545c64"
      text-color="#fff" 
      active-text-color="#ffd04b"
      :router="true"
      > 
        <!-- 菜单 -->
        <!-- 第一个 -->
        <!-- 可展开的组件 -->
      <el-submenu index="1">
        <!-- 指定了菜单的名称  静态 -->
        <template slot="title"> 
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
       <!-- 可点击的组件 二级菜单  动态可点击-->
           <!-- 用户列表   -->
          <el-menu-item index="users">
             <template slot="title"> 
                  <i class="el-icon-menu"></i>
                  <span>用户列表</span>
               </template>
           </el-menu-item>              
      </el-submenu>   
    </el-menu>
    <!-- 第二个 -->
     
    <el-menu default-active="2" 
      class="el-menu-vertical-demo" 
      background-color="#545c64"
      text-color="#fff" 
      active-text-color="#ffd04b"
      :router="true"
      > 
        <!-- 菜单 -->
        <!-- 第一个 权限管理 -->
        <!-- 可展开的组件 -->
      <el-submenu index="2">
        <!-- 指定了菜单的名称  静态 -->
        <template slot="title"> 
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
       <!-- 可点击的组件 二级菜单  动态可点击-->
           <!-- 用户列表   -->
          <el-menu-item index="roles">
             <template slot="title"> 
                  <i class="el-icon-menu"></i>
                  <span>角色列表</span>
               </template>
           </el-menu-item>
             <el-menu-item index="rights">
             <template slot="title"> 
                  <i class="el-icon-menu"></i>
                  <span>权限列表</span>
               </template>
           </el-menu-item>                
      </el-submenu>   
    </el-menu>

    </el-aside>
    <!-- 主要部分 -->
    <el-main>
      <!-- 子路由出口 -->
      <router-view></router-view>
    </el-main>
   </el-container>
</el-container> 
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        //  不需要res
        await this.$confirm("您是否确定退出?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        // 退出登录逻辑
        this.$router.push("./login");
        localStorage.removeItem("token");
      } catch (e) {}

      // 成功
      // this.$message({
      //   type: 'success',
      //   message: '删除成功!'
      // });

      // 失败
      // this.$message({
      //   type: 'info',
      //   message: '已取消删除'
      // });
    }
  }
};
</script>

<style>
.home-container {
  background-color: #eaeef1;
  height: 100%;
}
.home-header {
  background-color: #b3c1cd;
}
.home-header img {
  width: 200px;
}
.home-header h1 {
  margin: 0;
  color: #fff;
  font-size: 28px;
  font-weight: bolder;
  text-align: center;
}
.home-header div {
  font-weight: bolder;
  min-width: 235px;
}
.home-header .logout {
  color: #daa520;
}

.home-aside {
  background-color: #545c64;
}
.el-header {
  padding-left: 0;
}

/*  = 1、  container 布局容器布局第四个  */
/* 最外面   <el-container> */
/*    （1）、上面     <el-heade>
          （2）、下面    <el-containerr>(<el-aside> <el-main>) */
/* 2、  layout布局 */
/* 头部区域     */
/* <el-row type="flex" align="middle>  flex布局 居中对齐 行 
             <el-col :span="6"> </el-col>
             <el-col> 自适应</el-col>
             <el-col :span="6"> </el-col>
          </el-row> */
/* 3、  <el-aside> 侧边栏  */
/*      <el-menu> 菜单组件 
              default-active="2" 设置默认菜单高亮，值是el-menu-item的index值
            @open="handleOpen"    菜单展开事件
            @close="handleClose"  菜单收起事件
            background-color="#545c64" 菜单背景色
            text-color="#fff" 菜单文字颜色
            active-text-color="#ffd04b" 菜单高亮文字颜色
            :router="true" 启用Vue的路由模式，启用后，会以 index 值作为路由的哈希值        
       <el-submenu>  index="1"选中状态  二级菜单，也就是一个可以展开收起的组件。
       <el-menu-item>   index="roles"  可以配置路由  可点击的菜单项组件 */
           /* <el-menu> 
              <el-submenu>  */
                  /* <el-submenu> 二级菜单自己的信息 */
                      /* <template slot="title"> 
                      <i class="el-icon-location"></i>
                      <span>用户管理</span>
                      </template> */
                      /* 可点击的单项组件 和 */
                      /* <el-menu-item index="users">
                          <template slot="title"> 
                              <i class="el-icon-menu"></i>
                               <span>用户列表</span>
                          </template>
                      </el-menu-item>

                <el-submenu> 
          <el-menu>     */
        /* 总结：侧边展开菜单的很多信息都是由 <el-menu>设置的 */



</style>








