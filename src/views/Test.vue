<template>
  <div class="test">
    <h1 class="animated fadeInLeft">Example</h1>
    <!-- <h1 class="animated infinite bounceIn delay-2s">Example</h1> -->
    <div class="animated fadeInRight">
      <button class="animated infinite wobble my-smile" @click="show = !show">
        😀
      </button>
    </div>
    <div class="animated fadeInLeft">
      <transition-group
        name="list-complete"
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeInDown"
        tap="div"
      >
        <!-- enter-active-class="animated rotateInDownLeft"
        leave-active-class="animated rotateOutDownLeft" -->
        <h1 v-show="show" v-for="item of testList" :key="item" class="list-complete-item">{{item}}</h1>
      </transition-group>
    </div>
    <div class="animated fadeInLeft">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated rotateInDownLeft"
        leave-active-class="animated rotateOutDownLeft"
      >
        <h1 v-show="show">unShow me!</h1>
      </transition>
    </div>
    <div class="animated fadeInLeft">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated rotateInDownLeft"
        leave-active-class="animated rotateOutDownLeft"
      >
        <h1 v-show="!show">Show me!</h1>
      </transition>
    </div>
    <div class="animated fadeInRight">
      <el-button type="primary" plain @click="showDialog">按钮</el-button>
      <el-button type="success" round plain>成功按钮</el-button>
      <el-button icon="el-icon-delete" circle plain></el-button>
    </div>
    <div class="animated fadeInLeft my-tab">
      <el-tabs type="border-card" tab-position="left" class="my-tab-left">
        <el-tab-pane label="a"></el-tab-pane>
        <el-tab-pane label="b"></el-tab-pane>
        <el-tab-pane label="c"></el-tab-pane>
        <el-tab-pane label="d"></el-tab-pane>
      </el-tabs>
      <section class="my-tab-right">3498394839</section>
    </div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button type="success" round plain>点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <el-button
      @click="$router.push('/#maodian')"
      size="small"
      round
      type="primary"
      >点我</el-button
    >
    <el-radio-group v-model="radio">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
    <el-link :underline="false"> <i class="el-icon-edit"></i>编辑 </el-link>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
      <el-breadcrumb-item>a</el-breadcrumb-item>
      <el-breadcrumb-item>b</el-breadcrumb-item>
      <el-breadcrumb-item>c</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      circle
      class="el-icon-arrow-left"
      :disabled="currentPage == 1"
      @click="currentPage--"
    ></el-button>
    {{ currentPage }} / {{ pageCount }}
    <el-button
      circle
      class="el-icon-arrow-right"
      :disabled="pageCount == currentPage"
      @click="currentPage++"
    ></el-button>
    <pdf
      src="http://cqdmfund.oss-cn-beijing.aliyuncs.com/avatar%2F2019%2F03%2F06%2Fgnml81aMOL819iYqvbMGimqAeLkjARasWQqUsXDm.pdf?OSSAccessKeyId=LTAINTPvtD6319Ui&Signature=LkgFxJFi5%2FK65%2F3VH6ElIO76hN4%3D&Expires=1867483816"
      :page="currentPage"
      :rotate="0"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
    ></pdf>
    <el-button type="primary">签字确认</el-button>
    <p>
      hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
    </p>
  </div>
</template>
<script>
import { __test } from '@/api'
import pdf from 'vue-pdf'
import Mock from 'mockjs'
import { isArray } from 'util';
export default {
  name: 'test',
  components: {
    pdf
  },
  data() {
    return {
      timer:null,
      testList:[0],
      testNum:0,
      currentPage: 1,
      pageCount: 0,
      radio: 3,
      show: true,
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      mockData: '3232'
    }
  },
  created() {
    this.mockData = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|1-10': [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1
        }
      ]
    })
    console.log(this.mockData)
    this.test()
  },
  mounted(){
    this.timer = window.setInterval(()=>{
      if(this.testNum===100){
        window.clearInterval(this.timer);
        return;
      }
      this.testNum++
      this.testList.splice(0,0,this.testNum);
    },1000)
  },
  methods: {
    //异步回调解决方案
    async test() {
      let res = await __test({ userid: 'o-1datgam3s-HZQQ1Rcmw' })
      console.log(res.data)
      res.data = 0
      console.log(res.data)
      res = await __test({ userid: 'o-1datgam3s-HZQQ1Rcmw' })
      console.log(res.data)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    showDialog() {
      this.$confirm('确定吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: 'true',
        customClass: 'my-class'
      })
        .then(() => {
          this.$message({
            message: '成功',
            type: 'success'
          })
        })
        .catch(() => {
          this.$message({
            message: '失败',
            type: 'error'
          })
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/stylus/_mixin'
flex-start-center()
  display flex
  justify-content flex-start
  align-items center
.test
  p
    width 100%;
    height 10px;
    ellipsis(2)
  .my-smile
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    font-size: 48px;
    &:focus
      outline: none !important;
  .el-tabs--border-card
    ::v-deep .el-tabs__header
      background-color: #606266;
      border-bottom: 1px solid #606266;
      margin: 0;
  .my-tab
    border: 1px solid #cccccc;
    width: 100%;
    // @include flex-start-center;
    flex-start-center()
    .my-tab-left
      width: auto;
    .my-tab-right
      width: auto;
.list-complete-item {
  transition: all 1s;
  // display: inline-block;
  // margin-top: 10px;
}
.list-complete-enter{

}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  // transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
