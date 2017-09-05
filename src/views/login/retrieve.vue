<template>
  <div>
    <top></top>
    <navbar></navbar>
    <div class="retrieve"></div>
    <foot></foot>
  </div>
</template>

<script>
  import {Top, Foot, Navbar} from '../layout'

  export default {
    name: 'retrieve',
    components: {
      Top,
      Foot,
      Navbar
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
