<template>
  <div id="village-culture" class="inside-box">
    <villageHead :show="show" :vid="villageId"/>
    <section>
      <div class="village-banner">
        <img class="img-fluid" :src="$config.apiUrl + teamArr.banner" alt="">
      </div>
      <div class="content-box">
        <div class="container-fluid">

          <div class="history list-jump" v-show="teamArr.content">
            <p class="title">党组织</p>
            <div v-html="teamArr.content">
            </div>
            <p v-if="!teamArr.content">资料整理中...</p>
          </div>

          <div class="history list-jump" v-show="!doubleArr.length<1">
            <p class="title">两新组织</p>
            <div class="swiper-container team-swiper" :style="{height:doubleArr.length>3?'':'auto'}">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in doubleArr">
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
              <div class="swiper-pagination team-pagination"></div>

              <!-- 如果需要导航按钮 -->
              <div class="swiper-button-prev team-prev"></div>
              <div class="swiper-button-next team-next"></div>
            </div>
            <p v-if="doubleArr.length<1">资料整理中...</p>
          </div>

          <div class="text-center" v-if="!teamArr.content&&doubleArr.length<1">
            <img src="../../static/images/defaultImg.png" alt="">
          </div>
        </div>
      </div>
    </section>

    <div class="right-anchor">
      <p class="list" :class="{'active':showItem==0}" v-show="teamArr.content" @click="goLocation(0)">党组织</p>
      <p class="list" :class="{'active':showItem==1}" v-show="!doubleArr.length<1" @click="goLocation(1)">两新组织</p>
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
            // this.getVillageData();
            this.getDoubleData();
            this.getTeamData();
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
                show: 4,
                mobile: false,
                villageId: this.$route.query.vid,
                villageArr: [],
                doubleArr: [],
                teamArr: [],
                showItem: 0,
                doubleType: "ARTICLE-TYPE-5DD63DAEF1AF5",
                teamType: "ARTICLE-TYPE-5DDA9B3D61D8B",

            }
        },
        methods: {
            // //获取内容
            // getVillageData() {
            //     axios.get("../../static/data/villageResource.json", {
            //         id: this.villageId
            //     }).then(res => {
            //         this.villageArr = res.data;
            //
            //         this.$nextTick(() => {
            //             this.initSwiper();
            //         })
            //
            //     })
            // },

            // 获取两新组织数据
            getDoubleData() {
                let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
                axios.get(apiUrl, {
                    params: {
                        type: this.doubleType,
                        page: 1,
                        limit: 12,
                        village_id: this.villageId
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.doubleArr = res.data.data.data;
                        this.$nextTick(() => {
                            this.initSwiper();
                        })
                    }
                })
            },
            // 获取党组织
            getTeamData() {
                let apiUrl = this.$config.apiUrl + 'village/group/details';
                axios.get(apiUrl, {
                    params: {
                        village_id: this.villageId
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.teamArr = res.data.data;
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
            //去指定位置
            goLocation(i) {
                document.documentElement.scrollTop = document.querySelectorAll(".list-jump")[i].offsetTop;
            },
            // 初始化swiper
            initSwiper() {
                new Swiper('.branch-swiper', {
                    observer: true,
                    slidesPerView: this.mobile ? 1 : 3,
                    slidesPerColumn: this.mobile ? 1 : 2,
                    slidesPerColumnFill : 'row',
                    spaceBetween: 30,
                    // 如果需要分页器
                    pagination: {
                        el: '.branch-pagination',
                        clickable: true
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.branch-next',
                        prevEl: '.branch-prev',
                    },
                });

                new Swiper('.team-swiper', {
                    observer: true,
                    slidesPerView: this.mobile ? 1 : 3,
                    slidesPerColumn: this.mobile ? 1 : 2,
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

  .swiper-container .swiper-pagination-bullet:focus {
    outline: none;
  }
</style>
