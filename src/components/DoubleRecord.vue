<template>
  <div>
    <div class="double-record">
      <div class="video" v-if="mediaStore.videoSrc">
        <video
          webkit-playsinline="true"
          playsinline="true"
          ref="recordedVideo"
          id="recordedVideo"
          :src="mediaStore.videoSrc"
          style="width:100%;background:#000"
          @ended="recordedVideo.playing = false"
        ></video>
        <div class="hg-text-center hg-mt-5">
          <button
            class="hg-btn-blue hg-btn-blue-nor"
            type="button"
            v-if="recordedVideo.playing"
            @click="
              recordedVideo.ele.pause()
              recordedVideo.playing = false
            "
          >
            停止
          </button>
          <button
            class="hg-btn-blue hg-btn-blue-nor"
            type="button"
            v-else
            @click="
              recordedVideo.ele.play()
              recordedVideo.playing = true
            "
          >
            播放
          </button>
          <div>
            <span class="hg-color-gray hg-pointer" @click="$emit('goBack')"
              >返回上级</span
            >
          </div>
        </div>
      </div>
      <div class="video" v-else>
        <video
          ref="video"
          style="width:100%;background:#000"
          webkit-playsinline="true"
          playsinline="true"
        ></video>
        <div class="hg-text-center hg-mt-5">
          <button
            class="hg-btn-blue hg-btn-blue-nor"
            type="button"
            v-if="recording"
            @click="stopRecord"
          >
            停止录制视频
          </button>
          <button
            class="hg-btn-blue hg-btn-blue-nor"
            type="button"
            v-else
            @click="startRecord"
          >
            立即录制视频
          </button>
          <div>
            <span class="hg-color-gray hg-pointer" @click="$emit('goBack')"
              >返回上级</span
            >
          </div>
        </div>
      </div>
      <div class="txt">
        <div v-html="html"></div>
      </div>
    </div>
    <!--引导确认框----------------start-------------->
    <!-- <el-dialog :visible.sync="confirmShow" class="hg-dialog-sure">
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
    </el-dialog> -->
    <!--引导确认框----------------end-------------->
  </div>
</template>

<script>
import {
  __product_record_tips,
  __common_media,
  __product_media_store
} from '@/api/index'
import RecordRTC from 'recordrtc'
export default {
  name: 'doubleRecord', //双录视频
  data() {
    return {
      recorder: null,
      recording: false,
      html: '',
      video: null,
      blob: '',
      confirmShow: false,
      recordedVideo: {
        playing: false,
        ele: ''
      }
    }
  },
  props: {
    doubleRec: {
      show: false,
      complete: false
    },
    mediaStore: {
      type: Object,
      required: false,
      default() {
        return {
          user_product_id: 0,
          media: '',
          videoSrc: ''
        }
      }
    }
  },
  mounted() {
    this.video = this.$refs.video
    this.recordedVideo.ele = this.$refs.recordedVideo
    this.getVideo()
  },
  beforeDestroy() {
    this.recorder && this.recorder.destroy()
    this.recorder = null
  },
  methods: {
    //上传双语视频
    submit() {
      // console.log(this.doubleRec);
      let blob = this.blob
      let formData = new FormData()
      formData.append('file', blob)
      __common_media(formData)
        .then(res => {
          if (res.status === 200) {
            this.mediaStore.media = res.data.data.id
            this.save()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //双录视频保存
    save() {
      __product_media_store({
        user_product_id: this.mediaStore.user_product_id,
        media: this.mediaStore.media
      })
        .then(res => {
          if (res.status === 200) {
            this.confirmShow = false
            this.doubleRec.complete = true
            this.doubleRec.show = false
          }
        })
        .cath(err => {
          console.log(err)
        })
    },
    getVideo() {
      // console.log(navigator.mediaDevices.getUserMedia)
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 320, height: 240 },
          audio: true
        })
        .then(stream => {
          this.recorder = RecordRTC(stream, {
            type: 'video'
          })
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in this.video) {
            this.video.srcObject = stream
          } else {
            // 防止在新的浏览器里使用它，应为它已经不再支持了
            this.video.src = window.URL.createObjectURL(stream)
          }
          this.video.onloadedmetadata = function(e) {
            this.video.play()
          }
        })
        .catch(err => {
          // alert(3434)
          alert(err + '')
        })
    },
    startRecord() {
      // alert("start")
      this.recording = true
      this.video.play()
      this.recorder.startRecording()
    },
    stopRecord() {
      // alert("end");
      this.video.pause()
      this.blob = this.recorder.getBlob()
      this.recording = false
      this.confirmShow = true
      this.recorder.stopRecording()
    }
  }
}
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
