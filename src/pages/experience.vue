<template>
  <div id="consult-box" class="inside-box">
    <publicHead :show="show" :rightBtn="true" />
    <img src="../../static/images/experience_banner.png" style="width: 100%;" />
    <div class="main">
      <div class="container-fluid" style="text-align: center;margin-top: 5px;height: 136px;background-color: white;line-height: 136px;">
          <img src="../../static/images/experience_menu.png" style="max-width: 100%;" />
      </div>
      <div class="container" style="padding-top: 40px;position: relative;">
        <img src="../../static/images/experience_main.png" />
        <a href="http://720view.sunlue.com/2020/szwl/xcy.html" style="position: absolute;display: block;top:40px;left: 0px;width: 465px;height: 465px;"></a>
        <a href="http://720view.sunlue.com/2020/szwl/zyt.html" style="position: absolute;display: block;top:40px;left: 490px;width: 220px;height: 220px;"></a>
        <a href="http://720view.sunlue.com/2020/szwl/hssw.html" style="position: absolute;display: block;top:40px;left: 735px;width: 220px;height: 220px;"></a>
        <a href="http://720view.sunlue.com/2020/szwl/fggz.html" style="position: absolute;display: block;top:40px;left: 980px;width: 220px;height: 220px;"></a>
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
      show: 5
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
