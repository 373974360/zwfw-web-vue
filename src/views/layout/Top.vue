<template>
  <div class="top">
    <div class="topmn">
      <div class="top_bx left">
        <span class="svg-container"><icon-svg iconClass="computer2"/></span><a href="http://www.itl.gov.cn/" target="_blank">西安国际港务区门户网站</a>
      </div>
      <div class="top_bx right">
        <!--如果没有登录-->
        <span class="svg-container"><icon-svg iconClass="user"/></span><router-link :to="{path: '/login'}">登录</router-link> <em>|</em>
        <router-link :to="{path: '/register'}">注册</router-link><em></em>
        <!--<a href="javascript:void(0)">分享</a>-->
      </div>
    </div>
  </div>
</template>

<script></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .top {
    height: 35px;
    line-height: 35px;
    min-width: 1156px;
    margin: 0 auto;
    color: #010101;
    font-size: 14px;
    background: #f1f2f3;
    .topmn {
      height: 35px;
      line-height: 35px;
      width: 1156px;
      margin: 0 auto;
      clear: both;
      overflow: hidden;
      .top_bx {
        line-height: 35px;
        font-size: 14px;
        a:hover {
          color: #cc0000;
        }
        em {
          font-weight: normal;
          padding: 0 10px;
        }
        span {
          display: block;
          line-height: 35px;
          height: 35px;
          float: left;
          width: 20px;
        }
      }
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
  }
</style>
