<template>
  <div class="login">
    <!-- 1、和justify主轴对齐方式 -->
    <!-- 2、align 垂直对齐方式 -->
<el-row type="flex" justify="center" align="middle" class="login-row"> 
  <!-- 把span去掉  改成响应式 -->
  <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
  <el-form :model="loginForm" 
  :rules="rules" 
   ref="loginForm" 
   label-width="100px" 
   class="login-form"
   label-position="top"
    > 
  <el-form-item label="用户名" prop="username">
    <el-input v-model="loginForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="loginForm.password" type="password" ></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
    <el-button @click="resetForm('loginForm')">重置</el-button>
  </el-form-item>
  </el-form>
  </el-col>
</el-row>
    </div>
  
</template> 

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        // 用户名
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "用户名长度在 5 到 12个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      //  改造
      
      try{
        const valid=await this.$refs[formName].validate()
       console.log(valid);
          if (!valid) {
          return;
        }
        // 成功
        // console.log(this.loginForm);
        // 给后台传数据拿数据
        const res = await axios.post(
          "http://localhost:8888/api/private/v1/login",
          this.loginForm
        );
        console.log(res);
        if (res.data.meta.status === 200) {
          // 登录跳转之前存贮
          localStorage.setItem("token", res.data.data.token);
          //  成功跳转到首页
          // this.$router.push('/home')
          // name方式
          this.$router.push({ name: "home" });
        } else {
          // 登录失败提示信息
          console.log(res.data.meta.msg);
          this.$message({
            message: res.data.meta.msg,
            type: "error",
            duration: 1000
          });
        }

      }catch(e){
       console.log("表单验证失败了",e);
       
      }
      

      // this.$refs[formName].validate(async valid => {
      //   // console.log(valid);
      //   if (!valid) {
      //     return;
      //   }
      //   // 成功
      //   // console.log(this.loginForm);
      //   // 给后台传数据拿数据
      //   const res = await axios.post(
      //     "http://localhost:8888/api/private/v1/login",
      //     this.loginForm
      //   );
      //   console.log(res);
      //   if (res.data.meta.status === 200) {
      //     // 登录跳转之前存贮
      //     localStorage.setItem("token", res.data.data.token);
      //     //  成功跳转到首页
      //     // this.$router.push('/home')
      //     // name方式
      //     this.$router.push({ name: "home" });
      //   } else {
      //     // 登录失败提示信息
      //     console.log(res.data.meta.msg);
      //     this.$message({
      //       message: res.data.meta.msg,
      //       type: "error",
      //       duration: 1000
      //     });
      //   }
      // });


    }
    
    
    
    
    
     
    
    
    
    
    ,
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.login {
  height: 100%;
  background-color: #2d434c;
}
.login-row {
  height: 100%;
}
.login-form {
  min-width: 380px;
  padding: 30px 20px;
  border-radius: 10px;
  background-color: #fff;
}

   /* 1表单 */
   /* 1、布局把表单放到 
      <el-row   布局方式 type="flex" 主轴justify="center" 侧轴align="middle" class="login-row">行
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6"> 响应式布局里面 */
     /* <el-form></el-form>表单最外面  （很多样式都是右el-form设置的）   
           :model="loginForm" 表单数据对象
           :rules="rules" 表单验证规则
           label-width="100px" 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值
           class="demo-loginForm" 样式，带有 demo 样式，一般都不起作用
           label-position="top" 设置表单域标签的位置，设置为 顶部
     <el-form-item> 表单中的每一行组件
         label="活动名称" 标签文本（表单中每一个表单项的描述文字）
         prop="name" 表单域 model 字段，
          在使用 validate（表单校验）、resetFields（重置表单） 方法的情况下，该属性是必填的
          登录按钮（注册事件）  <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          重置按钮 （注册事件）  <el-button @click="resetForm('loginForm')">重置</el-button> 
     
      总结：  1、<el-form>表单最重要的两项（传输数据功能）
                （1）、:model="loginForm" 表单数据对象  ===========》data() { loginForm:{ username: '', password: ''}    }
                （2）、 :rules="rules" 表单验证规则    ===========> data() {  rules: {username:[{true, message: '请输入用户名', trigger: 'blur'}], password:[{}] }
                 (3)     ref="login"  通过两个按钮事件函数传递"login" 字符串 login用来获取el-form组件的
             2、 <el-form-item  prop="username">  prop表单重置和校验时用 
             3、 <el-input>   v-model="loginForm.name   数据双向双向绑定用       
             4、 <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                              methods（）{ 登录方法 submitForm (formName) { 
                                        1、表单校验：this.$refs[formName].validate()
                                             this.$refs[formName]获取到组件对象
                                             this.$refs.loginForm 也可以获取到组件的对象
                                        2、表单验证成功后发送请求  
                                           const res=await axios.post("地址"，{}) {}===this.Login 
                                           成功 ：  res.data.meta.status==200
                                               1、设置本地   token  localStorage.setItem('token', res.data.data.token)
                                               2、页面跳转   this.$router.push({ name: 'home' })
                                           失败  ： 弹框： this.$message({
                                                      message: res.data.meta.msg,
                                                       type: 'error',
                                                       duration: 1000 })
                                               }
                   记忆： 1、获取组件（ref）：this.$refs[formName]   变量获取
                          2、表单校验 :validate()  
                           3 axios.post(地址，对象)====》返回res     
                           4、 res.data.meta.status==200  成功
                                (1)设置本地token
                                 (2)页面跳转
                           5、 弹框： this.$message {3个键值对}  
                           6、表单重置   ：组件.resetFields()   
             5、 <el-button @click="resetForm('login')">重置</el-button>
                            methods(){  this.$refs[formName].resetFields() }
                   记忆:  1、获取组件（ref）：this.$ref.loginFo    
                           2、表单重置 ：组件.resetFields()              */
  


</style> 

