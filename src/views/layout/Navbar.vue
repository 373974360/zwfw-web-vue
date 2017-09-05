<template>
  <div>
    <div class="banner"></div>
    <div class="navbar-container">
      <el-menu class="navbar" mode="horizontal" theme="dark">
        <el-menu-item>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item>
          <span>最多跑一次</span>
        </el-menu-item>
        <el-menu-item>
          <span>自贸区一站式服务</span>
        </el-menu-item>
        <el-menu-item>
          <span>办事指南</span>
        </el-menu-item>
        <el-menu-item>
          <span>办事大厅</span>
        </el-menu-item>
        <el-menu-item>
          <span>云服务</span>
        </el-menu-item>
        <el-menu-item>
          <span>我要查</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script></script>

<style rel="stylesheet/scss" lang="scss">
  .banner {
    height: 124px;
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
        color: #FFFFFF;
        font-size: 16px;
        line-height: 45px;
      }
    }
  }
</style>
