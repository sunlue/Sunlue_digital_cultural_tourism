<template>
  <div id="serve" class="inside-box">
    <publicHead :show="show" :rightBtn="false"/>
    <!--    <div class="serve-banner-box">-->
    <!--      <img src="../../static/images/serveBanner.jpg" alt="" class="img-fluid">-->
    <!--    </div>-->
    <!--    <section class="serve-box">-->
    <!--      <div class="container-fluid">-->
    <!--        <div class="row">-->
    <!--          <div class="col-lg-4 list-box">-->
    <!--            <div class="swiper-container serve-swiper">-->
    <!--              <div class="swiper-wrapper">-->
    <!--                <div class="swiper-slide" v-for="item in recommendList">-->
    <!--                  <a :href="'/article?id='+item.uniqid">-->
    <!--                    <div class="img-box">-->
    <!--                      <img :src="$config.apiUrl + item.thumbnail" alt="" :title="item.title">-->
    <!--                    </div>-->
    <!--                    <p class="list-name" :title="item.title">{{item.title}}</p>-->
    <!--                  </a>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--              <div class="swiper-pagination serve-pagination"></div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="col-lg-5 list-box hot-box">-->
    <!--            <div class="box">-->
    <!--              <div class="hot-name">-->
    <!--                热门消息-->
    <!--              </div>-->
    <!--              <a :href="'/article?id='+item.uniqid" v-for="item in hotList">-->
    <!--                <p class="hot-list clearfix">-->
    <!--                  <span class="name">{{item.title}}</span>-->
    <!--                  <span class="date">{{item.create_time | formatDateMD}}</span>-->
    <!--                </p>-->
    <!--              </a>-->

    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="col-lg-3 list-box clearfix">-->
    <!--            <div class="icon-list">-->
    <!--              <a href="/serve-list?id=1">-->
    <!--                <div class="default">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">党宣</p>-->
    <!--                </div>-->
    <!--                <div class="hover">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">党宣</p>-->
    <!--                </div>-->
    <!--              </a>-->
    <!--            </div>-->
    <!--            <div class="icon-list">-->
    <!--              <a href="/serve-list?id=2">-->
    <!--                <div class="default">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">生产</p>-->
    <!--                </div>-->
    <!--                <div class="hover">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">生产</p>-->
    <!--                </div>-->
    <!--              </a>-->
    <!--            </div>-->
    <!--            <div class="icon-list">-->
    <!--              <a href="/serve-list?id=3">-->
    <!--                <div class="default">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">科技</p>-->
    <!--                </div>-->
    <!--                <div class="hover">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">科技</p>-->
    <!--                </div>-->
    <!--              </a>-->
    <!--            </div>-->
    <!--            <div class="icon-list">-->
    <!--              <a href="/serve-list?id=4">-->
    <!--                <div class="default">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">金融</p>-->
    <!--                </div>-->
    <!--                <div class="hover">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">金融</p>-->
    <!--                </div>-->
    <!--              </a>-->
    <!--            </div>-->
    <!--            <div class="icon-list">-->
    <!--              <a href="/serve-list?id=5">-->
    <!--                <div class="default">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">农民工</p>-->
    <!--                </div>-->
    <!--                <div class="hover">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">农民工</p>-->
    <!--                </div>-->
    <!--              </a>-->
    <!--            </div>-->
    <!--            <div class="icon-list">-->
    <!--              <a href="/serve-list?id=6">-->
    <!--                <div class="default">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">社会组织</p>-->
    <!--                </div>-->
    <!--                <div class="hover">-->
    <!--                  <div class="icon-img"></div>-->
    <!--                  <p class="title">社会组织</p>-->
    <!--                </div>-->
    <!--              </a>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->

    <section class="container-fluid sever-block-box">
      <div class="row">
        <div class="col-lg-3 sever-block-list wow" :class="{'fadeInLeft':!mobile}" v-if="index<=3"
             :data-wow-delay="index%2===0?'0':'0.5s'" v-for="(item,index) in serveArr" @click="jumpLink(index)">
          <div class="img-box">
            <img :src="item.img" alt="" :title="item.name">
          </div>
          <div class="text-box">
            <p class="name">{{item.name}}</p>
            <p class="intro">{{item.intro}}</p>
          </div>
        </div>
        <div class="col-lg-3 sever-block-list wow" :class="{'fadeInRight':!mobile}" v-if="index>3"
             :data-wow-delay="index%2===0?'0.5s':'0'" v-for="(item,index) in serveArr" @click="jumpLink(index)">
          <div class="img-box">
            <img :src="item.img" alt="" :title="item.name">
          </div>
          <div class="text-box">
            <p class="name">{{item.name}}</p>
            <p class="intro">{{item.intro}}</p>
          </div>
        </div>
      </div>

    </section>

    <section class="information-news-box">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="swiper-container" id="newsSwiper">
              <div class="swiper-wrapper">
                <div v-for="(list,index) in recommendList" v-if="list.thumbnail" class="swiper-slide swiper-list">
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
              <p class="news-list" v-for="(list,index) in hotList">
                <a :href="'/article?id='+list.uniqid" class="clearfix">
                  <span class="name" :title="list.title">{{list.title}}</span>
                  <span class="date">{{list.create_time | formatDateYMD}}</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--    <section class="serve-btn-box row">-->
    <!--      <div class="list-box col">-->
    <!--        <div class="box clearfix">-->
    <!--          <a href="http://www.scncpzs.com/" target="_blank">-->
    <!--            <span class="list-icon"></span>-->
    <!--            <span class="list-name">产品质量安全追溯</span>-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="list-box col">-->
    <!--        <div class="box clearfix">-->
    <!--          <a href="http://202.61.89.190:8080/" target="_blank">-->
    <!--            <span class="list-icon"></span>-->
    <!--            <span class="list-name">农产品质量安全监测</span>-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="list-box col">-->
    <!--        <div class="box clearfix">-->
    <!--          <a href="javascript:void(0)">-->
    <!--            <span class="list-icon"></span>-->
    <!--            <span class="list-name">农情快报</span>-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="list-box col">-->
    <!--        <div class="box clearfix">-->
    <!--          <a href="javascript:void(0)">-->
    <!--            <span class="list-icon"></span>-->
    <!--            <span class="list-name">农技问答</span>-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="list-box col">-->
    <!--        <div class="box clearfix">-->
    <!--          <a href="javascript:void(0)">-->
    <!--            <span class="list-icon"></span>-->
    <!--            <span class="list-name">农药数字监督</span>-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="list-box col">-->
    <!--        <div class="box clearfix">-->
    <!--          <a href="http://xue.yszn.net.cn/" target="_blank">-->
    <!--            <span class="list-icon"></span>-->
    <!--            <span class="list-name">双创培训</span>-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="list-box col" @click="showModal">-->
    <!--        <div class="box clearfix">-->
    <!--          <span class="list-icon"></span>-->
    <!--          <span class="list-name">农事日历</span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->

    <section class="news-box">
      <div class="list-box" v-for="(item,index) in serve">
        <div class="container">
          <a :href="'/article?id='+item.uniqid">
            <div class="row">
              <div class="col-lg-1 news-date">
                <p class="news-day">{{item.create_time | formatDateD}}</p>
                <p class="news-year">{{item.create_time | formatDateYM}}</p>
              </div>
              <div :class="{'col-lg-9':item.thumbnail,'col-lg-11':!item.thumbnail}">
                <p class="name">
                  {{item.title}}
                </p>
                <p class="intro">
                  {{item.excerpt}}
                </p>
              </div>
              <div class="col-lg-2" v-if="item.thumbnail">
                <div class="img-box">
                  <img :src="$config.apiUrl + item.thumbnail" alt="">
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <b-modal id="video-modal" centered size="xl" title="农事日历" hide-footer>
      <iframe src="http://www.moa.gov.cn/sj/index.htm" frameborder="0" width="1020px" height="695px"></iframe>
    </b-modal>

    <publicFooter/>
  </div>
