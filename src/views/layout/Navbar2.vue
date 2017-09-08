<template>
  <div class="banner2">
    <div class="navbar-container">
      <div class="navbar">
        <el-button type="text">首页</el-button>
        <el-button type="text">办事大厅</el-button>
        <el-button type="text">个人中心</el-button>
        <el-button type="text">消息</el-button>
      </div>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
  .banner2 {
    height: 135px;
    background: url(../../assets/img/banner2.png) top center no-repeat;
    .navbar-container {
      width: 1156px;
      height: 135px;
      margin: 0 auto;
      clear: both;
      overflow: hidden;
      position: relative;
      .navbar {
        width: 700px;
        padding: 20px 0;
        position: absolute;
        right: 10px;
        top: 31px;
        .el-button {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
          margin-left: 30px;
        }
      }
    }
  }
</style>
