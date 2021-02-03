<template>
  <div class="layout">
    <el-container class="container">
      <el-aside width="auto"><app-aside :is-collapse="isCollapse" class="aside-menu" /></el-aside>
      <el-container>
        <el-header>
                <i :class="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'" @click="handlenav" ></i>
                <div>江苏苏州天下科技有限公司</div>
                <el-dropdown class="el-dropdown">
                  <div class="image"><img class="images" :src="user.photo" alt=""></div>
                  <span v-if="user.name">{{user.name}}</span>
                  <span v-else>请登录</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>设置</el-dropdown-item>
                    <!-- 组件默认是不识别原生的  如果想的话加上.navtive -->
                    <el-dropdown-item @click.native="handleonLogot">退出</el-dropdown-item>   
                  </el-dropdown-menu>
              </el-dropdown>
          </el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view></router-view>
          </el-main
        >
      </el-container>
    </el-container>
  </div>
</template>


<script>
// 引入组件
import AppAside from './components/aside'
import user from '@/api/user'

export default {
  name: "layoutIndex",
  components: {AppAside},
  data() {
    return {
      user:{},//当前登录用户数据
      isCollapse:true //侧边栏菜单栏的展示状态
    };
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    // 除了登录接口 其他所有接口需要授权才能请求使用 或者说处理登录接口其他请求都需要
    getUserProfile() {
      user
      .getUserProfile()
      .then(res=> {
        console.log(res)
        this.user = res.data.data
      })
    },
    // 导航折叠 
    handlenav() {
      this.isCollapse = !this.isCollapse 
    },
    // 退出
    handleonLogot() {
      console.log('退出');
         this.$confirm('此操作退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          // 把用户登录状态清除
          window.localStorage.removeItem('user')
          // 跳转到登录页面
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }
  },
};






</script>




<style>
.el-header{
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px; */
  background-color: #e6ecf2;
}

body > .el-container {
  margin-bottom: 40px;
}
.container {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}
.aside-menu{
  height: 100%;
}
.image{
  display: flex;
  align-items: center;
  margin-right: 10px;
 
}
.images{
   width: 45px;
  height: 45px;
  border-radius:50% ;
}
.el-dropdown{
  display: flex;
  align-items: center;
 
}
</style>