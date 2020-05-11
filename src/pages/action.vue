<template>
  <div id="action">
    <publicHead :show="show" :rightBtn="true"/>
    <section class="public-banner">
      <img class="banner-img" src="../../static/images/actionBanner.jpg" alt="">
    </section>
    <section class="content-box">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-sm-6 list-box" v-for="(item,index) in actionArr">
            <a :href="'/article?id='+item.uniqid">
              <div class="box">
                <div class="img-box">
                  <img :src="$config.apiUrl + item.thumbnail" alt="" :title="item.title">
                </div>
                <div class="text-box clearfix">
                  <div class="date-box">
                    <p class="date-day">{{item.create_time | formatDateD}}</p>
                    <p class="date-year">{{item.create_time | formatDateYM}}</p>
                  </div>
                  <div class="name-box" :title="item.title">
                    {{item.title}}
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <b-pagination v-if="rows/perPage>1" hide-goto-end-buttons use-router align="center"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    @input="getActionData"
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
        actionArr: [],
        actionType: "ARTICLE-TYPE-5D1C482F4320B",
        rows: '',
        currentPage: 1,
        perPage: 9,
      }
    },
    mounted() {
      this.getActionData()
    },
    methods: {
      //获取特色活动数据
      getActionData: function () {
        // axios.get("../../static/data/actionAll.json", {}).then(res => {
        //     this.actionArr = res.data
        // })

        let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
        let perPage = this.perPage;
        axios.get(apiUrl, {
          params: {
            type: this.actionType,
            page: this.currentPage,
            limit: perPage,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            let resData = res.data.data;
            this.rows = resData.total;
            this.actionArr = resData.data;
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
<style src="../assets/css/action.css" scoped>
</style>
