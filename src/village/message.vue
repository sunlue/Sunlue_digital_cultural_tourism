<template>
  <div id="village-culture" class="inside-box">
    <villageHead :show="show" :vid="villageId"/>
    <section>
      <div class="village-banner">
        <img class="img-fluid" :src="$config.apiUrl + banner" alt="">
      </div>
      <div class="content-box">
        <div class="container-fluid">

          <div class="culture list-jump" v-show="!villageNewsArr.length<1">
            <p class="title">信息动态</p>
            <a :href="'/article?id='+item.uniqid" class="row message-list" v-for="(item,index) in villageNewsArr">
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
            </a>
            <p v-if="villageNewsArr.length<1">资料整理中...</p>
          </div>

          <div class="text-center" v-if="villageNewsArr.length<1">
            <img src="../../static/images/defaultImg.png" alt="">
          </div>
        </div>
      </div>
      <b-pagination v-if="rows/perPage>1" hide-goto-end-buttons use-router align="center"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    @input="getVillageData"
      ></b-pagination>
    </section>
    <publicFooter/>
  </div>
</template>
<script>
  import villageHead from "../components/villageHead"
  import publicFooter from "../components/publicFooter"
  import axios from "axios"

  export default {
    components: {
      villageHead,
      publicFooter
    },
    mounted() {
      this.getVillageData();
      this.getBanner();
    },
    data() {
      return {
        show: 5,
        villageId: this.$route.query.vid,
        villageNewsArr: [],
        showItem: 0,
        newsType: "ARTICLE-TYPE-5DD3A76B30129",
        rows: '',
        currentPage: 1,
        perPage: 10,
        banner: ""
      }
    },
    methods: {
      //获取内容
      getVillageData() {
        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        let perPage = this.perPage;
        axios.get(apiUrl, {
          params: {
            type: this.newsType,
            page: this.currentPage,
            limit: perPage,
            village_id: this.villageId
          }
        }).then((res) => {
          if (res.data.code === 200) {
            let resData = res.data.data;
            this.rows = resData.total;
            this.villageNewsArr = resData.data;
          }
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
<style src="../assets/css/villagePage.css" scoped></style>

