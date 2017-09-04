<template>
  <div class="app-wrapper">
    <top></top>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import { Top, Foot, Navbar, AppMain } from '../layout'

  export default {
    name: 'layout',
    components: {
      Top,
      Foot,
      Navbar,
      AppMain
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped="">
  @import "../../styles/mixin.scss";
</style>
