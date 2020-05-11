<template>
  <footer id="footer">
    <!-- Copyright © 数字乡村公共服务平台 All Rights Reserved.Powered by
		<a target="_blank" href="http://www.sunlue.com">上略互动</a> | {{questionArr.icp_copyright}} |
    {{questionArr.police_copyright}} -->
    <div class="con">
      <div class="left">
        <a href="javascript:;">首页</a>
        <a href="javascript:;">关于我们</a>
        <a href="javascript:;">联系我们</a>
        <a href="javascript:;">会员中心</a>
        <a href="javascript:;">服务条款</a>
        <a href="javascript:;">意见反馈</a>
        <a href="javascript:;">友情链接</a>
        <a href="javascript:;">法律声明</a>
        <a href="javascript:;">站长统计</a>
        <p>
          Copyright © 涪城文旅公共服务平台 All Rights Reserved.Powered by
          <a target="_blank" href="http://www.sunlue.com">上略互动</a>
          <a target="_blank" href="http://beian.miit.gov.cn/">&nbsp;{{ questionArr.icp_copyright }}</a>
        </p>
      </div>
      <div class="right">
        <a href="javascript:;">
          <span class="iconfont iconapp"></span>
          <span>移动端</span>
        </a>
        <a href="javascript:;">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </a>
        <a href="javascript:;">
          <span class="iconfont iconqq"></span>
          <span>在线客服</span>
        </a>
        <a href="javascript:;">
          <span class="iconfont iconfenxiang"></span>
          <span>分享</span>
        </a>
      </div>
    </div>
  </footer>
</template>
<style type="text/css">
#footer {
  padding: 20px 0px;
  line-height: none;
}
#footer .con {
  max-width: 1240px;
  margin: 0 auto;
}

#footer::after {
  content: '';
  display: block;
  clear: both;
}
#footer .left {
  width: 60%;
  float: left;
  line-height: 26px;
  text-align: left;
}
#footer .left p,
#footer .left p a {
  color: #b2b2b2;
}
#footer .left a {
  color: #f5f5f5;
  margin-right: 15px;
}
#footer .right {
  text-align: right;
  line-height: 26px;
}
#footer .right a {
  display: inline-block;
  text-align: center;
  margin-left: 10px;
}

#footer .right a:hover {
  color: #ffffff;
}

#footer .right a:hover .iconfont {
  color: #cc0000;
}

#footer .right a span:last-child {
  line-height: 26px;
}

#footer .right .iconfont {
  width: 48px;
  height: 48px;
  display: block;
  border: 1px solid #ffffff;
  border-radius: 50%;
  margin: 0 auto;
  font-size: 32px;
  line-height: 48px;
  text-align: center;
}
@media screen and (max-width: 992px) {
  #footer .left,
  #footer .right {
    width: 100%;
  }

#footer .left a{
  display: inline-block;
}
  #footer .left,
  #footer .right {
    text-align: center;
    line-height: 20px;
  }

}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      webInfo: {},
      type: 'setting',
      questionArr: []
    };
  },
  mounted: function() {
    this.getWebIntro();
  },
  methods: {
    getWebIntro: function() {
      // let self = this
      // axios.get('../../static/data/webIntro.json').then(function (res) {
      //     self.webInfo = res.data
      // })
      let apiUrl = this.$config.apiUrl + 'basis/site/read';
      axios
        .get(apiUrl, {
          params: {
            type: this.type
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.questionArr = res.data.data.content;
          }
        });
    }
  }
};
</script>
