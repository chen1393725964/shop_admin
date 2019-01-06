   

// 导入axios
// import axios from "axios";

export default {
  // 进入页面发请求
  // 传入参数当前页
  created() {
    this.getUserList();
  },

  data() {
    return {
      //  用户列表数据
      userList: [], //后台请求数据返回修改
      // 下面三条是渲染分页的(根据这三个数据进行渲染)
      // 总条数
      total: 0, //后台请求数据返回修改
      //  每页大小  固定的
      pagesize: 3,
      // 当前页
      pagenum: 1, //后台请求数据返回修改
      //  input框
      searchText: "",
      //  添加用户的表单
      isShowUserAddDialog: false,
      userAddForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "用户名长度为5到12个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6到12个字符", trigger: "blur" }
        ],
        email: [
          // 通过 pattern 来指定一个正则表达式来对表单进行验证
          {
            pattern: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }
        ]
      },
        // 编辑用户的表单
        isShowUserEditialog: false,
        userEditForm: {
          username:"",
          id:"",
          email:"",
          mobile:""
        },
        formLabelWidth: '120px' 

    };
  },
  methods: {
    // 1、获取分页数据并渲染数据列表
    async getUserList(pagenum = 1, query ="") {
      const url = "/users";
      const options = {
        // 和后台交互的参数的数据
        params: {
          // 查询条件
          query, // 可以为空
          //  当前页
          pagenum, //  点击分页标签的回调参数this.getUserList(curPage)传进来
          //  每页条数
          pagesize: 3 //固定的
        }
        // 通过请求头，传递token 判断是否登陆过
        // headers: {
        //   Authorization: localStorage.getItem("token")
        // }
      };
      // 改1(axios请求axios=====>this.$http)
      const res = await this.$http.get(url, options);
      //  用户列表数据
      console.log("用户列表数据", res);
      // 成功
      if (res.data.meta.status === 200) {
        //  获取数据成功(根据回调返回的数据修改data的数据=>分页标签的数据)
        this.userList = res.data.data.users;
        // 设置总条数
        this.total = res.data.data.total;
        // 设置当前页
        this.pagenum = res.data.data.pagenum;
        // 失败
      } else {
        //  调回登录页面，清除无用的token
        this.$router.push("/login");
        localStorage.removeItem("token");
      }
    },

    //  2、当你点击的时候就会触发 curPage返回当前页  curPage回调参数（自动生成）
    changePage(curPage) {
      // console.log('分页切换了',curPage);
      this.getUserList(curPage, this.searchText);
    },
    // 3、切换用户状态
    async changeUserState(user) {
      // console.log(" changeUserState");
      // console.log(user);
      try {
        // 改2(axios请求axios=====>this.$http)
        const res = await this.$http.put(
          `/users/${user.id}/state/${user.mg_state}`,
          null,
          {
            // headers: {
            //   Authorization: localStorage.getItem("token")
            // }
          }
        );
        //  console.log(res);
        //  状态成功
        if (res.data.meta.status === 200) {
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
          // 状态失败（代码没有错误）
        } else {
          this.$message({
            type: "warning",
            message: res.data.meta.msg
          });
        }

        // 代码报错才会走catch
      } catch (e) {
        console.log(err);
        this.$meaage({
          type: "success",
          message: "设置状态失败"
        });
      }
    },
    //  4、添加查询的方法
    search() {
      this.getUserList(1, this.searchText);
    },
    // 5、 添加删除的方法(形参id)
    async delUserById(id) {
      // 弹框
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        // 发请求删除数据
        const res = await this.$http.delete(`/users/${id}`);
        // console.log(res);
        if (res.data.meta.status === 200) {
          // 弹框
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
          // 从新渲染页面
          this.getUserList(1, this.searchText);
        } else {
          this.$message({
            type: "warning",
            message: res.data.meta.msg
          });
        }
      } catch (err) {
        this.$message({
          message: "取消删除",
          type: "info"
        });
      }
    },
    //  6、展示用户表添加对话框
    showUserAddDialog() {
      this.isShowUserAddDialog = true;
    },
    // 7、 添加用户
    async addUser() {
      try {
        //1| 表单校验 await
        await this.$refs.userAddFormRef.validate();
        //  2、发请求await
        const res = await this.$http.post("/users", this.userAddForm);
        console.log(res);
        // 成功三件事 关闭对话框 弹框、渲染、
        if (res.data.meta.status === 201) {
          //  1、关闭对话框
          this.isShowUserAddDialog = false;
          //   2、 弹框
          this.$message({
            type: "success",
            message: res.data.meta.msg
          });
          //  3、重新渲染列表
          this.getUserList(1, this.searchText);
        }
      } catch (err) {
        //  表单校验失败
      }
    },
    // 8、  隐藏对话框重置表单
    hideUserAddDialog() {
         this.$refs.userAddFormRef.resetFields()
    },
      //9、  展示用户编辑状态
    showUserEditDialog(user){
        // 展示对话框变true的过程
       this.isShowUserEditialog=true;
        // 文本框赋值 ===操作数据（推荐采用遍历对象的方法）
        // this.userEditForm.email=user.email
        // this.userEditForm.id=user.id
        // this.userEditForm.mobile=user.mobile
        // this.userEditForm.username=user.username
          // bug key必须声明
          for(let key in this.userEditForm){
              this.userEditForm[key]=user[key]
          }
    },
    //  编辑用户信息(async )  
     async updateUser(){
        // 解构代码
      const {id,email,mobile}=this.userEditForm
      //  console.log("出发",this.userEditForm);
      //  1、发送请求(awaiot)
      const res=await this.$http.put(`users/${id}`,{
          email,
          mobile
      })
      // console.log(res);
      const {meta:{status,msg:message}}=res.data
      if(status===200){
          //  成功三件事  关闭对话框  、弹框提示  刷新数据
           this. isShowUserEditialog=false;
           this.$message({
            message,
            type: 'success'
          }); 
          // 传入实参 在data数据中拿数据即可  this.pagenum 当前页  this.searchText最上面的文本框查询条件
           this.getUserList(this.pagenum,this.searchText)
      }
      
    }
  }
};

