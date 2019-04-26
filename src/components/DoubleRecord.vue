<template>
  <div>
    <div class="double-record">
      <div class="video" v-if="mediaStore.videoSrc">
        <video
          ref="recordedVideo"
          id="recordedVideo"
          :src="mediaStore.videoSrc"
          style="width:100%;background:#000"
          @ended="recordedVideo.playing=false"
        ></video>
        <div class="hg-text-center hg-mt-5">
          <button
            class="hg-btn-blue hg-btn-blue-nor"
            type="button"
            v-if="recordedVideo.playing"
            @click="recordedVideo.ele.pause();recordedVideo.playing=false"
          >停止</button>
          <button
            class="hg-btn-blue hg-btn-blue-nor"
            type="button"
            v-else
            @click="recordedVideo.ele.play();recordedVideo.playing=true"
          >播放</button>
          <div>
            <span class="hg-color-gray hg-pointer" @click="$emit('goBack')">返回上级</span>
          </div>
        </div>
      </div>
      <div class="video" v-else>
        <video ref="video" style="width:100%;background:#000"></video>
        <div class="hg-text-center hg-mt-5">
          <button
            class="hg-btn-blue hg-btn-blue-nor"
            type="button"
            v-if="recording"
            @click="stopRecord"
          >停止录制视频</button>
          <button
            class="hg-btn-blue hg-btn-blue-nor"
            type="button"
            v-else
            @click="startRecord"
          >立即录制视频</button>
          <div>
            <span class="hg-color-gray hg-pointer" @click="$emit('goBack')">返回上级</span>
          </div>
        </div>
      </div>
      <div class="txt">
        <div v-html="html"></div>
      </div>
    </div>
    <!--引导确认框----------------start-------------->
    <el-dialog :visible.sync="confirmShow" class="hg-dialog-sure">
      <div class="hg-pl-30 hg-pr-30 hg-pb-30" style="border-bottom: 1px solid #D7D7D7">
        <div
          style="text-align:center;"
          class="hg-fs-15 hg-fw-600 hg-color-black hg-lh-25"
        >双录视频录制完成,是否上传？</div>
      </div>
      <div class="hg-flex hg-lh-40">
        <div
          class="hg-flex-1 hg-color-gray hg-pointer hg-text-center hg-bor-br hg-fs-15"
          style="border-color: #D7D7D7"
          @click="confirmShow=false"
        >取消</div>
        <div class="hg-flex-1 hg-color-red hg-pointer hg-text-center hg-fs-15" @click="submit">确认</div>
      </div>
    </el-dialog>
    <!--引导确认框----------------end-------------->
  </div>
</template>

<script>
import {
  __product_record_tips,
  __common_media,
  __product_media_store
} from "@/api/index";
import RecordRTC from "recordrtc";
export default {
  name: "doubleRecord",//双录视频
  data() {
    return {
      record: null,
      recording: false,
      html: "",
      video: null,
      blob: "",
      confirmShow: false,
      recordedVideo: {
        playing: false,
        ele: ""
      }
    };
  },
  props: {
    doubleRec: {
      show: false,
      complete: false
    },
    mediaStore: {
      user_product_id: 0,
      media: "",
      videoSrc: ""
    }
  },
  created() {
    //获得双录提示语
    __product_record_tips()
      .then(res => {
        this.html = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.video = this.$refs.video;
    this.recordedVideo.ele = this.$refs.recordedVideo;
    this.getVideo();
  },
  methods: {
    //上传双语视频
    submit() {
      console.log(this.doubleRec);
      let blob = this.blob;
      let formData = new FormData();
      formData.append("file", blob);
      __common_media(formData)
        .then(res => {
          if (res.status === 200) {
            this.mediaStore.media = res.data.data.id;
            this.save();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //双录视频保存
    save() {
      __product_media_store({
        user_product_id: this.mediaStore.user_product_id,
        media: this.mediaStore.media
      })
        .then(res => {
          if (res.status === 200) {
            this.confirmShow = false;
            this.doubleRec.complete = true;
            this.doubleRec.show = false;
          }
        })
        .cath(err => {
          console.log(err);
        });
    },
    //停止录制
    stopRecord() {
      this.record.stopRecording(() => {
        this.blob = this.record.getBlob();
        console.log(this.record);
        this.recording = false;
        this.confirmShow = true;
        // this.video.pause();
      });
    },
    //开始录制
    startRecord() {
      this.recording = true;
      // this.video.play();
      this.record.startRecording();
    },
    //获取摄像头对象
    getVideo() {
      //new RecordRTCPromisesHandler()
      //判断浏览器是否支持
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先，如果有getUserMedia的话，就获得它
          let getUserMedia =
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }

          // 否则，为老的navigator.getUserMedia方法包裹一个Promise
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }

      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(stream => {
          this.record = RecordRTC(stream, {
            type: "video",
            recorderType: WhammyRecorder
          });
          // let video = this.$refs.video;
          let video = this.video;
          // this.video = this.video;
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            // 防止在新的浏览器里使用它，应为它已经不再支持了
            video.src = window.URL.createObjectURL(stream);
          }
          video.onloadedmetadata = function(e) {
            video.play();
          };
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.double-record {
  width: 100%;
  height: 600px;
  display: flex;
  .video {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .txt {
    padding-left: 20px;
    width: 50%;
    height: 100%;
  }
}
</style>

