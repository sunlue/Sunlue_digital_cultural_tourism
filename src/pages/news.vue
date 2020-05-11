<template>
  <div id="news">
    <publicHead :show="show" :rightBtn="true"/>
    <section class="public-banner">
      <img class="banner-img" src="../../static/images/newsBanner.jpg" alt="" v-if="newsClassify===0">
      <img class="banner-img" src="../../static/images/newsBanner1.jpg" alt="" v-if="newsClassify===1">
      <img class="banner-img" src="../../static/images/newsBanner2.jpg" alt="" v-if="newsClassify===2">
    </section>
    <section class="news-box">
      <div class="list-box" v-for="(item,index) in newsArr">
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
                  <img :src="$config.apiUrl + item.thumbnail" alt="" :title="item.title">
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <b-pagination v-if="rows/perPage>1" hide-goto-end-buttons use-router align="center"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    @input="getNewsData"
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
        show: 31,//当前栏目
        newsArr: [],
        newsClassify: this.$route.query.type ? parseInt(this.$route.query.type) : 0,
        newsType: ["ARTICLE-TYPE-5DD3A76B30129", "ARTICLE-TYPE-5DE4C47C31494", "ARTICLE-TYPE-5DE5DA385A602"],
        rows: '',
        currentPage: 1,
        perPage: 10,
      }
    },
    mounted() {
      this.getNewsData()
    },
    methods: {
      //获取新闻动态数据
      getNewsData: function () {
        // axios.get("../../static/data/newsAll.json", {}).then(res => {
        //     this.newsArr = res.data
        // })
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        let perPage = this.perPage;
        axios.get(apiUrl, {
          params: {
            type: this.newsType[this.newsClassify],
            page: this.currentPage,
            limit: perPage,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            let resData = res.data.data;
            this.rows = resData.total;
            this.newsArr = resData.data;
          }
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
      formatDateD: function (value) {
        let date = new Date(value.replace(/-/g, '/'));
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return d;
      }
    }
  }
</script>
<style src="../assets/css/news.css" scoped>
</style>
