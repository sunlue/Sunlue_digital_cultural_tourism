<template>
  <div id="consult-box" class="inside-box">
    <publicHead :show="show" :rightBtn="true" />
    <img src="../../static/images/people_banner.png" style="width: 100%;" />
    <div class="container" style="padding: 38px 0px 50px 0px;">
      <img src="../../static/images/people_main.png" />
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
      show: 4
    };
  }
};
</script>

<style></style>
