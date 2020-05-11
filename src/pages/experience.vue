<template>
  <div id="consult-box" class="inside-box">
    <publicHead :show="show" :rightBtn="true" />
    <img src="../../static/images/experience_banner.png" style="width: 100%;" />
    <div class="container" style="padding: 38px 0px 50px 0px;position: relative;">
      <img src="../../static/images/experience_menu.png" />
      <img src="../../static/images/experience_main.png" style="padding-top: 38px;" />
      <a href="http://720view.sunlue.com/2020/szwl/xcy.html" style="position: absolute;display: block;top:141px;left: 0px;width: 465px;height: 465px;"></a>
      <a href="http://720view.sunlue.com/2020/szwl/zyt.html" style="position: absolute;display: block;top:141px;left: 490px;width: 220px;height: 220px;"></a>
      <a href="http://720view.sunlue.com/2020/szwl/hssw.html" style="position: absolute;display: block;top:141px;left: 735px;width: 220px;height: 220px;"></a>
      <a href="http://720view.sunlue.com/2020/szwl/fggz.html" style="position: absolute;display: block;top:141px;left: 980px;width: 220px;height: 220px;"></a>
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

<style></style>
