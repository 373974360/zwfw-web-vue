<template>
  <div class="app-wrapper">
    <top></top>
    <navbar></navbar>
    <div class="main-container">
      <search></search>
      <app-main></app-main>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import { Top, Foot, Navbar, Search, AppMain } from '../layout'

  export default {
    name: 'layout',
    components: {
      Top,
      Foot,
      Navbar,
      Search,
      AppMain
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped="">
  @import "../../styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .main-container {
      background: #f1f2f3;
      margin: 0 auto;
      padding: 12px 0 18px 0;
      min-width: 1154px;
    }
  }
</style>
