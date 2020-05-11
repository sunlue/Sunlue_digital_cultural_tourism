<template>
  <div id="village-home" class="inside-box">
    <villageHead :show="show" :vid="villageId"/>
    <section class="village-box">
      <div class="panorama-box" v-if="panoramaShow">
        <iframe :src="villageArr.tour" frameborder="0" width="100%" height="100%">
        </iframe>
        <span class="panorama-close" @click="panoramaShow = false"></span>
        <span class="tips" v-if="!villageArr.tour">
          全景正在制作中...
        </span>
      </div>

      <div class="swiper-container village-banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in banner">
            <div class="img-box">
              <img :src="$config.apiUrl + item.image" alt="">
            </div>
          </div>
        </div>
        <div class="swiper-button-prev village-banner-prev"></div>
        <div class="swiper-button-next village-banner-next"></div>
      </div>

<!--      <div class="village-thumbs-box">-->
<!--        <div class="swiper-container village-thumbs">-->
<!--          <div class="swiper-wrapper">-->
<!--            <div class="swiper-slide" v-for="item in banner">-->
<!--              <div class="img-box">-->
<!--                <img :src="$config.apiUrl + item.image" alt="">-->
<!--              </div>-->
<!--            </div>-->

<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <div class="content-box" :class="{'content-box-close':boxClose}">

        <div class="icon-box">
          <p class="icon-list" @mouseleave="pauseAni(aniArr[0])" @mouseenter="playAni(aniArr[0])" @click="panoramaShow = !panoramaShow,boxClose=true">
<!--            <a :href="panorama.length>0?panorama:'javascript:void(0)'" :target="panorama.length>0?'_blank':''" >-->
<!--              <i class="icon village-icon"></i>-->
<!--              <span class="text">VR</span>-->
<!--            </a>-->
            <i class="icon village-icon"></i>
            <span class="text">VR</span>
          </p>
          <p class="icon-list" @click="showModal" @mouseleave="pauseAni(aniArr[1])" @mouseenter="playAni(aniArr[1])">
            <i class="icon village-icon"></i>
            <span class="text">视频</span>
          </p>
          <p class="icon-list" :class="{'audio-play':audioPlay}" @click="playAudio">
            <i class="icon village-icon"></i>
            <span class="text">解说</span>
            <audio class="village-audio" :src="villageArr.audio?($config.apiUrl + villageArr.audio):'../../static/audio/1.mp3'"></audio>
          </p>
        </div>
        <div class="details-box">
          <div class="close-btn" @click="boxClose=!boxClose"></div>

          <p>
            <span class="name">{{villageArr.name}}</span>
            <span class="address">{{villageArr.town_text}}</span>
          </p>
          <p>
            <span class="tag" v-for="item in villageArr.tag">{{item.value}}</span>
          </p>
          <p>
            <span class="classify" v-for="item in villageArr.type">{{item}}</span>
          </p>
          <p>
            <span class="intro">{{villageArr.content | removeHtml}}</span>
            <router-link class="more" :to="{ path: 'village-culture', query: { vid:villageId}}">
              详细
            </router-link>
          </p>
        </div>
      </div>

    </section>


    <b-modal id="video-modal" centered size="xl" :title="villageArr.name" hide-footer>
      <video v-if="villageArr.video" class="village-home-video" :src="$config.apiUrl + villageArr.video"
             controls></video>
      <p v-if="!villageArr.video">暂无视频</p>
    </b-modal>

    <publicFooter/>
  </div>
