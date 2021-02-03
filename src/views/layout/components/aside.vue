<template>
  <el-menu
      default-active="/"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      >

      <el-menu-item index="">
        <i class="iconfont iconshouyex"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="iconfont iconneirongshenhe"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont iconxiugaisucai"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="publish">
        <i class="iconfont iconfabu"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="comment">
        <i class="iconfont iconpinglun"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="fans">
        <i class="iconfont iconbianpinghuatubiaosheji-"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="settings">
        <i class="iconfont icongeren"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name:'AppAside',
    components:{},
    props:['is-collapse'],
    data() {
      return {
        // isCollapse:true
      }
    },
    methods: {
     
    }
}
</script>

<style>
.el-menu-item {
    display: flex;
    /* text-align: center; */
    align-items: center;
}
.iconfont{
  margin-right: 10px;
}

</style>