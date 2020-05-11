<template>
  <div class="box">
    <div class="clearfix head-box">
      <div class="box">
        <h1 class="float-left logo">
          <a href="/">
            <img src="../../static/images/logoBlack.png" alt="logo" title="主页">
          </a>
        </h1>
        <h5 class="float-left village-name" v-html="village">
        </h5>
        <ul class="float-left list-inline head-list-box">
          <li class="list-inline-item head-list" :class="{active:show === 1}"><a
            :href="'/village-home?vid='+vid">村首页</a></li>
          <li class="list-inline-item head-list" :class="{active:show === 2}"><a :href="'/village-culture?vid='+vid">概况</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 3}"><a :href="'/village-resource?vid='+vid">资源</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 5}"><a :href="'/village-message?vid='+vid">动态</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 4}"><a
            :href="'/village-team?vid='+vid">党组织</a></li>
        </ul>
        <!--<div class="float-right login-btn">
          <a href="/login">
            登录 / 注册
          </a>
        </div>-->
      </div>
    </div>

    <div class="mobile-nav-box" :class="{'mobile-nav-box-fixed':closeBtn}">
      <div class="mobile-log">
        <a href="/">
          <img src="../../static/images/mobile_logo.png" alt="">
        </a>
      </div>
      <div class="mobile-btn" :class="{'close-btn':closeBtn}" @click="closeBtn = !closeBtn"></div>
      <div class="mobile-village-nav clearfix" :class="{'mobile-village-nav-show':closeBtn}">
        <ul class="btn-box float-right">
          <div class="logo-box">
            <a href="/">
              <img src="../../static/images/mobile_logo_v.png" alt="">
            </a>
          </div>
          <li><p><a :href="'/village-home?vid='+vid">村首页</a></p></li>
          <li><p><a :href="'/village-culture?vid='+vid">概况</a></p></li>
          <li><p><a :href="'/village-resource?vid='+vid">资源</a></p></li>
          <li><p><a :href="'/village-message?vid='+vid">动态</a></p></li>
          <li><p><a :href="'/village-team?vid='+vid">党组织</a></p></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
    import axios from "axios"

    export default {
        props: {
            show: {
                type: Number,
                required: true
            },
            vid: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                closeBtn: false,
                village:"&nbsp;&nbsp;&nbsp;"
            }
        },
        methods: {
            getVillage() {
                let apiUrl = this.$config.apiUrl + 'village/data/details';
                axios.get(apiUrl, {
                    params: {
                        uniqid: this.vid
                    }
                }).then((res) => {
                    this.village = res.data.data.name
                })
            }
        },
        mounted() {
            this.getVillage();
        }
    }
</script>

<style src="../assets/css/villageHead.css" scoped>

</style>