</template>
<script>
    import villageHead from "../components/villageHead"
    import publicFooter from "../components/publicFooter"
    import Swiper from "swiper"
    import axios from "axios"
    import "swiper/css/swiper.min.css"
    import lottie from 'lottie-web'
    import aniIcon1 from '../../static/icon/quanjing.json'
    import aniIcon2 from '../../static/icon/video.json'
    import aniIcon3 from '../../static/icon/audio.json'

    export default {
        components: {
            villageHead,
            publicFooter
        },
        data() {
            return {
                show: 1,
                boxClose: false,
                audioPlay: false,
                villageId: this.$route.query.vid,
                villageArr: [],
                panorama: [],
                banner: [],
                aniArr: [],
                panoramaShow:false
            }
        },
        created() {
            this.boxClose = window.innerWidth < 992;
        },
        mounted() {
            this.setVillageBanner();
            this.getVillageData();
            this.getPanorama();
            this.gerBanner();
            this.initAni();
        },
        methods: {
            //获取当前村子数据
            getVillageData: function () {
                let apiUrl = this.$config.apiUrl + 'village/data/details';
                axios.get(apiUrl, {
                    params: {
                        uniqid: this.villageId,
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.villageArr = res.data.data;
                    }
                })
            },
            // 获取轮播图
            gerBanner: function () {
                let apiUrl = this.$config.apiUrl + 'village/slide/read';
                axios.get(apiUrl, {
                    params: {
                        village_id: this.villageId,
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.banner = res.data.data;
                    }
                })
            },
            // 初始化banner
            setVillageBanner: function () {
                // let villageThumbs = new Swiper('.village-thumbs', {
                //     observer: true,
                //     spaceBetween: 0,
                //     slidesPerView: 4,
                //     watchSlidesVisibility: true,//防止不可点击
                // });

                let villageBanner = new Swiper('.village-banner', {
                    observer: true,
                    autoplay: {
                        delay:5000
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    // thumbs: {
                    //     swiper: villageThumbs,
                    // }
                });

            },
            getPanorama: function () {
                let apiUrl = this.$config.apiUrl + 'village/krpano/read';
                axios.get(apiUrl, {
                    params: {
                        page: 1,
                        limit: 1,
                        village_id: this.villageId,
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        let resData = res.data.data.data
                        if(resData.length>0){
                            this.panorama = res.data.data.data[0].link;
                        }
                    }
                })
            },
            // 播放音乐
            playAudio: function () {
                let audio = document.querySelector("audio");
                if (this.audioPlay) {
                    audio.pause();
                    this.audioPlay = false
                    this.pauseAni(this.aniArr[2])
                } else {
                    audio.play();
                    this.audioPlay = true
                    this.playAni(this.aniArr[2])
                }
            },
            // 播放视频
            showModal() {
                this.$bvModal.show("video-modal");
                setTimeout(function () {
                    document.querySelector(".village-home-video").play();
                }, 200);
            },
            // 播放动画
            playAni(item) {
                item.play();
            },
            //暂停动画
            pauseAni(item) {
                item.stop();
            },
            // 初始化动画
            initAni() {
                let aniList = [aniIcon1, aniIcon2, aniIcon3];
                aniList.forEach((v, i) => {
                    let aniConfig = {
                        container: document.querySelectorAll('.village-icon')[i],
                        renderer: 'svg',
                        loop: true,
                        autoplay: false,
                        animationData: v
                    };
                    this.aniArr[i] = lottie.loadAnimation(aniConfig);
                });
            },
        },
        filters:{
            removeHtml:function(input){
                return input && input.replace(/<(?:.|\n)*?>/gm, '')
                    .replace(/(&rdquo;)/g, '\"')
                    .replace(/&ldquo;/g, '\"')
                    .replace(/&mdash;/g, '-')
                    .replace(/&nbsp;/g, '')
                    .replace(/&gt;/g, '>')
                    .replace(/&lt;/g, '<')
                    .replace(/<[\w\s"':=\/]*/, '');
            }
        }
    }
</script>
<style src="../assets/css/villageHome.css" scoped>
</style>
<style>
  .village-home-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .village-home-video:focus {
    border: none;
    outline: none;
  }

  #village-home .content-box .intro * {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    margin: 0;
  }

  #village-home path {
    stroke: #666;
    fill: #666;
  }
  #village-home .audio-play path {
    stroke: #37cf9f;
    fill: #37cf9f;
  }
</style>
