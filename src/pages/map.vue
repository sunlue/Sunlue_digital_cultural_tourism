<template>
  <div id="baidu-map" :class="{'inside-box':show != 1}">
    <publicHead :show="show" :rightBtn="true"/>
    <div class="map-box">
      <baidu-map class="bm-view" center="绵阳市" @ready="getMapStyle" :mapStyle="mapStyle" :scroll-wheel-zoom="true"
                 :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom">
        <bm-marker v-if="allVillage[index].isShow" v-for="(item,index) in allVillage"
                   :position="{lng: item.coord.lng, lat: item.coord.lat}" :key="index" :icon="allVillage[index].isHover?icon:iconH"
                   @mouseout="changerMarker(index)" @mouseover="changerMarker(index)" @click="jumpVillageList(item.uniqid)">
          <bm-label :content="item.name" :labelStyle="allVillage[index].isHover?labelStyle:labelStyleH"
                    :offset="offset"/>
        </bm-marker>
      </baidu-map>

      <div class="filter-box" :class="{'filter-box-close':!showFilter}">
        <div class="close-box" @click="showFilter=!showFilter"></div>
        <p class="towns-box">
          <span class="name">乡镇</span>
          <select v-model="nowTown" class="citySelect custom-select" @change="changeData">
            <option :value="list.value" v-for="list in cityData">{{list.label}}</option>
          </select>
        </p>
        <p class="feature-box">
          <span class="name">特色</span>
          <span class="village-classify-list" :class="{'active':list.checked}" v-for="(list,index) in classify"
                @click="setClassify(index,list.uniqid)">{{list.name}}</span>
        </p>
        <p class="search-box">
          <span class="name">关键词</span>
          <input type="text" v-on:keyup.enter="submitData" v-model="searchData" class="search-input"
                 placeholder="请输入关键词">
          <span class="search-btn" @click="submitData">
            <img src="../../static/images/villageSearch.png" alt="">
          </span>
        </p>

        <div class="search-result" v-if="searchResult.length>1">
          <p>
            <span class="name">
              搜索结果
            </span>
          </p>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination search-result-pagination"></div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev search-result-prev"></div>
          <div class="swiper-button-next search-result-next"></div>

          <div class="swiper-container search-result-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="list in searchResult">
                <a :href="'village-home?vid='+list.uniqid">
                  <div class="img-box">
                    <img :src="$config.apiUrl + list.thumbnail" alt="" :title="list.name">
                  </div>
                  <p class="list-name">
                    {{list.name}}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="hot-recommend">
          <p>
            <span class="name">
              热门推荐
            </span>
          </p>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination hot-recommend-pagination"></div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev hot-recommend-prev"></div>
          <div class="swiper-button-next hot-recommend-next"></div>

          <div class="swiper-container hot-recommend-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="list in hotRecommend">
                <a :href="'village-home?vid='+list.uniqid">
                  <div class="img-box">
                    <img :src="$config.apiUrl + list.thumbnail" alt="" :title="list.name">
                  </div>
                  <p class="list-name">
                    {{list.name}}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <publicFooter/>
  </div>
