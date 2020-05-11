<template>
  <div id="village-culture" class="inside-box">
    <villageHead :show="show" :vid="villageId"/>
    <section>
      <div class="village-banner">
        <img class="img-fluid" :src="$config.apiUrl + banner" alt="">
      </div>
      <div class="content-box">
        <div class="container-fluid">
          <div class="intro list-jump">
            <p class="title">村落概况</p>
            <div class="content">
              <table class="table table-bordered">
                <tr>
                  <th colspan="3">村落名称</th>
                  <th colspan="3">村落属性</th>
                </tr>
                <tr>
                  <td colspan="3">{{intro.name}}</td>
                  <td colspan="3">{{intro.attribute == 1 ? "行政村" : "自然村"}}</td>
                </tr>
                <tr>
                  <th>户籍人口</th>
                  <th>户籍人口(男)</th>
                  <th>户籍人口(女)</th>
                  <th>常住人口</th>
                  <th>常住人口(男)</th>
                  <th>常住人口(女)</th>
                </tr>
                <tr>
                  <td>{{intro.registered_population}}</td>
                  <td>{{intro.registered_population_man}}</td>
                  <td>{{intro.registered_population_woman}}</td>
                  <td>{{intro.permanent_population}}</td>
                  <td>{{intro.permanent_population_man}}</td>
                  <td>{{intro.permanent_population_woman}}</td>
                </tr>
                <tr>
                  <th>形成年代</th>
                  <th>村集体年收入</th>
                  <th>村人均年收入</th>
                  <th>村域面积</th>
                  <th>村庄面积</th>
                  <th>主要产业</th>
                </tr>
                <tr>
                  <td>{{intro.decade}}</td>
                  <td>{{intro.collective_income}}</td>
                  <td>{{intro.person_income}}</td>
                  <td>{{intro.domain_area}} 平方公里</td>
                  <td>{{intro.village_area}} 平方公里</td>
                  <td>{{intro.industry}}</td>
                </tr>
                <tr>
                  <th colspan="6" class="text-center">简介</th>
                </tr>
                <tr>
                  <td colspan="6" v-html="intro.content"></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="culture list-jump" v-show="!culturalArr.length<1">
            <p class="title">文物古迹</p>
            <div class="swiper-container specialty-swiper" :style="{height:culturalArr.length>3?'':'auto'}">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in culturalArr">
                  <a :href="'/article?rid='+item.uniqid">
                    <div class="img-box">
                      <img :src="$config.apiUrl + item.thumbnail" alt="" :title="item.name">
                    </div>
                    <p class="name" :title="item.name">
                      {{item.name}}
                    </p>
                  </a>
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination specialty-pagination"></div>

              <!-- 如果需要导航按钮 -->
              <div class="swiper-button-prev specialty-prev"></div>
              <div class="swiper-button-next specialty-next"></div>
            </div>
            <!--            <p v-if="!culturalArr.length<1">资料整理中...</p>-->
          </div>
          <div class="history list-jump" v-show="naturalArr.annual_mean_temperature">
            <p class="title">自然环境</p>
            <div v-if="naturalArr.annual_mean_temperature">
              <table class="table table-bordered">
                <tr>
                  <th>年平均温度</th>
                  <th>年均降雨量</th>
                  <th>年无霜期</th>
                </tr>
                <tr>
                  <td>{{naturalArr.annual_mean_temperature}}℃</td>
                  <td>{{naturalArr.annual_rainfall}}ml</td>
                  <td>{{naturalArr.annual_frost_free_period}}</td>
                </tr>

                <tr>
                  <th>植被覆盖率</th>
                  <th>气候特征</th>
                  <th>主要耕地</th>
                </tr>
                <tr>
                  <td>{{naturalArr.vegetation_coverage}}%</td>
                  <td>{{naturalArr.climate_characteristics}}</td>
                  <td>{{naturalArr.main_land}}</td>
                </tr>

              </table>
            </div>
            <!--            <p v-if="!naturalArr.annual_mean_temperature">资料整理中...</p>-->
          </div>
        </div>
      </div>
    </section>

    <div class="right-anchor">
      <p class="list" :class="{'active':showItem==0}" @click="goLocation(0)">村落概况</p>
      <p class="list" v-show="!culturalArr.length<1" :class="{'active':showItem==1}" @click="goLocation(1)">文物古迹</p>
      <p class="list" v-show="naturalArr.annual_mean_temperature" :class="{'active':showItem==2}"
         @click="goLocation(2)">自然环境</p>
      <p class="list" @click="returnTop">返回顶部</p>
    </div>
    <publicFooter/>
  </div>
