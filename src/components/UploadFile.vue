<template>
  <div class="">
    <div
      class="progress"
      @click="upload"
      :style="{
        backgroundImage:
          'linear-gradient(to right,#C0C7CB 0%,#C0C7CB ' +
          progress +
          ',#E1E6E9 ' +
          progress +
          ',#E1E6E9 100%)'
      }"
    ></div>
  </div>
</template>
<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {},

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    upload() {
      var form = new FormData()
      form.append('file', vm.$refs.upload.files[0])
      form.append('id', id)
      form.append('type', type)
      var config = {
        onUploadProgress: progressEvent => {
          var complete =
            (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%'
          this.progress = complete
        },
        onDownloadProgress: function(progressEvent) {
          // Do whatever you want with the native progress event
        }
      }
      axios.post(`add_travel/test`, form, config).then(res => {
        if (res.data.status === 'success') {
          console.log('上传成功')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
