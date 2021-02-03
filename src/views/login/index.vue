<template>
  <div class="login_container">
    <div class="login_logo"><img src="../../image/logo_index.png" alt=""></div>
    <!-- 配置表单验证 -->
    <!-- 1 必须给el-from 组件绑定model微表单数据对象 -->
    <!-- 2 给需要验证的表单项 el-form-item绑定prop属性 -->
    <!-- 注意prop属性需要绑定表单对象中的数据名称 -->
    <!-- tonggel-from组件的rules属性配置验证规则 -->

    <!-- 手动触发表单验证 -->
    <!-- 1 给el-form 设置ref 随便起名 -->
    <!-- 2 通过ref获得el-from组件 调用组件的validata进行验证 -->
    <el-form ref="login-Form" class="loginForm" :rules="rules" :model="user">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
       <el-form-item prop="checked">
           <el-checkbox v-model="user.checked" >我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" :loading="loading" class="login_btn">点击登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request.js'
// 导入接口请求
import user from '@/api/user.js' 
export default {
  components:{},
  name: "loginIndex",
   data() {
      return {
        user: {
          code:'246810',//验证码
          mobile:'13911111111',//手机号
          checked: true, //默认选中状态
        },
        token:'',
        loading: false, //默认的登陆状态
        rules:{//表单验证规则配置 
         mobile: [
            { required: true, message: '手机号不能为空', trigger: 'change' },
            { pattern: /^1[3-9][0-9]{9}$/, message: '请输入正确的号码', trigger: 'blur' }
          ],
        code:[
            { required: true, message: '验证码不能为空', trigger: 'change' },
            { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
        ],
        checked:[
            // 自定义校验规则
            // 验证通过;callback
            // 验证失败callback(new Error('错误消息'))
            {
            validator: (rule, value, callback) => {
                console.log(value);
                if (value) {
                    callback();
                    } else {
                    callback(new Error('请勾选用户协议'));
                   }
            },
            trigger:'change'
        }
        ]
        }
      }
    },
    methods: {
      onLogin() {
        //   1 获取表单数据
        let user = this.user
        let mobile = this.user.mobile
        // 2 表单验证
        this.$refs['login-Form'].validate((valid,err) => {
            if(!valid) {
                return
            }
            // 验证通过进行登录
            this.login()
        })  
        
      },
      login(){
        //   let mobile = mobile
          // 3 验证通过，提交申请
        // 开启登陆loding
        this.loading=true
        // 将所有的请求都封装成函数然后统一的组织到模块中去进行管理
        // 这样做的好处就是：管理维护更加方便 也好重用
        user
        .getLogin(this.user)
        .then(res => {
            // 将接口返回的数据用户相关数据token存储到本地存储 方便其他页面调用
            // 本地存储只能存储字符串  把他们转成json格式字符串进行存储
            window.localStorage.setItem('user', JSON.stringify(res.data.data))
            this.$message({
            message: '恭喜你，登录成功',
            type: 'success',
           
        });
        this.loading=false
        //  跳转到首页
        // this.$router.push('/layout/index') //第一种方式 通过路径
        this.$router.push({//第二种方式  通过名称跳转
          name:'Home'
        })
        }).catch(err => {
            console.log(err);
             this.$message.error('登录失败手机号或验证码错误');
             this.loading=false
        })
        // 4处理后端相应结果
      }
    }
};
</script>

<style scoped lang="less">
.login_container{
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("../../image/login_bg.jpg")no-repeat;
    background-size: cover;
    .login_logo{
       width: 300px;
    }
    .loginForm{
        background: #fff;
        padding: 20px 68px;
        width: 287px;
        .login_btn{
            width: 100%;
        }
    }
}
</style>