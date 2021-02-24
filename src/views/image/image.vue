<template>
  <div class="image_container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        >
      </div>

        <div>
          <el-radio-group v-model="radio" size="mini">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="收藏"></el-radio-button>
          </el-radio-group>
          <el-button type="success">添加素材</el-button>
        </div> 
        <el-row :gutter="10" >
          <el-col  :xs="12" :sm="8" :md="6" :lg="4"><el-image style="width: 100px; height: 100px" src="../../image/lp.JPG" fit="cover"></el-image></el-col>
          <el-col  :xs="12" :sm="8" :md="6" :lg="4"><el-image style="width: 100px; height: 100px" src="../../image/lp.JPG" fit="cover"></el-image></el-col>
          <el-col  :xs="12" :sm="8" :md="6" :lg="4"><el-image style="width: 100px; height: 100px" src="../../image/lp.JPG" fit="cover"></el-image></el-col>
          <el-col  :xs="12" :sm="8" :md="6" :lg="4"><el-image style="width: 100px; height: 100px" src="../../image/lp.JPG" fit="cover"></el-image></el-col>
         
        </el-row>
        

    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      radio: "",
    };
  },
};
</script>

<style>
</style>