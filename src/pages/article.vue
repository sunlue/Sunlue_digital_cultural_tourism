<template>
  <div id="article-page">
    <publicHead :show="show" :rightBtn="false"/>
    <section class="public-banner">
      <img class="banner-img" src="../../static/images/articleBanner.jpg" alt="">
    </section>
    <section class="article-box">
      <div class="box">
        <div class="container-fluid">
          <div class="row">

            <div class="col-lg-9 article-block">
              <p class="name">
                {{articleArr.title}}{{articleArr.name}}
              </p>
              <div class="clearfix">
                <span class="date">
                  {{articleArr.create_time}}
                </span>
                <div class="bdsharebuttonbox">
                  <a href="#" class="share bds_weixin" data-cmd="weixin" title="分享到微信">分享</a>
                </div>
                <span class="hit" v-if="articleArr.hits>-1">
                  {{articleArr.hits}}
                </span>
              </div>
              <div class="content-box clearfix" v-html="articleArr.content"></div>
              <p class="prev-next-box clearfix">
                <a class="float-left prev-btn" :href="'/article?id='+prevBtn.uniqid">
                  {{prevBtn.title}}
                </a>
                <a class="float-right next-btn" :href="'/article?id='+nextBtn.uniqid">
                  {{nextBtn.title}}
                </a>
              </p>

              <p class="retreat-btn" @click="back">
                返回列表
              </p>
            </div>
            <div class="col-lg-3 article-block">
              <a class="link-btn" href="/map">村落地图导览</a>
              <a class="link-btn" href="/panorama">VR 720°全景体验</a>
              <!--<router-link class="link-btn" :to="{ path: 'article', query: { id: articleId }}">精品语音讲解</router-link>-->

              <p class="recommend-title">热门推荐</p>
              <div class="img-box" v-for="item in hotRecommend">
                <a :href="'/article?id='+item.uniqid">
                  <img :src="$config.apiUrl + item.thumbnail" alt="" :title="item.title">
                  <p class="recommend-list-title" :title="item.title">{{item.title}}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <publicFooter/>
  </div>
</template>

<script>
  import publicHead from "../components/publicHead"
  import publicFooter from "../components/publicFooter"
  import axios from "axios"

  export default {
    data() {
      return {
        show: 99,
        articleId: this.$route.query.id,
        sceneryId: this.$route.query.sid,
        relicsId: this.$route.query.rid,
        articleArr: [],
        hotRecommend: [],
        prevBtn: [],
        nextBtn: []
      }
    },
    components: {
      publicHead,
      publicFooter
    },
    mounted() {
      this.getArticle();
      this.getHotData();
      const self = this;
      setTimeout(() => {
        self.setShare()
      }, 0);
    },
    methods: {
      back() {
        this.$router.back();
      },
      // 获取文章详情
      getArticle() {
        let apiUrl;
        let aid;
        if (this.articleId) {
          apiUrl = this.$config.apiUrl + 'portal/article/data/details';
          aid = this.articleId;
        } else if (this.sceneryId) {
          apiUrl = this.$config.apiUrl + 'village/scenic/details';
          aid = this.sceneryId;
        } else if (this.relicsId) {
          apiUrl = this.$config.apiUrl + 'village/relics/details';
          aid = this.relicsId;
        }
        axios.get(apiUrl, {
          params: {
            uniqid: aid,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            let resData = res.data.data;
            if (resData.next) {
              this.nextBtn = resData.next;
              this.prevBtn = resData.prev;
            } else {
              this.nextBtn = {
                uniqid: '',
                title: ''
              };
              this.prevBtn = {
                uniqid: '',
                title: ''
              };
            }
            resData.create_time = this.formatDate(resData.create_time);
            this.articleArr = resData;
          }
        })
      },
      //热门推荐
      getHotData() {
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            page: 1,
            limit: 4
          }
        }).then((res) => {
          if (res.data.code === 200) {
            let resData = res.data.data;
            this.hotRecommend = resData.data;
          }
        })
      },
      setShare() {
        //分享相关代码
        window._bd_share_config = {
          "common": {
            "bdSnsKey": {},
            "bdText": "",
            "bdMini": "1",
            "bdMiniList": false,
            "bdPic": "",
            "bdStyle": "1",
            "bdSize": "24"
          },
          "share": {}
        };
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
        document.body.appendChild(s);
      },
      formatDate: function (value) {
        let date;
        let res = value;
        if(typeof(res) === 'number'){
          if(res.toString().length===10){
            res = res*1000;
          }
          date = new Date(res);
        }else{
          date = new Date(res.replace(/-/g, '/'));
        }

        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        let d = date.getDate();
        MM = MM < 10 ? ('0' + MM) : MM;
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + MM + '-' + d;
      }
    }
  }
</script>

<style src="../assets/css/article.css" scoped>
</style>
<style>
  #article-page .broadside-box {
    display: none;
  }

  #article-page .content-box img {
    max-width: 100%;
  }

  .bd_weixin_popup {
    height: 310px !important;
  }
</style>
