<template>
  <div id="consult-box" class="inside-box">
    <publicHead :show="show" :rightBtn="true" />
    <img src="../../static/images/volunteers_banner.png" style="width: 100%;" />
    <div class="main">
      <div class="container" style="margin-top: 40px;margin-bottom: 40px;">
        <img src="../../static/images/volunteers_main1.png" style="max-width: 100%;" />
        <img src="../../static/images/volunteers_main2.png" style="max-width: 100%;margin-top: 40px" />
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
      show: 8
    };
  }
};
</script>

<style>
  html,body{
    background-color: #FAFAFA;
  }
  .volunteers-title-fluid{
    margin-top: 5px;
    background-color: white;
    text-align: center;
    padding: 30px 0px 50px 0px;
  }
  .main{
    background-image: url('../../static/images/homeBg.png');
    background-repeat: no-repeat;
    background-position: center bottom;
    padding: 0px 0px 200px 0px;
  }
</style>
