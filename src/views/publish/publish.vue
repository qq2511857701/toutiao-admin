<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id?'修改文章':'内容管理'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        :model="article"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">

            <el-tiptap placeholder="请输入文章内容" height = "400" :extensions="extensions" v-model="article.content"></el-tiptap>

          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
        </el-form-item>
        <el-form-item label="封面" >
          <el-radio-group v-model="article.cover.type">
            <el-radio
              v-for="(cover, index) in covers"
              :key="index"
              :label="cover.value"
              >{{ cover.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="channels.name"
              :value="channels.id"
              v-for="(channels, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(false )">{{$route.query.id?'修改':'发送'}}</el-button>
          <el-button @click="submitForm(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import article from "@/api/article.js";
import { uploadImage } from "@/api/image.js"
// import element-tiptap 样式
// import 'element-tiptap/lib/index.css';
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TextColor,
  Image
} from 'element-tiptap';
export default {
  components: {
    "el-tiptap": ElementTiptap,
  },
  data() {
    return {
      covers: [
        { name: "单图", value: 1 },
        { name: "三图", value: 3 },
        { name: "无图", value: 0 },
        { name: "自动", value: -1 },
      ],
      // 频道列表数据
      channels: [],
      article: {
        title: "", //文章标题
        content: "",
        coverType:'',
        cover: {
          type: 0, //封面类型
          // -1 自动 0 无图 1-1 张 3-3 张
          images: [], //封面图片的地址
        }, //文章内容
        channel_id: null, //文章id
      },
      draft: false,
      rules: {
        title: [
          { required: true, message: "请输入标题名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          // 自定义校验
          {
            validator (rule, value, callback) {
            if(value === '<p></p>') {
              callback(new Error('请输入文章内容'))
             }else {
               callback()
             }
          }
          }
          
          ],
        channel_id: [
          { required: true, message: "请选择频道", trigger: "blur" },
        ],
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TextColor(),
        new Image({
            // 默认会把图片生成base64
          uploadRequest(file) {
            const fd = new FormData()
            console.log(fd);
            fd.append('image',file)
            return uploadImage(fd).then (res => {
              console.log(res);
              return res.data.data.url
            }) 
            
          }
        }
        )
      ],
      // 编辑器的内容
      content: `
        <h1>Heading</h1>
        <p>This Editor is awesome!</p>
      `,
    };
  },
  created() {
    this.getArticleChannels();
    // 由于发布和编辑使用的同一个组件 所以这里要判断
    // 如果这个路由路径有id则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle();
    }
  },
  methods: {
    // 发送频道列表数据
    getArticleChannels() {
      article.getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
        let channelsNewList = { id: 0, name: "全部" };
        this.channels.unshift(channelsNewList);
      });
    },
    // 发表接口
    getaddAticle(draft) {
      this.draft = draft;
      const atcicleId = this.$route.query.id;
      // 如果是修改文章页面则调用这个接口
      if (this.$route.query.id) {
        article
          .getupCreated(atcicleId, this.article, this.draft)
          .then((res) => {
            if (this.draft) {
              this.$message.success("存入草稿");
            } else {
              this.$message.success("修改成功");
            }
            console.log(res);
            this.$router.push("/article");
          });
      } else {
        article.getcreated(this.article, this.draft).then((res) => {
          console.log(res);
          if (this.draft) {
            this.$message.success("存入草稿");
          } else {
            this.$message.success("发布成功");
          }

          this.$router.push("/article");
        });
      }
    },
    submitForm(draft) {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.getaddAticle(draft);
          console.log(draft);
          return;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 如果有id的话根据id发送请求拿到要修改的页面数据
    loadArticle() {
      article.getarticleIdList(this.$route.query.id).then((res) => {
        console.log(res);
        this.article = res.data.data;
        console.log(this.article);
      });
    },
  },
};
</script>

<style>
</style>