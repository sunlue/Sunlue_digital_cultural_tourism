<template>
  <div id="consult-box" class="inside-box">
    <publicHead :show="show" :rightBtn="true" />
    <img src="../../static/images/venue_banner.png" style="width: 100%;" />
    <div class="main">
      <div class="container-fluid venue-title-fluid">
        <div class="container">
          <img src="../../static/images/venue_title.png" style="width: 100%;"  />
        </div>
      </div>
      <div class="container" style="margin-top: 40px;">
        <img src="../../static/images/venue_main.png" style="width: 100%;"  />
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
      show: 3
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
  .venue-title-fluid{
    margin-top: 5px;
    background-color: white;
    text-align: center;
    padding: 30px 0px 50px 0px;
  }
</style>