</template>
<script>
  import publicHead from "../components/publicHead"
  import publicFooter from "../components/publicFooter"
  import axios from "axios"
  import Swiper from "swiper"
  import "swiper/css/swiper.min.css"
  import {WOW} from 'wowjs'

  export default {
    components: {
      publicHead,
      publicFooter
    },
    data() {
      return {
        show: 4,
        listType: "ARTICLE-TYPE-5DDA3FF9C6531",
        mobile: false,
        serve: [],
        dataList: [],
        hotList: [],
        recommendList: [],
        newsTopList: [],
        serveArr: [
          {
            name: "农民工服务",
            intro: "证照办理  权益维护  婚姻生育  就业服务  交通服务 社保服务  健康服务",
            img: "../../static/images/serveList1.jpg",
            link: "http://202.61.90.45"
          }, {
            name: "投资审批",
            intro: "项目登记  项目报批  信息报备  就业服务  中介服务 投资项目主题服务",
            img: "../../static/images/serveList2.jpg",
            link: "http://tzxm.sczwfw.gov.cn"
          }, {
            name: "农民工法律援助",
            intro: "法律咨询  法律援助申请指导  法律援助申请受理  劳资纠纷调解 劳动维权法治宣传  法律援助宣传",
            img: "../../static/images/serveList3.jpg",
            link: "http://www.zgnmg.org/sichuan/"
          }, {
            name: "双创培训",
            intro: "课程教学  专家咨询  政企合作  产销对接 综合农业教育服务平台",
            img: "../../static/images/serveList4.jpg",
            // link: "http://xue.yszn.net.cn/"
            link: "/cultivate"
          }, {
            name: "产品质量安全追溯",
            intro: "查询追溯码  政策法规  行业资讯  绿色食品  有机农产品 地理标志农产品",
            img: "../../static/images/serveList5.jpg",
            link: "http://www.scncpzs.com/"
          }, {
            name: "农产品质量安全监测",
            intro: "种植产品  畜禽兽药产品  畜禽饲料产品  水产品 投入品",
            img: "../../static/images/serveList6.jpg",
            link: "http://202.61.89.190:8080/"
          }, {
            name: "农药数字监督",
            intro: "全国农药质量追溯系统  监督执法服务系统 风险监测系统  行业统计系统  风险评估工具",
            img: "../../static/images/serveList7.jpg",
            link: "https://www.icama.cn/portal/homepage/index.do"
          }, {
            name: "农事日历",
            intro: "统计日历  农事日历  主要农事  节庆假日",
            img: "../../static/images/serveList8.jpg",
          }
        ]
      }
    },
    mounted() {
      this.getServe();
      this.getRecommend();
      this.getHot();
      this.getTopNews();
      this.mobile = window.innerWidth < 992;
      window.onresize = () => {
        this.mobile = window.innerWidth < 992;
      };
      this.$nextTick(() => { // 在dom渲染完后,再执行动画
        let wow = new WOW({
          live: false
        });
        wow.init()
      })
    },
    methods: {
      // 获取服务信息
      getServe() {
        // axios.get("../../static/data/serve.json", {}).then(res => {
        //     this.serve = res.data
        //     this.$nextTick(() => {
        //         this.initSwiper()
        //     })
        // })
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            type: this.listType,
            page: 1,
            limit: 8
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.serve = res.data.data.data;
          }
        })
      },
      //获取推荐
      getRecommend() {
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            type: this.listType,
            page: 1,
            limit: 3,
            recommended: 1
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.recommendList = res.data.data.data;
            this.$nextTick(() => {
              // this.initSwiper()
              this.initNewsSwiper();
            })
          }
        })
      },
      // 获取置顶新闻列表
      getTopNews: function () {
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            type: this.listType,
            page: 1,
            limit: 1,
            is_top: 1,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.newsTopList = res.data.data.data;
          }
        })
      },
      // 获取热门
      getHot() {
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            type: this.listType,
            page: 1,
            limit: 6,
            hot: 1
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.hotList = res.data.data.data;
          }
        })
      },
      // 打开modal
      showModal() {
        this.$bvModal.show("video-modal");
      },
      // 初始化swiper
      initSwiper() {
        new Swiper('.serve-swiper', {
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          observer: true,
          // 如果需要分页器
          pagination: {
            el: '.serve-pagination',
          },
        })
      },
      // 跳转链接
      jumpLink(index) {
        if (index === 3) {
          window.location.href = this.serveArr[index].link;
        } else {
          index >= 7 ? this.showModal() : window.open(this.serveArr[index].link);
        }
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
              self.activeNews = self.recommendList[index].title;
            }
          },
        })
      }
    },
    filters: {
      formatDateYM: function (value) {
        let date = new Date(value.replace(/-/g, '/'));
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        return y + '-' + MM;
      },
      formatDateMD: function (value) {
        let date = new Date(value.replace(/-/g, '/'));
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return MM + '-' + d;
      },
      formatDateD: function (value) {
        let date = new Date(value.replace(/-/g, '/'));
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return d;
      },
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
<style src="../assets/css/infomationHome.css" scoped></style>
<style src="../assets/css/serve.css" scoped></style>
<style src="../assets/css/news.css" scoped></style>
<style scoped>
  .news-box {
    background: none;
  }

  .information-news-box {
    padding-bottom: 0;
    background: none;
  }
</style>
<style>

  #serve .broadside-box {
    display: none;
  }

  .serve-pagination .swiper-pagination-bullet {
    opacity: 1;
    background-color: #fff;
    width: 10px;
    height: 10px;
  }

  .serve-pagination .swiper-pagination-bullet-active {
    background-color: #37cf9f;
    width: 38px;
    border-radius: 5px;

  }

  .modal-open .modal-body {
    overflow: scroll;
  }

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
