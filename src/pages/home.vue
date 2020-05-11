<template>
  <div class="home">
    <section class="home-banner">
      <publicHead :show="show" :rightBtn="rightBtn" />
      <div class="banner-img">
        <!-- <iframe width="100%" height="100%" :src="iframeArr[iframeArrIndex]"></iframe> -->
        <iframe width="100%" height="100%" src="http://720view.sunlue.com/2020/szwl/xcy.html"></iframe>
        <div class="iframe-box-bg"></div>
      </div>
      <div class="banner-text"><img src="../../static/images/homeBnanerText.png" class="img-fluid" alt="" /></div>

      <div class="search">
        <div class="search-box" @mouseleave="pauseAni(searchAni)" @mouseenter="playAni(searchAni)">
          <input type="text" v-on:keyup.enter="submitData" v-model="searchData" class="search-input" placeholder="请输入关键词" />
          <router-link class="search-btn" :to="{ path: 'search', query: { antistop: encodeURIComponent(this.searchData) } }"></router-link>
        </div>
        <a :href="isMobile ? 'http://t.fcvillage.com/wxMap/index.html' : 'http://t.fcvillage.com/pcMap/index.html'"
          class="village-address"
          @mouseleave="pauseAni(addressAni)"
          @mouseenter="playAni(addressAni)">
          <span class="home-address-mores"></span>
          <span class="home-address-text">文旅云图</span>
        </a>
      </div>

      <!--      <div class="hot-list-box">-->
      <!--        <a href="/village" class="hot-name">热门</a>-->
      <!--        <a class="hot-list" v-for="item in hot" :href="'/village-home?vid='+item.uniqid">-->
      <!--          {{ item.name }}-->
      <!--        </a>-->
      <!--      </div>-->

      <ul class="list-inline classify-box">
        <li v-for="(item, index) in classify" class="list-inline-item classify-list" :key="index">
          <a :href="item.href ? item.href : 'javascript:;'">
            <div class="icon-box" v-show="index > 2"><i class="home-class-icon"></i></div>
            <div v-if="index < 3">
              <img src="../../static/icon/1.png" v-if="index == 0" style="width: 42px;height: 42px;" />
              <img src="../../static/icon/2.png" v-if="index == 1" style="width: 42px;height: 42px;" />
              <img src="../../static/icon/3.png" v-if="index == 2" style="width: 42px;height: 42px;" />
            </div>
            <span class="list-text">{{ item.text }}</span>
          </a>
        </li>
      </ul>

      <span class="home-mouse-btn"></span>
    </section>
    <section class="main">
      <div class="container">
        <div class="new-activity" style="position: relative;">
          <h2><img src="../../static/images/homeMainTitle_new_active_01.png" /></h2>
          <img src="../../static/images/homeMainJoin.png" style="position: absolute;right: 0px;z-index: 9999;" />
          <div class="swiper-container" id="activitySwiper" style="height: 300px;">
            <div class="swiper-wrapper">
              <div v-for="(list, index) in newsActivityList" class="swiper-slide swiper-list">
                <div class="img-box"><img :src="list.images" alt="" style="width: 100%;" /></div>
              </div>
            </div>
            <div class="swiper-pagination" style="left: 10px;"></div>
          </div>
        </div>
        <img src="../../static/images/homeMain.png" style="max-width: 100%;" />
      </div>
    </section>

    <publicFooter />
  </div>
</template>
<script>
import publicHead from '../components/publicHead';
import publicFooter from '../components/publicFooter';
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import lottie from 'lottie-web';
import jingdianIcon from '../../static/icon/jingdian.json';
import minsuIcon from '../../static/icon/minsu.json';
import minsu2Icon from '../../static/icon/minsu2.json';
import nongchangIcon from '../../static/icon/nongchang.json';
import techanIcon from '../../static/icon/techan.json';
import yangshengIcon from '../../static/icon/yangsheng.json';
import addressIcon from '../../static/icon/address.json';
import searchIcon from '../../static/icon/search.json';

