<template>
  <div class="panorama" :class="{'inside-box':show !== 1}">
    <publicHead :show="show" :rightBtn="true"/>
    <section class="public-banner">
      <img class="banner-img" src="../../static/images/panoramaBanner.jpg" alt="">
    </section>
    <div class="common-hot-box" style="margin: 40px 0px 40px 0px;">
      <div class="container">
        <div class="row">
          <div class="hot-list col-lg-3 panorama" v-for="(i,index) in item" :key="index">
            <div class="box" style="background: white;">
              <a :href="i.url" target="_blank">
                <div class="img-box">
                  <img :src="i.img" />
                </div>
              </a>
              <div class="text-box">
                <p class="clearfix">
                  <a :href="i.url">
                    <span class="name">{{i.title}}</span>
                  </a>
                </p>
                <p class="clearfix">
                  <span class="look">{{random(100,500)}}</span>
                  <span class="like">{{random(10,250)}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <publicFooter/>

  </div>
</template>
<script>
    import publicHead from "../components/publicHead"
    import publicFooter from "../components/publicFooter"
    import axios from "axios"

    export default {
        name: "village",
        components: {
            publicHead,
            publicFooter
        },
        data() {
            return {
                show: 0,
                item:[{
                  url:'http://720view.sunlue.com/2020/szwl/xcy.html',
                  title:'原香~国际香草园',
                  img:'../../static/panor/xcy.png'
                },{
                  url:'http://720view.sunlue.com/2020/szwl/zyt.html',
                  title:'子云亭',
                  img:'../../static/panor/zyt.png'
                },{
                  url:'http://720view.sunlue.com/2020/szwl/hssw.html',
                  title:'红色书屋',
                  img:'../../static/panor/hssw.png'
                },{
                  url:'http://720view.sunlue.com/2020/szwl/fggz.html',
                  title:'丰谷古镇',
                  img:'../../static/panor/fggz.png'
                }]
            }
        },
        mounted: function () {
        },
        methods: {
            random:function (lower, upper) {
              return Math.floor(Math.random() * (upper - lower+1)) + lower;
            }
        }
    }
</script>

<style src="../assets/css/village.css" scoped>
</style>
