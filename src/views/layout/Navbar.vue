<template>
  <div>
    <div class="banner"></div>
    <div class="navbar-container">
      <el-menu class="navbar" mode="horizontal" theme="dark" router>
        <el-menu-item index="/login">
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/once">
          <span>最多跑一次</span>
        </el-menu-item>
        <el-menu-item index="/fta">
          <span>自贸区一站式服务</span>
        </el-menu-item>
        <!--<el-menu-item index="/guide">
          <span>办事指南</span>
        </el-menu-item>-->
        <el-menu-item index="/guide">
          <span>办事大厅</span>
        </el-menu-item>
        <!--<el-menu-item index="/guide">
          <span>云服务</span>
        </el-menu-item>-->
        <el-menu-item index="">
          <span><a href="/web/api/sso/redirect?url=/member">我要查</a></span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script></script>

<style rel="stylesheet/scss" lang="scss">
  .banner {
    height: 124px;
    background: url(../../assets/img/banner.png) top center no-repeat;
  }
  .navbar-container {
    height: 45px;
    background: #3060cc;
    .navbar {
      width: 1154px;
      height: 45px;
      line-height: 45px;
      margin: 0 auto;
      background: #3060cc;
      .el-menu-item {
        color: #ffffff;
        font-size: 16px;
        line-height: 45px;
      }
    }
  }
</style>
