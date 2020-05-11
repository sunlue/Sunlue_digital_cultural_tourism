<template>
  <div class="village" :class="{'inside-box':show != 1}">
    <publicHead :show="show" :rightBtn="true"/>
    <div class="village-box">
      <div class="serve-banner-box">
        <img src="../../static/images/serveBanner.jpg" alt="" class="img-fluid">
        <p class="title">
          双创培训
        </p>
      </div>

    </div>
    <div class="common-hot-box">
      <div class="container">
        <div class="row">
          <div class="hot-list col-lg-3 col-sm-6" v-for="(item,index) in videoList" :key="index">
            <div class="box" @click="showModal(index)">
              <div class="img-box">
                <img :src="item.images" alt="" :title="item.name">
              </div>

              <div class="text-box">
                <p class="clearfix">
                  <span class="name">{{item.name}}</span>
                </p>
                <p class="type-box">
                  {{item.intro}}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!--        <b-pagination v-if="rows/perPage>1" hide-goto-end-buttons use-router align="center"-->
        <!--                      v-model="currentPage"-->
        <!--                      :total-rows="rows"-->
        <!--                      :per-page="perPage"-->
        <!--                      @input="getHotVillage"-->
        <!--        ></b-pagination>-->
      </div>
    </div>

    <b-modal id="video-modal" centered size="xl" :title="activeVideo.activeName" hide-footer hide-header>
      <video class="village-home-video" :src="activeVideo.activeVideoLink" controls></video>
      <div class="clearfix" style="margin: 20px 0">
        <p class="name">{{activeVideo.name}}</p>
        <select class="form-control" @change="setVideoLink()" v-model="videoNum">
          <option :value="index" :key="index" v-for="(item,index) in activeVideo.list">{{item.name}}</option>
        </select>
      </div>
      <p class="intro">{{activeVideo.intro}}</p>
    </b-modal>

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
        show: 4,
        mobile: false,
        videoList: {},
        videoNum: 0,
        activeVideo: {
          videoList: "",
          activeName: "",
          activeVideoLink: "",
        }
      }
    },
    mounted: function () {
      this.mobile = window.innerWidth < 992;
      window.onresize = res => {
        this.mobile = window.innerWidth < 992;
      };
      this.getVideo();
    },
    methods: {
      //获取学习视频
      getVideo: function () {
        axios.get("../../static/data/cultivate.json").then(res => {
          this.videoList = res.data.data;
        })
      },
      // 播放视频
      showModal(index) {
        this.$bvModal.show("video-modal");
        this.activeVideo = this.videoList[index];
        this.activeVideo.activeName = this.videoList[index].list[0].name;
        this.activeVideo.activeVideoLink = this.videoList[index].list[0].video;
        this.videoNum = 0;
        setTimeout(function () {
          document.querySelector(".village-home-video").play();
        }, 200);
      },
      // 设置播放器地址
      setVideoLink() {
        this.activeVideo.activeName = this.activeVideo.list[this.videoNum].name;
        this.activeVideo.activeVideoLink = this.activeVideo.list[this.videoNum].video;
        setTimeout(function () {
          document.querySelector(".village-home-video").play();
        },200);
      }
    }
  }
</script>

<style src="../assets/css/village.css" scoped>
</style>
<style scoped>
  .village-box .serve-banner-box {
    position: relative;
  }

  .village-box .serve-banner-box .title {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 20px;
    font-size: 40px;
    color: #fff;
  }

  .common-hot-box {
    padding: 50px 0;
  }

  .hot-list {
    cursor: pointer;
  }

  .common-hot-box .text-box .name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  .common-hot-box .text-box .type-box {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  #video-modal video {
    max-width: 100%;
    width: 100%;
  }

  #video-modal video:focus {
    outline: none;
  }

  #video-modal .intro {
    font-size: 14px;
    color:#777;
  }

  #video-modal .name {
    font-size: 26px;
    margin: 0;
    line-height: 1.5em;
    width: 70%;
    float: left;
  }

  #video-modal .form-control {
    width: 30%;
    float: left;
  }
</style>
<style>
  #video-modal .modal-body::after{
    position: absolute;
    content: "";
    width: 30px;
    height: 2px;
    background: #37cf9f;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: center;
    transform-origin: center;
    top: 15px;
    right: -40px;
    pointer-events: none;
  }
  #video-modal .modal-body::before{
    position: absolute;
    content: "";
    width: 30px;
    height: 2px;
    background: #37cf9f;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: center;
    transform-origin: center;
    top: 15px;
    right: -40px;
    pointer-events: none;
  }
</style>
