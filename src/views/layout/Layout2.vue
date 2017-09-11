<template>
  <div class="app-wrapper">
    <top></top>
    <navbar2></navbar2>
    <div class="main-container">
      <div class="main">
        <el-row>
          <el-col :span="4">
            <menubar></menubar>
          </el-col>
          <el-col :span="19">
            <app-main></app-main>
          </el-col>
        </el-row>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import { Top, Foot, Navbar2, Menubar, AppMain } from '../layout'

  export default {
    name: 'layout2',
    components: {
      Top, Foot, Navbar2, Menubar, AppMain
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .main-container {
      background: #ffffff;
      margin: 0 auto;
      padding: 12px 0 18px 0;
      min-width: 1154px;
      .main {
        width: 1156px;
        margin: 0 auto;
        padding: 0;
        border: none;
        background: #ffffff;
        .el-col-19 {
          float: right;
        }
      }
    }
  }
</style>
