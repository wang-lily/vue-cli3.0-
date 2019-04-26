<template>
  <div>
    <div class="canvas" :id="canvasId">
      <canvas class="progress-canvas-bg" data-item="bg" :width="canvasWidth" :height="canvasWidth"></canvas>
      <canvas class="progress-canvas-active" data-item="active" :width="canvasWidth" :height="canvasWidth"></canvas>
    </div>
    <slot name="text"></slot>
  </div>
</template>
<script>
import { createContext } from "vm";
export default {
  name: "Progress",
  props: {
    canvasId:{
      type:String,
      default:"canvasId"
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    options: {
      type: Object,
      default: {
        type: "fill",// fill/stroke/rect
        color: "rgba(66, 185, 131, 1)",
        bgColor: "rgba(66, 185, 131, 0.1)",
        lineWidth: 10,
        nowVal: 50,
        totalVal: 100,
        radius: 80
      }
    }
  },
  data() {
    return {
      backgroundCanvas:{
        ele:'',
        context:''
      },
      activeCanvas:{
        ele:'',
        context:''
      }
    };
  },
  computed: {
    percent() {
      return ((this.options.nowVal / this.options.totalVal) * 100).toFixed(this.options.tofixed);
    },
    canvasWidth(){
      // return this.width;
      return this.width*window.devicePixelRatio;
    },
    canvasHeight(){
      // return this.height;
      return this.height*window.devicePixelRatio;
    },
    canvasRadius(){
      // return this.options.radius;
      return this.options.radius*window.devicePixelRatio;
    },
    canvasLineWidth(){
      // return this.options.lineWidth;
      return this.options.lineWidth*window.devicePixelRatio;
    }
  },
  watch: {
    percent: function(newVa) {
      this.drawActive();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      this.backgroundCanvas.ele = document.querySelector(`#${this.canvasId} [data-item=bg]`);
      this.backgroundCanvas.context = this.backgroundCanvas.ele.getContext("2d");
      this.activeCanvas.ele = document.querySelector(`#${this.canvasId} [data-item=active]`);
      this.activeCanvas.context = this.activeCanvas.ele.getContext("2d");
      this.initContext();
      this.drawBg();
      this.drawActive();
    },
    initContext(){
      this.backgroundCanvas.context.lineCap = "round";
      this.backgroundCanvas.context.lineWidth = this.canvasLineWidth;
      this.backgroundCanvas.context.strokeStyle = this.options.bgColor;
      this.backgroundCanvas.context.fillStyle = this.options.bgColor;
      this.activeCanvas.context.lineCap = "round";
      this.activeCanvas.context.lineWidth = this.canvasLineWidth;
      this.activeCanvas.context.strokeStyle = this.options.color;
      this.activeCanvas.context.fillStyle = this.options.color;
    },
    drawBg(){
      switch (this.options.type) {
        case 'rect':
          this.drawRectBg();
          break;
        case 'fill':
          this.drawFillBg();
          break;
        case 'stroke':
          this.drawStrokeBg();
          break;
        default:
          break;
      }
    },
    drawActive(){
      if (this.percent < 0)  {return}
      if (this.percent == 0)  {
        this.activeCanvas.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        return;
      }
      switch (this.options.type) {
        case 'rect':
          this.drawRectActive();
          break;
        case 'fill':
          this.drawFillActive();
          break;
        case 'stroke':
          this.drawStrokeActive();
          break;
        default:
          break;
      }
    },
    drawRectBg(){
      this.backgroundCanvas.context.beginPath();
      this.backgroundCanvas.context.moveTo(this.canvasLineWidth,this.canvasHeight/2);
      this.backgroundCanvas.context.lineTo(this.canvasWidth-this.canvasLineWidth, this.canvasHeight/2);
      this.backgroundCanvas.context.stroke();
    },
    drawFillBg(){
      this.backgroundCanvas.context.beginPath();
      this.backgroundCanvas.context.arc(
        this.canvasWidth / 2,
        this.canvasHeight / 2,
        this.canvasRadius,
        (-90 * Math.PI) / 180,
        (270 * Math.PI) / 180
      );
      this.backgroundCanvas.context.fill();
    },
    drawStrokeBg(){
      this.backgroundCanvas.context.beginPath();
      this.backgroundCanvas.context.arc(
        this.canvasWidth / 2,
        this.canvasHeight / 2,
        this.canvasRadius,
        (-90 * Math.PI) / 180,
        (270 * Math.PI) / 180
      );
      this.backgroundCanvas.context.stroke();
    },
    drawRectActive(){
      this.activeCanvas.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.activeCanvas.context.beginPath();
      this.activeCanvas.context.moveTo(this.canvasLineWidth,this.canvasHeight/2);
      this.activeCanvas.context.lineTo(this.canvasLineWidth+(this.canvasWidth-this.canvasLineWidth-this.canvasLineWidth)*this.percent/100, this.canvasHeight/2);
      this.activeCanvas.context.stroke();
    },
    drawFillActive(){
      this.activeCanvas.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      let endAngle = this.percent * 3.6 - 90;
      this.backgroundCanvas.context.beginPath();
      this.activeCanvas.context.arc(
        this.canvasWidth / 2,
        this.canvasHeight / 2,
        this.canvasRadius,
        (-90 * Math.PI) / 180,
        (endAngle * Math.PI) / 180
      );
      this.activeCanvas.context.lineTo(this.canvasWidth / 2, this.canvasHeight / 2);
      this.activeCanvas.context.closePath();
      this.activeCanvas.context.fill();
    },
    drawStrokeActive(){
        this.activeCanvas.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        let endAngle = this.percent * 3.6 - 90;
        this.activeCanvas.context.beginPath();
        this.activeCanvas.context.arc(
          this.canvasWidth / 2,
          this.canvasHeight / 2,
          this.canvasRadius,
          (-90 * Math.PI) / 180,
          (endAngle * Math.PI) / 180
        );
        this.activeCanvas.context.stroke();
    },
  }
};
</script>
<style lang="scss" scoped>
  .canvas{
    position: relative;
    .progress-canvas-active{
      position: absolute;
      top:0;
      left:0;
    }
  }
</style>


