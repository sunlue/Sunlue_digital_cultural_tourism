<template>
  <div id="consult-box" class="inside-box">
    <publicHead :show="show" :rightBtn="true" />
    <img src="../../static/images/activity_banner.png" style="width: 100%;" />
    <div class="main">
      <div class="container-fluid" style="background-color: white;text-align: center;line-height: 142px;height: 142px;">
        <img src="../../static/images/activity_title.png" style="max-width: 100%;" />
      </div>
      <div class="container">
        <img src="../../static/images/activity_main.png" style="max-width: 100%;margin-top: 40px;" />
      </div>
    </div>
    <publicFooter />
  </div>
</template>

<script>
import publicHead from '../components/publicHead';
import publicFooter from '../components/publicFooter';
export default {
  components: {
    publicHead,
    publicFooter
  },
  data() {
    return {
      show: 2
    };
  }
};
</script>

<style>
  html,body{
    background-color: #FAFAFA;
  }
  .main{
    background-image: url('../../static/images/homeBg.png');
    background-repeat: no-repeat;
    background-position: center bottom;
    padding: 5px 0px 200px 0px;
  }
</style>
