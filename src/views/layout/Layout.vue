<template>
  <div class="app-wrapper2">
    <top></top>
    <navbar></navbar>
    <div class="main-container2">
      <search></search>
      <div class="main2">
        <app-main></app-main>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import { Top, Foot, Navbar, Search, AppMain } from '../layout'

  export default {
    name: 'layout',
    components: {
      Top, Foot, Navbar, Search, AppMain
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";

  .app-wrapper2 {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .main-container2 {
      background: #f1f2f3;
      margin: 0 auto;
      padding: 12px 0 18px 0;
      min-width: 1154px;
      .main2 {
        width: 1156px;
        margin: 0 auto;
        padding: 12px;
        border: 1px solid #e5e5e5;
        background: #ffffff;
      }
    }
  }
</style>
