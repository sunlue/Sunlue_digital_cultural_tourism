<template>
  <div id="village-culture" class="inside-box">
    <villageHead :show="show" :vid="villageId"/>
    <section>
      <div class="village-banner">
        <img class="img-fluid" :src="$config.apiUrl + banner" alt="">
      </div>
      <div class="content-box">
        <div class="container-fluid">

          <div class="culture list-jump" v-show="!sceneryArr.length<1">
            <p class="title">风景名胜</p>
            <div class="swiper-container team-swiper" :style="{height:sceneryArr.length>3?'':'auto'}">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in sceneryArr">
                  <a :href="'/article?sid='+item.uniqid">
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
              <div class="swiper-pagination team-pagination"></div>

              <!-- 如果需要导航按钮 -->
              <div class="swiper-button-prev team-prev"></div>
              <div class="swiper-button-next team-next"></div>
            </div>
            <p v-if="sceneryArr.length<1">资料整理中...</p>
          </div>
          <div class="history list-jump" v-show="!specialtyArr.length<1">
            <p class="title">特色物产</p>
            <div class="swiper-container specialty-swiper" :style="{height:specialtyArr.length>3?'':'auto'}">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in specialtyArr">
                  <a :href="'/article?id='+item.uniqid">
                    <div class="img-box">
                      <img :src="$config.apiUrl + item.thumbnail" alt="" :title="item.title">
                    </div>
                    <p class="name" :title="item.title">
                      {{item.title}}
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
            <p v-if="specialtyArr.length<1">资料整理中...</p>
          </div>
          <div class="text-center" v-if="sceneryArr.length<1&&specialtyArr.length<1">
            <img src="../../static/images/defaultImg.png" alt="">
          </div>
        </div>
      </div>
    </section>

    <div class="right-anchor">
      <p class="list" v-show="!sceneryArr.length<1" :class="{'active':showItem==0}" @click="goLocation(0)">风景名胜</p>
      <p class="list" v-show="!specialtyArr.length<1" :class="{'active':showItem==1}" @click="goLocation(1)">特色物产</p>
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
            this.getSpecialtyData();
            this.getScenery();
            this.getBanner();
            window.addEventListener('scroll', this.setAnchor);

            this.mobile = window.innerWidth<992;
            window.onresize = ()=>{
                this.mobile = window.innerWidth<992;
            };
        },
        destroyed() { //页面离开后销毁，防止切换路由后上一个页面监听scroll滚动事件会在新页面报错问题
            window.removeEventListener('scroll', this.setAnchor)
        },
        data() {
            return {
                show: 3,
                mobile:false,
                villageId: this.$route.query.vid,
                villageArr: [],
                specialtyArr: [],
                sceneryArr: [],
                showItem: 0,
                villageType:"ARTICLE-TYPE-5DDA9B607D792",
                banner:""
            }
        },
        methods: {
            //获取内容
            getVillageData() {
                axios.get("../../static/data/villageResource.json", {
                    id: this.villageId
                }).then(res => {
                    this.villageArr = res.data;
                })


            },
            // 获取特产数据
            getSpecialtyData() {
                let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
                axios.get(apiUrl, {
                    params: {
                        type: this.villageType,
                        page: 1,
                        limit: 12,
                        village_id:this.villageId
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.specialtyArr = res.data.data.data;
                        this.$nextTick(() => {
                            this.initSwiper();
                        })
                    }
                })
            },
            // 获取风景名胜
            getScenery() {
                let apiUrl = this.$config.apiUrl + 'village/scenic/read';
                axios.get(apiUrl, {
                    params: {
                        village_id: this.villageId,
                        page:1,
                        limit:12
                    }
                }).then((res) => {
                    this.sceneryArr = res.data.data.data
                })
            },
            //右侧锚点
            setAnchor() {
                let windowTop = document.documentElement.scrollTop;
                let el = document.querySelectorAll(".list-jump");
                el.forEach((item, index) => {
                    let elTop = item.offsetTop;
                    let height = window.innerHeight;
                    if(elTop>0){
                        if (windowTop > elTop - height) {
                            this.showItem = index;
                        }
                    }
                });
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
            //去指定位置
            goLocation(i) {
                document.documentElement.scrollTop = document.querySelectorAll(".list-jump")[i].offsetTop;
            },
            // 初始化swiper
            initSwiper() {
                new Swiper('.specialty-swiper', {
                    observer: true,
                    slidesPerView: this.mobile?1:3,
                    slidesPerColumn: this.mobile?1:2,
                    slidesPerColumnFill : 'row',
                    spaceBetween: 30,
                    // 如果需要分页器
                    pagination: {
                        el: '.specialty-pagination',
                        clickable:true
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.specialty-next',
                        prevEl: '.specialty-prev',
                    },
                });
                new Swiper('.team-swiper', {
                    observer: true,
                    slidesPerView: this.mobile ? 1 : 3,
                    slidesPerColumn: this.mobile?1:2,
                    slidesPerColumnFill : 'row',
                    spaceBetween: 30,
                    // 如果需要分页器
                    pagination: {
                        el: '.team-pagination',
                        clickable: true
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.team-next',
                        prevEl: '.team-prev',
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

  .swiper-container .swiper-pagination-bullet-active {
    background-color: #37cf9f;
  }

  .swiper-container .swiper-pagination-bullet:focus{
    outline: none;
  }

</style>
