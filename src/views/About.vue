<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="center">
      <Spinner/>
      <LoadingFlower/>
      <input ref="upload" name="file" type="file" accept="image/*" multiple @change="upload($event)">
      <Progress
      class="circle-progress"
      :canvasId="progress.canvasId"
      :width="progress.width"
      :height="progress.height"
      :options="progress.options"
      >
        <div slot="text" class="circle-progress-text">{{percent}}%</div>
      </Progress>
      <Sign
      :width="sign.width"
      :height="sign.height"
      />
    </div>
  </div>
</template>
<script>
import axios from '@/axios/index'
import Spinner from '@/components/Spinner'
import LoadingFlower from '@/components/LoadingFlower'
import Progress from '@/components/Progress'
import Sign from '@/components/Sign'
export default {
  metaInfo: {
    title: 'We Inc',
    meta: [
      {
        name: 'keywords',
        content: '关键字1,关键字2,关键字3'
      },
      {
        name: 'description',
        content: '这是一段网页的描述'
      }
    ]
  },
  name:"about",
  components:{Spinner,LoadingFlower,Progress,Sign},
  data(){
    return{
      progress:{
        width:300,
        height:300,
        canvasId:"canvasId",
        options:{
          type:'stroke',// fill/stroke/rect
          color: "rgba(66, 185, 131, 1)",
          bgColor: "rgba(66, 185, 131, 0.1)",
          lineWidth: 10,
          nowVal: 0,
          totalVal: 100,
          radius: 100,
          tofixed:2
        }
      },
      sign:{
        width:window.screen.width-20,
        height:500,
      },
      timer:null
    }
  },
  computed:{
    percent(){
      return ((this.progress.options.nowVal / this.progress.options.totalVal) * 100).toFixed(this.progress.options.tofixed);
    }
  },
  mounted() {
    // this.changeProgress()
  },
  beforeDestroyed(){
    this.timer &&　clearInterval(this.timer);
  },
  methods: {
    changeProgress(){
      this.timer = setInterval(()=>{
        if(this.progress.options.nowVal==this.progress.options.totalVal){
          clearInterval(this.timer);
          return;
        }
        this.progress.options.nowVal++;
      },100)
    },
    upload(event){
            let file = event.currentTarget.files[0];
            if(!file){
              return
            }
            var form = new FormData()
            form.append('file', file)
            // form.append('id', id)
            // form.append('type', type)
            var config = {
                onUploadProgress: progressEvent => {
                    // var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                    // this.progress = complete
                    this.progress.options.nowVal = progressEvent.loaded;
                    this.progress.options.totalVal = progressEvent.total;
                },
                // onDownloadProgress: function (progressEvent) {
                //     // Do whatever you want with the native progress event
                // },
            }
            axios.post(`/add_travel/test`,
                form, config).then((res) => {
                if (res.data.code === 1) {
                  this.$refs.upload.value="";
                  console.log("上传成功！")
                }
            }).catch(err=>{
              this.progress.options.nowVal = 0;
              this.progress.options.totalVal = 100;
              this.$refs.upload.value="";
              console.log("上传失败！");
              console.log(err)
            })
        }
  },
}
</script>
<style lang="scss" scoped>
.about{
.center {
  @include flex-center-center;
  flex-direction: column;
  .circle-progress{
    display: block;
    // @include flex-center-center;
    // position: relative;
    .circle-progress-text{
      // @include position-center-center;
      // width: 6rem;
      width: 100%;
      text-align: center;
      font-size:2rem;
    }
  }
}
}

</style>
