<template>
  <div id="informationHome" :class="{'inside-box':show != 1}">
    <publicHead :show="show" :rightBtn="true"/>
    <section class="information-home-banner">
      <div class="swiper-container information-banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in banner">
            <div class="img-box">
              <img :src="$config.apiUrl + item.image" alt="" :title="item.name">
            </div>
          </div>
        </div>
        <div class="swiper-pagination information-pagination"></div>
      </div>

      <div class="information-btn-box" v-if="false">
        <div class="container-fluid">
          <div class="row">
            <div class="col-3 btn-list">
              <a href="/news" class="btn-link">
                新闻动态
              </a>
            </div>
            <div class="col-3 btn-list">
              <a href="/action" class="btn-link">
                特色活动
              </a>
            </div>
            <div class="col-3 btn-list">
              <a href="/news?type=1" class="btn-link">
                农情快递
              </a>
            </div>
            <div class="col-3 btn-list">
              <a href="/news?type=2" class="btn-link">
                问答
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="information-news-box">
      <!--      <p class="news-title"><img src="../../static/images/informationTitle.png" alt=""></p>-->

      <div class="container">
        <div class="row flex-row-reverse">
          <div class="col-lg-6">
            <div class="swiper-container" id="newsSwiper">
              <div class="swiper-wrapper">
                <div v-for="(list,index) in newsRecommendedList" v-if="list.thumbnail" class="swiper-slide swiper-list">
                  <a :href="'/article?id='+list.uniqid">
                    <div class="img-box">
                      <img :src="$config.apiUrl + list.thumbnail" alt="" :title="list.title">
                    </div>
                    <div class="bottom-name">
                      {{list.title}}
                    </div>
                  </a>
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination"></div>

            </div>
          </div>
          <div class="col-lg-6">
            <div class="top-news">
              <a :href="'/article?id='+list.uniqid" v-for="(list,index) in newsTopList">
                <p class="name">{{list.title}}</p>
                <p class="intro">{{list.excerpt}}</p>
              </a>
            </div>
            <div class="news-box">
              <p class="news-list" v-for="(list,index) in newsList">
                <a :href="'/article?id='+list.uniqid" class="clearfix">
                  <span class="name" :title="list.title">{{list.title}}</span>
                  <span class="date">{{list.create_time | formatDateYMD}}</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        <!--        <p class="news-title action-title"><img src="../../static/images/activity.png" alt=""></p>-->
        <div class="row home-infomation">
          <div class="col-lg-4 col-sm-6 home-infomation-list" v-for="(list,index) in infomationList">
            <div class="img-box">
              <a :href="'/article?id='+list.uniqid">
                <img :src="$config.apiUrl + list.thumbnail" :alt="list.title" :title="list.title">
              </a>
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
  import Swiper from "swiper"
  import "swiper/css/swiper.min.css"

  export default {
    components: {
      publicHead,
      publicFooter
    },
    data() {
      return {
        show: 6,
        navType: "NAV-5DDA3A6972B8E",
        newsType: "ARTICLE-TYPE-5EB52495DD68A",
        informationType: "ARTICLE-TYPE-5D1C482F4320B",
        banner: [],
        newsList: [],
        newsTopList: [],
        newsRecommendedList: [],
        activeNews: [],
        topNews: [],
        infomationList: []
      }
    },
    mounted() {
      this.getBanner();
      // this.initNewsSwiper();
      // this.getTopNews();
      this.getNews();
      this.getTopNews();
      this.getRecommendedNews();
      this.getInformation();
    },
    methods: {
      // 获取banner
      getBanner() {
        // axios.get("../../static/data/informationBanner.json", {}).then((res) => {
        //     this.banner = res.data;
        //     this.$nextTick(() => {
        //         this.initBannerSwiper()
        //     })
        // })
        let apiUrl = this.$config.apiUrl + 'portal/slide/read';
        axios.get(apiUrl, {
          params: {
            nav: this.navType
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.banner = res.data.data;
            this.$nextTick(() => {
              this.initBannerSwiper()
            });
          }
        })
      },
      // 获取新闻列表
      getNews: function () {
        // axios.get('../../static/data/homeNews.json').then((res) => {
        //     this.newsList = res.data
        //     this.activeNews = res.data[0].name
        // })
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            type: this.newsType,
            page: 1,
            limit: 7,
            hot: 1,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.newsList = res.data.data.data;
          }
        })
      },
      // 获取置顶新闻列表
      getTopNews: function () {
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            type: this.newsType,
            page: 1,
            limit: 10,
            is_top: 1,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.newsTopList = res.data.data.data;
          }
        })
      },
      // 获取新闻轮播图
      getRecommendedNews: function () {
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            type: this.newsType,
            page: 1,
            limit: 5,
            recommended: 1,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.newsRecommendedList = res.data.data.data;
            this.$nextTick(() => {
              this.initNewsSwiper();
            })
          }
        })
      },


      // 获取活动
      getInformation: function () {
        // let self = this
        // axios.get('../../static/data/homezixun.json').then(function (res) {
        //     self.infomationList = res.data
        // })

        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            type: this.informationType,
            page: 1,
            limit: 6,
            recommended: 1
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.infomationList = res.data.data.data;
          }
        })
      },
      // 初始化顶部swiper
      initBannerSwiper() {
        new Swiper('.information-banner', {
          autoplay: {
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          observer: true,
          observeParents: true,
          speed: 800,
          spaceBetween: 0,
          centeredSlides: true,
          slidesPerView: 1,
          watchSlidesProgress: true,
          initialSlide: 1,
          loop: true,
          pagination: {
            el: '.information-pagination',
            clickable: true
          },
          on: {
            setTranslate: function () {
              let slides = this.slides
              for (let i = 0; i < slides.length; i++) {
                let slide = slides.eq(i)
                let progress = slides[i].progress
                slide.transform('scale(' + (1 - Math.abs(progress) / 8) + ')');
              }
            },
            setTransition: function (transition) {
              for (let i = 0; i < this.slides.length; i++) {
                let slide = this.slides.eq(i)
                slide.transition(transition);
              }
            },
          }
        })
      },
      // 初始化新闻动态swiper
      initNewsSwiper() {
        let self = this;
        new Swiper('#newsSwiper', {
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          observer: true,
          on: {
            slideChange: function () {
              let index = this.realIndex;
              self.activeNews = self.newsRecommendedList[index].title;
            }
          },
        })
      }
    },
    filters: {
      formatDateYMD: function (value) {
        let date = new Date(value.replace(/-/g, '/'));
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + MM + '-' + d;
      }
    }
  }
</script>

<style src="../assets/css/infomationHome.css" scoped>
</style>
<style>
  .information-pagination {
    left: 0;
    right: 0;
    margin: auto;
    bottom: 26px;
  }

  .information-pagination .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    opacity: 0.64;
    border-radius: 6px;
    background-color: #666;
    margin: 0 10px;
  }

  .information-pagination .swiper-pagination-bullet-active {
    width: 44px;
    background-color: #37cf9f;
    opacity: 1;
  }

  .information-news-box #newsSwiper .swiper-pagination .swiper-pagination-bullet {
    width: 11px;
    height: 10px;
    opacity: 1;
    background-color: #fff;
    margin: 0 9px;
    border-radius: 10px;
    transition: .3s;
  }

  .information-news-box #newsSwiper .swiper-pagination .swiper-pagination-bullet-active {
    width: 38px;
    background-color: #37cf9f;
  }
</style>
