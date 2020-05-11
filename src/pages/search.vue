<template>
  <div id="news">
    <publicHead :show="show" :rightBtn="true"/>
    <section class="public-banner">
      <img class="banner-img" src="../../static/images/searchBanner.jpg" alt="">
      <div class="search-box">
        <span class="name">搜索</span>
        <div class="input-box">
          <input class="search-input" type="text" placeholder="请输入关键词" v-model="searchValue" v-on:keyup.enter="getSearch">
          <span class="search-btn" @click="getSearch"></span>
        </div>
      </div>
    </section>
    <section class="news-box">
      <div class="list-box" v-for="(item,index) in searchVillage">
        <div class="container">
          <a :href="'village-home?vid='+item.uniqid">
            <div class="row">
              <div class="offset-lg-2 col-lg-9">
                <p class="name" v-html="ruleTitle(item.name)">
                </p>
                <p class="intro">
                  {{item.content | removeHtml}}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="list-box" v-for="(item,index) in searchArticle">
        <div class="container">
          <a :href="'article?id='+item.uniqid">
            <div class="row">
              <div class="offset-lg-2 col-lg-9">
                <p class="name" v-html="ruleTitle(item.title)">
                </p>
                <p class="intro">
                  {{item.content | removeHtml}}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
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
                show: 1,//当前栏目
                search: [],
                searchVillage: [],
                searchArticle: [],
                searchValue: decodeURIComponent(this.$route.query.antistop),
            }
        },
        mounted() {
            this.getSearch();
        },
        methods: {
            getSearch:function(){
                this.getVillageData();
                this.getArticleData();
            },
            //获取搜索村庄数据
            getVillageData: function () {
                let apiUrl = this.$config.apiUrl + 'village/data/read';
                axios.get(apiUrl, {
                    params: {
                        name: this.searchValue
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.searchVillage = res.data.data;
                    }
                })
            },
            //获取文章数据
            getArticleData: function () {
                let apiUrl = this.$config.apiUrl + 'portal/article/data/read';
                axios.get(apiUrl, {
                    params: {
                        title: this.searchValue
                    }
                }).then((res) => {
                    if (res.data.code === 200) {
                        this.searchArticle = res.data.data;
                    }
                })
            },
            // 搜索词高亮
            ruleTitle(name) {
                let titleString = name;
                if (!titleString) {
                    return '';
                }
                if (this.searchValue && this.searchValue.length > 0) {
                    // 匹配关键字正则
                    let replaceReg = new RegExp(this.searchValue, 'g');
                    // 高亮替换v-html值
                    let replaceString = '<span class="search-text">' + this.searchValue + '</span>';
                    // 开始替换
                    titleString = titleString.replace(replaceReg, replaceString);
                }
                return titleString;
            }
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
<style src="../assets/css/search.css" scoped>
</style>
<style>
  .search-text {
    color: #37cf9f;
  }

  .list-box:hover .search-text {
    color: #fff;
  }
</style>