// 一  、修改用户状态思路开关组件 （作用域插槽）
//            v-model 用来实现数据双向绑定的
//             scope.row 表示当前行数据
//             mg_state 就是当前用户的状态
//  1、 数据双向绑定     v-model="scope.row.mg_state
//  2、注册change事件并传递参数     @change="changeUserState(scope.row)
// 3、在methods中添加方法    async changeUserState(scope.row){
//   try{
//   const res=await axios("地址"，null,{headers：{ Authorization:localStorage.getItem('token')}})
//      if(res.data.meta.status===200){
//         // 设置弹出框信息
//         this.$messag({
//           type:'success',
//  message: res.data.meta.msg
//         })
//      }else{
// this.$messag({
//           type:'success',
//  message:res.data.meta.msg
//         })
// }
//   }catch(e){

//   }

// }

// 1、  按钮（编辑、删除、分配角色）
//  <el-button> 按钮</el-button>
// 按钮的参数
// size="mini" 按钮的大小
// type="primary" 按钮的样式
// plain 是否朴素按钮（空心，镂空）
// icon="el-icon-edit" 按钮的图标
// 2、开关
//  <el-switch>开关 </el-switch>
// 两条 v-model="scope.row.mg_state"（禁用按钮为表单数据双向绑定）
//      @change="changeUserState(scope.row)" 向后台发送请求
//         scope.row.id
//         scope.row.mg_state

// 3、分页
// 分页标签4个数据 (1、总页数、2、当前页、3、每页条数（固定死了）) 4、事件人出发 （回调返回参数） 数据请求返回 -->
// <el-pagination>分页<el-pagination>
// 4个数据
//   :total="total"
//   :current-page="pagenum"      ======>data(){ return  total, pagenum,pagesize  }
//   :page-size="pagesize"
//   @current-change="changePage" =======>   自带参数
// methods{ changePage (curPage) { 函数体内容是调用封装好的 this.getUserList(curPage)
//  curPage回调参数（自动生成）

// 5、封装获取分页数据的方法
//  1、准备参数   async 函数名（etUserList）(pagenum = 默认第几页){  =============》 准备参数3个参数
//     //     3个参数  1、地址  2、参数  3、token
//    const url=地址
//     const options={
//      params: {
//            query: "", //查询条件|可以为空
//            pagenum, // 当前页、点击分页标签的回调参数  pagenum=this.getUserList(curPage)传进来
//            pagesize: 3 // 每页条数、固定的
//               },
//      headers: {
//          Authorization: localStorage.getItem("token")   拦截数据
//               }
//                   }

