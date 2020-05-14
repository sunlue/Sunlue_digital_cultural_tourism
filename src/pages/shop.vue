<template>
  <div id="consult-box" class="inside-box">
    <publicHead :show="show" :rightBtn="true" />
    <img src="../../static/images/shop_banner.png" style="width: 100%;" />
    <div class="main">
      <div class="container-fluid" style="margin-top: 5px;height: 100px;line-height: 100px;background: white;text-align: center;">
        <img src="../../static/images/shop_title.png" style="max-width: 100%;" />
      </div>
      <div class="container" style="margin-top: 40px;margin-bottom: 40px;">
        <img src="../../static/images/shop_main.png" style="max-width: 100%;" />
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
      show: 7
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
    padding: 5px 0px 200px 0px;
  }

</style>
