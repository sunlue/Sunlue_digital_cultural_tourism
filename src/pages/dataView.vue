<template>
  <div class="data-view-box">
    <iframe width="100%" height="100%" :src="iframeArr[iframeArrIndex]">
    </iframe>
    <div class="iframe-box-bg"></div>
<!--    <div class="banner-text">-->
<!--      数字乡村-->
<!--    </div>-->
  </div>
</template>
<script>
    export default {
        data() {
            return {
                iframeArr: ['../../static/krpano/index.html', '../../static/krpano/index1.html', '../../static/krpano/index2.html', '../../static/krpano/index3.html', '../../static/krpano/index4.html'],
                iframeArrIndex: '',
            }
        },
        mounted() {
            this.iframeArrIndex = ~~(Math.random() * this.iframeArr.length);
        }
    }
</script>
<style scoped>
  iframe {
    outline: none;
    box-shadow: none;
    border: none;
  }

  .data-view-box {
    position: relative;
    width: 100vw;
    height: 100vh;
  }
  .iframe-box-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: rgba(0,0,0,0.2);
  }
  .banner-text{
    position: absolute;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 80px;
    font-weight: bold;
    color:#fff;
  }
</style>