//    2、发请求   const res = await axios.get(url, options);  ===================>await  异步请求
//    3、if else 判断（根据状态码判断）
//             // 成功（设置中的三个数据userLis  ）
//         if (res.data.meta.status === 200){
//                   // 所有数据渲染表格的
//               this.userList = res.data.data.users;
//                 // 设置总条数    （给分页）
//                this.total = res.data.data.total;
//                // 设置当前页  （给分页）
//               this.pagenum = res.data.data.pagenum;
//         }    失败的情况
//                else {
//                 调回登录页面，清除无用的token
//                   this.$router.push("/login");
//                  localStorage.removeItem("token");
// }

//  }

//  一、查询功能
// 1、查询逻辑 给按钮注册单击事件search=====search(){ this.getUserList(1,this.searchText) }
//  2、  修改分页给分页添加参数 、应该按照 查询条件生成分页(当前页)
// changePage(currentPage)(){
// // 调用封装好的渲染页面
//  this.getUserList(currentPage,this.searchText)
// }

// 二、删除功能（4次弹框2个await(等待)  try    await弹框    await发请求（后台）  if(弹框 200) else(弹框) catch弹框）
//  1、给删除按钮注册事件   delUserById(scope.row.id)
// 2 methods添加方法   delUserById(id){
//  try======>确定  (1) 弹框 await
//                （2）发请求  await
//                 (3) if 成功 200  弹框 、重新渲染页面 this.searchText(1,searchText)
//                （4）else 失败 弹框
//                   }
//  catch======> 取消   弹框

//  三、添加功能showUserAddDialog
//  1、el-dialog 弹框： :visible.sync="dialogFormVisible 自组件修改父组件数据
//  2、el-form   (1) ：model=" userAddForm"  (username，password，email，mobile)
//               (2)  :rules="rules"
//                (3) ref="userAddFormRef"
//  3、el-form-item prop="username/password/email/mobile"
//  4、el-input v-model=" userAddForm.username/password/email/mobile"

// try=====>    5、表单校验： await this.$ref.userAddFormRef.validate()
//              6、 发送请：  await  const res=await this.$http.post("路径",this.userAddForm)
//              7、成功 201 做三件事
//                     (1)关闭对话框
//                     （2）弹框（提示用户添加成功）
//                      (3)、调用传参 this.getUserList("1",this.searchText)
//  catch=====> error
//              8 给表达注册close事件 @close="showUserEditDialog" 关闭对话框触发
//                  表单重置this.$refs.userAddFormRef.resetFields()


  // 四、编辑功能
   //  一、准备工作
    //  1、编辑对话框  <el-dialog>  :visible.sync="isShowUserAddDialog" 控制显示隐藏
     // 2、<el-form>   :rules="rules" 校验规则 :model="userEditForm"  可以理解表单所有数据 ref="userEditFormRef" 获取组件
     // 3、el-form-item  prop="email/mobile"  表单校验和重置
     // 4、el-input <el-tag >   v-model=" userAddForm.mobile/email"   数据双向绑定
    //  二、逻辑功能   
        // 1、  点击====》编辑按钮注册事件：showUserEditDialog (user){}   user====》调用的时候传进来scope.row(实参)
        // 2、  展示编辑框   变true  el-dialog有个属性变true===> this.isShowUserEditDialog=true 
        // 3、  表格的id对应的数据===》 文本框赋值=====》 userEditForm.mobile/usr.name/id/email
                //  1、手动
                //  2、遍历  
       //  4、 弹框按钮绑定事件    async updateUser(){}(准备发送请求了)    
       //  5、 发请求  await   发请求const res=await this.$http.put(`users/this.userEditForm`,{
                //  双向绑定数据   页面输入=====》userEditForm获取到
          // 6、成功  
              // (1)关闭对话框变false
              // (2)弹框提示用户成功 $meaage
              // (3)刷新当前页方法调用  
      // 三、代码优化 (编辑方法部位进行解构)
      //  1、解构代码 const {id,email,mobile}=this.userEditForm
          //  2、const {meta:{status,msg}}=res.data 
                // 再次简化   const {meta:{status,msg:message}}=res.data          