</template>
<script>
    import publicHead from "../components/publicHead"
    import publicFooter from "../components/publicFooter"
    import Vue from 'vue'
    import BaiduMap from 'vue-baidu-map'
    import axios from "axios"
    import Swiper from "swiper"
    import "swiper/css/swiper.min.css"

    Vue.use(BaiduMap, {
        // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
        ak: 'dNZ7kQVtWdRzTaKDQXnYujtybz6qPYxf'
    })

    export default {
        components: {
            publicHead,
            publicFooter
        },
        mounted: function () {
            this.getAllVillage();
            this.getCityData();
            this.getHotRecommend();
            this.getVillageClassify();

            new Swiper('.hot-recommend-swiper', {
                observer: true,
                slidesPerView: 3,
                spaceBetween: 10,
                slidesPerGroup: 3,
                // 如果需要分页器
                pagination: {
                    el: '.hot-recommend-pagination',
                    clickable: true
                },
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.hot-recommend-next',
                    prevEl: '.hot-recommend-prev',
                }
            })
        },
        created() {
            this.showFilter = !(window.innerWidth < 992);
        },
        data() {
            return {
                show: 2,
                showFilter: true,
                searchData: '',
                searchResult: [],
                searchDataArray: [],
                mapStyle: {},
                zoom: 13,
                minZoom: 13,
                maxZoom: 17,
                offset: {
                    width: 22,
                    height: 10
                },
                icon: {
                    url: '../../static/images/markerBg.png',
                    size: {width: 49, height: 108}
                },
                iconH: {
                    url: '../../static/images/markerBgH.png',
                    size: {width: 49, height: 108}
                },
                labelStyle: {
                    width: '1em',
                    color: '#333',
                    fontSize: '14px',
                    writingMode: 'tb-rl',
                    zIndex: '9',
                    border: 'none',
                    background: 'none'
                },
                labelStyleH: {
                    width: '1em',
                    color: '#fff',
                    fontSize: '14px',
                    writingMode: 'tb-rl',
                    zIndex: '9',
                    border: 'none',
                    background: 'none'
                },
                allVillage: [],
                cityData: [{"label": "全部", "value": 0}],
                townId: "510703000000",
                classify: [],
                nowTown: '0',
                hotRecommend: {},
                classifyOption: []
            }
        },
        methods: {
            //提交搜索信息
            submitData: function () {
                let apiUrl = this.$config.apiUrl + 'village/data/read';
                axios.get(apiUrl, {
                    params: {
                        name: this.searchData
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.searchResult = res.data.data;
                        this.$nextTick(()=>{
                            new Swiper('.search-result-swiper', {
                                observer: true,
                                slidesPerView: 3,
                                spaceBetween: 10,
                                slidesPerGroup: 3,
                                // 如果需要分页器
                                pagination: {
                                    el: '.search-result-pagination',
                                    clickable: true
                                },
                                // 如果需要前进后退按钮
                                navigation: {
                                    nextEl: '.search-result-next',
                                    prevEl: '.search-result-prev',
                                }
                            });
                        })
                    }
                })
            },
            // 获取村落分类
            getVillageClassify() {
                let apiUrl = this.$config.apiUrl + 'village/type/read';
                axios.get(apiUrl).then((res) => {
                    if (res.data.code === 200) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].checked = false
                        }
                        this.classify = res.data.data;
                    }
                });

            },
            // 获取乡镇信息
            getCityData: function () {
                let apiUrl = this.$config.apiUrl + 'region/read';
                let town = this.townId;
                axios.get(apiUrl).then((res) => {
                    if (res.data.code === 200) {
                        res.data.data.forEach((value, index) => {
                            if (value.parent == town) {
                                this.cityData.push(value)
                            }
                        });
                    }
                })
            },
            // 获取地图样式
            getMapStyle: function () {
                let self = this;
                axios.get('../../static/data/mapStyle.json').then(function (res) {
                    self.mapStyle = res.data;
                })
            },
            // 改变当前marker的颜色
            changerMarker: function (index) {
                this.allVillage[index].isHover = !this.allVillage[index].isHover
            },
            //更新数据
            changeData() {
                this.getAllVillage()
            },
            //获取全部乡村
            getAllVillage: function () {
                let apiUrl = this.$config.apiUrl + 'village/data/read';
                let apiGeo = this.$config.apiUrl + 'village/geo/details';
                axios.get(apiUrl, {
                    params: {
                        page: 1,
                        limit: 50,
                        town: this.nowTown,
                        type: this.classifyOption
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        let resData = res.data.data.data;
                        for (let i = 0; i < resData.length; i++) {
                            resData[i].isHover = true;
                            resData[i].isShow = true
                        }
                        this.allVillage = resData;
                    }
                })
            },

            // 跳转链接
            jumpVillageList: function (id) {
                this.$router.push({path: 'village-home', query: {vid: id}});
            },
            // 选择特色分类
            setClassify: function (index) {
                this.classifyOption = []
                this.classify[index].checked = !this.classify[index].checked;
                this.classify.forEach((value,index)=>{
                    if(value.checked){
                        this.classifyOption.push(value.uniqid);
                    }
                });
                this.getAllVillage();
            },

            // 获取热门推荐内容
            getHotRecommend: function () {
                let apiUrl = this.$config.apiUrl + 'village/data/read';
                axios.get(apiUrl, {
                    params: {
                        page: 1,
                        limit: 12,
                        recommended: 1,
                        hot: 1
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        let resData = res.data.data;
                        this.hotRecommend = resData.data;
                    }
                })
            },
        }
    }
</script>
<style src="../assets/css/map.css" scoped>
</style>
<style>
  #baidu-map .broadside-box {
    display: none !important;
  }

  .BMap_cpyCtrl {
    display: none;
  }

  .anchorBL {
    display: none;
  }

  .map-box .swiper-pagination-bullet {
    background-color: #666;
    margin: 0 5px;
    opacity: 1;
  }

  .map-box .swiper-pagination-bullet-active {
    background-color: #37cf9f;
  }

</style>
