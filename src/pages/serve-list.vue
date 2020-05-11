<template>
  <div id="serve-list" class="inside-box">
    <publicHead :show="show" :rightBtn="false"/>
    <section class="serve-list-box">
      <b-nav tabs align="center">
        <b-nav-item :active="tabId==1" @click="changeNav(1)">&emsp;党宣&emsp;</b-nav-item>
        <b-nav-item :active="tabId==2" @click="changeNav(2)">&emsp;生产&emsp;</b-nav-item>
        <b-nav-item :active="tabId==3" @click="changeNav(3)">&emsp;科技&emsp;</b-nav-item>
        <b-nav-item :active="tabId==4" @click="changeNav(4)">&emsp;金融&emsp;</b-nav-item>
        <b-nav-item :active="tabId==5" @click="changeNav(5)">&nbsp;农民工&nbsp;</b-nav-item>
        <b-nav-item :active="tabId==6" @click="changeNav(6)">社会组织</b-nav-item>
      </b-nav>
    </section>
    <section class="news-box serve-list-news">
      <div class="box">
        <div class="list-box" v-for="(item,index) in serveData">
          <div class="container">
            <router-link class="search-btn" :to="{ path: 'article', query: { id: item.id }}">
              <div class="row">
                <div class="col-lg-1 news-date">
                  <p class="news-day">{{item.create_time | formatDateD}}</p>
                  <p class="news-year">{{item.create_time | formatDateYM}}</p>
                </div>
                <div :class="{'col-lg-9':item.thumbnail,'col-lg-11':!item.thumbnail}">
                  <p class="name" :title="item.title">
                    {{item.title}}
                  </p>
                  <p class="intro">
                    {{item.excerpt}}
                  </p>
                </div>
                <div class="col-lg-2" v-if="item.thumbnail">
                  <div class="img-box">
                    <img :src="$config.apiUrl + item.thumbnail" alt="" :title="item.title">
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <b-pagination v-if="rows/perPage>1" hide-goto-end-buttons use-router align="center"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    @input="getServeData"
      ></b-pagination>

    </section>
    <publicFooter/>
  </div>
</template>
<script>
  import publicHead from "../components/publicHead"
  import publicFooter from "../components/publicFooter"
  import axios from "axios"

  export default {
    components: {
      publicHead,
      publicFooter
    },
    data() {
      return {
        show: 4,
        totalPage: 10,
        tabId: this.$route.query.id ? parseInt(this.$route.query.id) : 1,
        serveData: [],
        serveType: "",
        typeArr: [
          "ARTICLE-TYPE-5DDA7F2529C4A",
          "ARTICLE-TYPE-5DDA7F2BCC860",
          "ARTICLE-TYPE-5DDA7F3625498",
          "ARTICLE-TYPE-5DDA7F3ACCE5E",
          "ARTICLE-TYPE-5DDA7F48363E0",
          "ARTICLE-TYPE-5DDA7F54399A8"
        ],
        rows: '',
        currentPage: 1,
        perPage: 10
      }
    },
    mounted() {
      this.serveType = this.typeArr[this.tabId - 1];
      this.getServeData();
    },
    methods: {
      // 获取指定服务类型数据
      getServeData: function () {
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        axios.get(apiUrl, {
          params: {
            type: this.serveType,
            page: this.currentPage,
            limit: this.perPage,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            let resData = res.data.data;
            this.rows = resData.total;
            this.serveData = resData.data;
          }
        })
      },
      // 切换栏目
      changeNav(id) {
        this.tabId = id;
        this.currentPage = 1;
        this.serveType = this.typeArr[id - 1];
        this.getServeData();
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
      formatDateD: function (value) {
        let date = new Date(value.replace(/-/g, '/'));
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return d;
      }
    }
  }
</script>
<style src="../assets/css/serve.css" scoped></style>
<style src="../assets/css/news.css" scoped></style>
<style>
  #serve-list .broadside-box {
    display: none;
  }

  .serve-list-box .nav {
    border: none;
  }

  .serve-list-box .nav .nav-item .nav-link {
    border: none;
    color: #999;
    font-size: 24px;
    font-weight: 300;
  }

  .serve-list-box .nav .nav-item .nav-link:hover {
    color: #37cf9f;
    background-color: #fff;
  }

  .serve-list-box .nav .nav-item .nav-link.active {
    color: #37cf9f;
  }
</style>
