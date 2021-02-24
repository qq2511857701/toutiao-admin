<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- from表单 -->
      <el-form size="small" ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <!-- el-radio 默认吧label作文文本和选中之后的value值 -->
            <el-radio v-for="(item,index) in formList" :key="index" :label="item.value" :value="item.value">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择活动区域">
            <!-- 只有表格可以帮你遍历  其他的要自己写遍历 -->
            <el-option :label="item.name" v-for="(item,index) in channels" :key="index" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="onSubmit">立即查询</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card2">
      <div slot="header" class="clearfix">根据筛选条件查找出数据{{total_count}}条</div>
      <!-- table栏 数据列表-->
      <!-- table 表格数据 -->
      <!-- 1 把需要的数组列表数据绑定给table组件的data属性 -->
      <!-- 注意 不要用v-for去遍历  因为已经内部已经自己遍历过了 -->
      <!-- 2 设计表格列 el-table-colum -->
      <!-- width 可以设定表格列的宽度 -->
      <!-- label可以设定列的标题 -->
      <!-- prop 用来是定要渲染的列表项数数据阻断 -->
      <!-- 3 表格默认只能渲染普通文本 如果要展示其他内容 例如放个按钮  放个图片 那就要自定义表格列模板 -->
      <el-table :data="articleList" stripe border style="width: 100%" v-loading="loading">
        <el-table-column class="Cover" prop="" label="封面" width="180">
          <!-- scope.row 拿到当前遍历的对象 -->
            <template slot-scope = "scope" > 
                <!-- 如果是在运行期间改变的 而本地图片是在打包就存在 -->
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.cover.images[0]"
                  fit="cover"
                  lazy
                  >
                  <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                  </div>
                </el-image>
                <!-- <img v-if="scope.row.cover.images[0]" class="articleCover" :src="scope.row.cover.images[0]?scope.row.cover.images[0]:'../../image/404.png'" alt=""> -->
                <!-- <img v-else class="articleCover" src="../../image/404.png" alt=""> -->
            </template>  
         </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
       <!-- 如果需要在自定义列模板使用当前遍历数据 那么就在temp
        声明  slot-scope = "scope" 会给三个值  row 本对象 $index坐标-->
        <el-table-column label="状态"
          ><template slot-scope = "scope">
            <!-- <el-tag  v-if="scope.row.status === 0"> 草稿 </el-tag>
            <el-tag v-else-if="scope.row.status === 1"> 待审核 </el-tag>
            <el-tag  v-else-if="scope.row.status === 2"> 审核通过 </el-tag>
            <el-tag  v-else-if="scope.row.status === 3"> 审核失败 </el-tag>
            <el-tag  v-else-if="scope.row.status === 4"> 已删除 </el-tag>
            <el-tag> 张天琦 永远的神</el-tag> -->
            <!-- 此处scope.row.status拿到每项的suatus正好和articleStatus坐标索引一样 -->
            <el-tag :type="articleStatus[scope.row.status].type"> {{articleStatus[scope.row.status].text}} </el-tag>

          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              circle
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="handleDelete(scope)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 列表分页 -->
      <el-pagination @current-change = "onCurrent" :disabled="loading" :pageSize="pageSize" layout="prev, pager, next" background :total="total_count">
      </el-pagination>
    </el-card>
  </div>
</template>


<script>
import request from "@/utils/request.js";
import article from "@/api/article.js";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        desc: "",
      },
      formList:[
        {name:'全部',value:2},
        {name:'草稿',value:1},
        {name:'待审核',value:3},
        {name:'审核失败',value:4},
        {name:'已删除',value:5},
        {name:'加油',value:6},
        {name:'张天琦',value:7}
        ],
      articleList: [],
      // 处理返回Status的值
      articleStatus: [
        // { status:0, text:'草稿', type:"warning"},
        // { status:2, text:'待审核'},
        // { status:3, text:'审核通过',type:"success"},
        // { status:4, text:'审核失败',type:"danger"},
        // { status:5, text:'已删除',type:"info"},
        { text:'草稿', type:'warning'},
        { text:'待审核'},
        { text:'审核通过',type:'success'},
        { text:'审核失败',type:'danger'},
        { text:'已删除',type:'info'},
      ],
      // 分页列表总数据
      total_count:null,
      pageSize:20,
      // 频道列表数据
      channels:[],
      channelId:2,
      // 状态筛选的值
      status:2,
      // 筛选范围日期
      rangeDate:null,
      // 加载处理
      loading:true,
      // 加载过程 下面分页按钮禁止选中
      id:null

    };
  },
  created() {
    this.getArticle(1);
    this.getArticleChannels()
  },
  methods: {
    onSubmit() {
      this.getArticle(1) 

    },
    // 发送请求数据
    getArticle(page) {
      this.loading = true
      // 此处正在loading请求 应该把分页按钮禁用
      this.disabled = true
      article.getArticle({
       page,
       per_page : this.pageSize,
       status : this.status,
       channel_id : this.channelId,
       begin_pubdate : this.rangeDate ? this.rangeDate[0] : null,
       end_pubdate : this.rangeDate ? this.rangeDate[1] : null
      }).then((res) => {
        this.articleList = res.data.data.results;
        this.total_count = res.data.data.total_count
        this.loading = false
      });
    },
    onCurrent(page) {
      this.getArticle(page)
    },
    // 发送频道列表数据
    getArticleChannels() {
      article.getArticleChannels().then((res) => {
        this.channels = res.data.data.channels
        let channelsNewList = {id:0,name:"全部"}
        this.channels.unshift(channelsNewList)
      })
    },
    // 删除记录按钮
    handleDelete (scope) {
      console.log('删除',scope);
      // 此处如果想拿到本行记录  那么就要在上面的template地方加上 slot-scope="scope"
      console.log(scope.$index,scope.row);
      let scopeId = scope.row.id
      this.$confirm('确认删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) =>{
          this.getdelete(scopeId)
          this.articleList.splice(scope.$index,1)
        }).catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      
    },
    // 调用删除接口
    getdelete(articleId) {
      console.log(articleId);
      
       article.getdelete(articleId).then((res) => {
         console.log(res);
         if(res.status == 200) {
           this.$message.success('成功删除')
         }else {
           this.$message.warning('删除失败')
         }
          
      })
    },
    // 编辑按钮
    handleEdit(index,row) {
      console.log(index,row);
      this.id = row.id
      // let id = row.id
      // this.$router.push({path:'/publish',query:{id:this.id}})
      this.$router.push(`/publish?id=${this.id}`)
      
    },
  },
};
</script>

<style lang="less">
.box-card2 {
  margin: 20px 0;
   
  
}
 .articleCover{
    width: 100px;
    background-size:cover;
    height: 80px;
  }
</style>