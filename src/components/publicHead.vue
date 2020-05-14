<template>
  <div class="box">
    <div class="clearfix head-box">
      <div class="box">
        <h1 class="float-left logo">
          <a href="/">
            <img src="../../static/images/logo.png" v-if="show===1||show>10" alt="logo" title="主页">
            <img src="../../static/images/logoRed.png" v-if="show!==1&&show<10" alt="logo" title="主页">
          </a>
        </h1>
        <ul class="float-left list-inline head-list-box">
          <li class="list-inline-item head-list" :class="{active:show === 1}">
            <a href="/">首页</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 2}">
            <a href="/activity">活动</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 3||show === 31}">
            <a href="/venue">场馆</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 4}">
            <a href="/people">名人堂</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 8}">
            <a href="/volunteers">志愿者</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 5}">
            <a href="/experience">体验</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 6}">
            <a href="http://t.fcvillage.com/pcMap/index.html"target="_blank">云图</a>
          </li>
          <li class="list-inline-item head-list" :class="{active:show === 7}">
            <a href="/shop">涪城荟</a>
          </li>
        </ul>
        <div class="float-right login-btn">
          <a href="/login">
            登录 / 注册
          </a>
        </div>
      </div>
    </div>

    <div class="broadside-box" :class="{'broadside-box-center':rightBtn}" v-if="false">
      <div class="broadside-list" @mouseleave="pauseAni(aniArr[0])" @mouseenter="playAni(aniArr[0])">
        <a href="/experience">
          <i class="list-icon public-list-icon"></i>
          <p class="list-text">全景</p>
        </a>
      </div>

      <div class="broadside-list" @mouseleave="pauseAni(aniArr[1])" @mouseenter="playAni(aniArr[1])">
        <div @click="$bvModal.show('QRCode-modal')">
          <i class="list-icon public-list-icon"></i>
          <p class="list-text">微信</p>
        </div>
      </div>

      <div class="broadside-list" @mouseleave="pauseAni(aniArr[2])" @mouseenter="playAni(aniArr[2])" v-if="false">
        <a href="/consult">
          <i class="list-icon public-list-icon"></i>
          <p class="list-text">咨询</p>
        </a>
      </div>

      <div class="broadside-list" @mouseleave="pauseAni(aniArr[3])" @mouseenter="playAni(aniArr[3])">
        <a href="javascript:void(0)">
          <i class="list-icon public-list-icon"></i>
          <p class="list-text">分享</p>
        </a>
      </div>
    </div>

    <div class="mobile-nav-box" :class="{'mobile-nav-box-fixed':closeBtn}">
      <div class="mobile-log">
        <a href="/">
          <img src="../../static/images/mobile_logo.png" alt="">
        </a>
      </div>
      <div class="mobile-btn" :class="{'close-btn':closeBtn}" @click="closeBtn = !closeBtn" v-if="false"></div>
      <ul class="mobile-nav clearfix" :class="{'mobile-nav-show':closeBtn}">
        <li>
          <a href="/">
            <div class="icon"></div>
            <p class="text">首页</p>
          </a>
        </li>
        <li>
          <a href="/village">
            <div class="icon"></div>
            <p class="text">活动</p>
          </a>
        </li>
        <li>
          <a href="/venue">
            <div class="icon"></div>
            <p class="text">场馆</p>
          </a>
        </li>
        <li>
          <a href="/serve">
            <div class="icon"></div>
            <p class="text">文化人</p>
          </a>
        </li>
        <li>
          <a href="/panorama">
            <div class="icon"></div>
            <p class="text">体验</p>
          </a>
        </li>
        <li>
          <a href="/consult">
            <div class="icon"></div>
            <p class="text">资讯</p>
          </a>
        </li>
      </ul>
    </div>

    <b-modal id="QRCode-modal" title="微信公众号" centered size="sm" hide-footer>
      <img class="img-fluid img-thumbnail" src="../../static/images/QRCode.png" alt="">
    </b-modal>
  </div>
</template>

<script>
    import lottie from 'lottie-web'
    import quanjingIcon from '../../static/icon/rightquanjing.json'
    import zixunIcon from '../../static/icon/zixun.json'
    import weixinIcon from '../../static/icon/weixin.json'
    import fenxiangIcon from '../../static/icon/fenxiang.json'

    export default {
        props: {
            show: {
                type: Number,
                required: true
            },
            rightBtn: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                closeBtn: false,
                aniArr: []
            }
        },
        mounted(){
            this.initAni();
        },
        methods:{
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
                let aniList = [quanjingIcon, weixinIcon, zixunIcon, fenxiangIcon];
                aniList.forEach((v, i) => {
                    let aniConfig = {
                        container: document.querySelectorAll('.public-list-icon')[i],
                        renderer: 'svg',
                        loop: true,
                        autoplay: false,
                        animationData: v
                    };
                    this.aniArr[i] = lottie.loadAnimation(aniConfig);
                });
            },
        }
    }
</script>