</template>
<script>
  import villageHead from "../components/villageHead"
  import publicFooter from "../components/publicFooter"
  import Swiper from "swiper"
  import axios from "axios"
  import "swiper/css/swiper.min.css"

  export default {
    components: {
      villageHead,
      publicFooter
    },
    mounted() {
      this.getVillageData();
      this.getNatural();
      this.getCultural();
      this.getBanner();

      window.addEventListener('scroll', this.setAnchor);
      this.mobile = window.innerWidth < 992;
      window.onresize = () => {
        this.mobile = window.innerWidth < 992;
      };
    },
    destroyed() { //页面离开后销毁，防止切换路由后上一个页面监听scroll滚动事件会在新页面报错问题
      window.removeEventListener('scroll', this.setAnchor)
    },
    data() {
      return {
        show: 2,
        mobile: false,
        villageId: this.$route.query.vid,
        villageArr: [],
        showItem: 0,
        intro: {},
        naturalArr: [],
        culturalArr: [],
        banner: ""
      }
    },
    methods: {
      //获取内容
      getVillageData() {
        let apiUrl = this.$config.apiUrl + 'village/data/details';
        axios.get(apiUrl, {
          params: {
            uniqid: this.villageId
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.intro = res.data.data;
          }
        })
      },
      // 获取自然资源
      getNatural() {
        let apiUrl = this.$config.apiUrl + 'village/natural/details';
        axios.get(apiUrl, {
          params: {
            village_id: this.villageId
          }
        }).then((res) => {
          this.naturalArr = res.data.data;
        })
      },
      // 获取文物古迹
      getCultural() {
        let apiUrl = this.$config.apiUrl + 'village/relics/read';
        axios.get(apiUrl, {
          params: {
            village_id: this.villageId,
            page: 1,
            limit: 12
          }
        }).then((res) => {
          this.culturalArr = res.data.data.data;
          this.$nextTick(() => {
            this.initSwiper();
          })
        })
      },
      // 获取banner
      getBanner() {
        let apiUrl = this.$config.apiUrl + 'village/group/details';
        axios.get(apiUrl, {
          params: {
            village_id: this.villageId
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.banner = res.data.data.banner;
          }
        })
      },
      //右侧锚点
      setAnchor() {
        let windowTop = document.documentElement.scrollTop;
        let el = document.querySelectorAll(".list-jump");
        el.forEach((item, index) => {
          let elTop = item.offsetTop;
          let height = window.innerHeight;
          if (elTop > 0) {
            if (windowTop > elTop - height) {
              this.showItem = index;
            }
          }
        })
      },
      // 回到顶部
      returnTop() {
        let ani = setInterval(function () {
          let windowTop = document.documentElement.scrollTop;
          if (windowTop > 0) {
            document.documentElement.scrollTop -= 40;
          } else {
            clearInterval(ani);
          }
        }, 10);
      },
      //去指定位置
      goLocation(i) {
        // document.documentElement.scrollTop = document.querySelectorAll(".list-jump")[i].offsetTop;
        return false;
      },
      // 初始化swiper
      initSwiper() {
        new Swiper('.specialty-swiper', {
          observer: true,
          slidesPerView: this.mobile ? 1 : 3,
          slidesPerColumn: this.mobile ? 1 : 2,
          slidesPerColumnFill: 'row',
          spaceBetween: 30,
          // 如果需要分页器
          pagination: {
            el: '.specialty-pagination',
            clickable: true
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.specialty-next',
            prevEl: '.specialty-prev',
          },
        });
      }
    }
  }
</script>

<style src="../assets/css/villagePage.css" scoped></style>
<style>
  #village-culture .content-box img {
    max-width: 100%;
  }

  #village-culture table {
    background: #f6f6f6;
  }

  #village-culture table th {
    color: #555;
  }

  #village-culture table td {
    background: #fff;
    color: #666;
  }

  .swiper-container .swiper-pagination-bullet-active {
    background-color: #37cf9f;
  }

  .swiper-container .swiper-pagination-bullet:focus {
    outline: none;
  }
</style>
