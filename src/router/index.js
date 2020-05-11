import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import login from '@/pages/login'
import activity from '@/pages/activity'
import venue from '@/pages/venue'
import people from '@/pages/people'
import experience from '@/pages/experience'


import village from '@/pages/village'
import map from '@/pages/map'
import search from '@/pages/search'
import informationHome from '@/pages/information-home'
import action from '@/pages/action'
import news from '@/pages/news'
import consult from '@/pages/consult'
import panorama from '@/pages/panorama'
import article from '@/pages/article'
import serve from '@/pages/serve'
import cultivate from '@/pages/cultivate'
import serveList from '@/pages/serve-list'
import dataView from '@/pages/dataView'
import villageHome from '@/village/home'
import villageCulture from '@/village/culture'
import villageResource from '@/village/resource'
import villageTeam from '@/village/team'
import villageMessage from '@/village/message'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: home
    },
    {
      path: '/activity',
      name: '活动',
      component: activity
    },{
      path: '/venue',
      name: '场馆',
      component: venue
    },{
      path: '/people',
      name: '文化人',
      component: people
    },{
      path: '/experience',
      name: '体验',
      component: experience
    },
    
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/village',
      name: '村落',
      component: village
    },
    {
      path: '/map',
      name: '地图',
      component: map
    },
    {
      path: '/search',
      name: '搜索',
      component: search
    },
    {
      path: '/information-home',
      name: '资讯首页',
      component: informationHome
    },
    {
      path: '/action',
      name: '特色活动',
      component: action
    },
    {
      path: '/news',
      name: '新闻动态',
      component: news
    },
    {
      path: '/panorama',
      name: '720全景',
      component: panorama
    },
    {
      path: '/article',
      name: '详情页',
      component: article
    },
    {
      path: '/serve',
      name: '服务',
      component: serve
    },
    {
      path: '/cultivate',
      name: '双创培训',
      component: cultivate
    },
    {
      path: '/serve-list',
      name: '服务内页',
      component: serveList
    },
    {
      path: '/data-view',
      name: '大数据引用',
      component: dataView
    },
    {
      path: '/consult',
      name: '咨询',
      component: consult
    },
    {
      path: '/village-home',
      name: '村首页',
      component: villageHome
    },
    {
      path: '/village-culture',
      name: '文化概况',
      component: villageCulture
    },
    {
      path: '/village-resource',
      name: '资源产物',
      component: villageResource
    },
    {
      path: '/village-team',
      name: '组织党建',
      component: villageTeam
    },
    {
      path: '/village-message',
      name: '信息动态',
      component: villageMessage
    }
  ]
})