export default {
  name: 'home',
  components: {
    publicHead,
    publicFooter
  },
  data() {
    return {
      show: 1,
      searchData: '',
      // activeNews: '',
      rightBtn: false,
      hot: [],
      informationType: 'ARTICLE-TYPE-5D1C482F4320B',
      newsType: 'ARTICLE-TYPE-5DD3A76B30129',
      classify: [
        {
          href: '/activity',
          text: '活动'
        },
        {
          href: '/venue',
          text: '场馆'
        },
        {
          text: '非遗'
        },
        {
          text: '景点'
        },
        {
          text: '民俗'
        },
        {
          text: '民宿'
        }
      ],
      newsList: [],
      newsRecommendedList: [],
      newsTopList: [],
      infomationList: [],
      iframeArr: [
        '../../static/krpano/index.html',
        '../../static/krpano/index1.html',
        '../../static/krpano/index2.html',
        '../../static/krpano/index3.html',
        '../../static/krpano/index4.html'
      ],
      iframeArrIndex: '',
      aniArr: [],
      addressAni: [],
      searchAni: [],
      newsActivityList: [
        {
          images: '../../static/images/newsActivity_1.png'
        },
        {
          images: '../../static/images/newsActivity_2.png'
        },
        {
          images: '../../static/images/newsActivity_3.png'
        }
      ],
      isMobile: false
    };
  },
  created() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      isAndroid = ua.match(/(Android)\s+([\d.]+)/);

    this.isMobile = isIphone || isAndroid;
  },
  mounted: function() {
    const self = this;
    this.getHotVillage();
    // this.getTopNews();
    // this.getRecommendedNews();
    // this.getNews();
    // this.getTopNews();
    // this.getInformation();
    this.initAni();
    this.initActivitySwiper();
    this.iframeArrIndex = ~~(Math.random() * this.iframeArr.length);
    window.addEventListener('scroll', this.getRightBtnPosition, false);
  },
  destroyed: function() {
    window.removeEventListener('scroll', this.getRightBtnPosition, false);
  },
  methods: {
    // 点赞
    setLike: function(data, uniqid) {
      for (let i = 0; i < data.length; i++) {
        if (uniqid === data[i].uniqid) {
          if (!data[i].isLike) {
            axios
              .put(this.$config.apiUrl + 'village/data/like', {
                uniqid: uniqid
              })
              .then(res => {
                if (res.data.code === 200) {
                  data[i].like = parseInt(data[i].like) + 1;
                  data[i].isLike = true;
                }
              });
          }
        }
      }
    },
    // 提交搜索数据
    submitData: function() {
      this.$router.push({ path: 'search', query: { antistop: encodeURIComponent(this.searchData) } });
    },
    // 获取热门村庄
    getHotVillage: function() {
      // let self = this
      // axios.get('../../static/data/tuijiancunzhuang.json').then(function (res) {
      //     self.hot = res.data
      // })
      let apiUrl = this.$config.apiUrl + 'village/data/read';
      axios
        .get(apiUrl, {
          params: {
            limit: 7,
            page: 1,
            hot: 1
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.data.length; i++) {
              res.data.data.data[i].isLike = false;
            }
            this.hot = res.data.data.data;
          }
        });
    },
    // 获取滑动条位置，设置右侧导航颜色
    getRightBtnPosition: function() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let screenH = document.documentElement.clientHeight / 2;
      if (top > screenH) {
        this.rightBtn = true;
      } else {
        this.rightBtn = false;
      }
    },

    // 获取新闻列表
    getNews: function() {
      // let self = this
      // axios.get('../../static/data/homeNews.json').then(function (res) {
      //     self.newsList = res.data
      //     self.activeNews = res.data[0].name
      // })
      let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
      axios
        .get(apiUrl, {
          params: {
            type: this.newsType,
            page: 1,
            limit: 7,
            hot: 1
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.newsList = res.data.data.data;
          }
        });
    },
    // 获取置顶新闻列表
    getTopNews: function() {
      let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
      axios
        .get(apiUrl, {
          params: {
            type: this.newsType,
            page: 1,
            limit: 1,
            is_top: 1
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.newsTopList = res.data.data.data;
          }
        });
    },
    // 获取新闻轮播图
    getRecommendedNews: function() {
      let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
      axios
        .get(apiUrl, {
          params: {
            type: this.newsType,
            page: 1,
            limit: 5,
            recommended: 1
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.newsRecommendedList = res.data.data.data;
            this.$nextTick(() => {
              this.initActivitySwiper();
            });
          }
        });
    },
    // 获取活动
    getInformation: function() {
      // let self = this
      // axios.get('../../static/data/homezixun.json').then(function (res) {
      //     self.infomationList = res.data
      // })

      let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
      axios
        .get(apiUrl, {
          params: {
            type: this.informationType,
            page: 1,
            limit: 3,
            recommended: 1
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.infomationList = res.data.data.data;
          }
        });
    },
    // 初始化新闻动态swiper
    initActivitySwiper() {
      let self = this;
      new Swiper('#activitySwiper', {
        direction: 'vertical',
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      });
    },
    // 初始化动画
    initAni() {
      let aniList = [techanIcon, nongchangIcon, yangshengIcon, jingdianIcon, minsuIcon, minsu2Icon];
      aniList.forEach((v, i) => {
        let aniConfig = {
          container: document.querySelectorAll('.home-class-icon')[i],
          renderer: 'svg',
          loop: true,
          autoplay: false,
          animationData: v
        };
        this.aniArr[i] = lottie.loadAnimation(aniConfig);
      });

      let addressData = {
        container: document.querySelector('.home-address-mores'),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData: addressIcon
      };
      this.addressAni = lottie.loadAnimation(addressData);

      let searchData = {
        container: document.querySelector('.search-btn'),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData: searchIcon
      };
      this.searchAni = lottie.loadAnimation(searchData);
    },
    // 播放动画
    playAni(item) {
      item.play();
    },
    //暂停动画
    pauseAni(item) {
      item.stop();
    }
  },
  filters: {
    formatDateYMD: function(value) {
      let date = new Date(value.replace(/-/g, '/'));
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? '0' + MM : MM;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      return y + '-' + MM + '-' + d;
    }
  }
};
</script>

<style src="../assets/css/home.css" scoped></style>

<style>
#activitySwiper .swiper-pagination .swiper-pagination-bullet {
  width: 11px;
  height: 10px;
  opacity: 1;
  background-color: #fff;
  border-radius: 10px;
  transition: 0.3s;
}

#activitySwiper .swiper-pagination .swiper-pagination-bullet-active {
  background-color: #fff000;
}

.classify-box path {
  stroke: #fff;
  fill: #fff;
}
.search-btn path {
  stroke: #777777;
  fill: #777777;
}
.village-address path {
  stroke: #fff;
  fill: #fff;
}
.main {
  width: 100vw;
  background-image: url('../../static/images/homeBg.png');
  background-repeat: no-repeat;
  background-position: center bottom;
  padding: 50px 0px 100px 0px;
}
</style>
