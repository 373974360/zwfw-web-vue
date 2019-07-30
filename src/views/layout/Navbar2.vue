<template>
  <div class="banner2">
    <div class="navbar-container2">
      <div class="navbar2">
        <router-link :to="{path: '/'}">首&nbsp;&nbsp;&nbsp;页</router-link>
        <router-link :to="{path: '/guide?serviceObject=' + this.memberType}">办事大厅</router-link>
        <a href="/web/api/sso/redirect?url=/member">个人中心</a>
        <!--<router-link :to="{path: '/member'}">个人中心</router-link>-->
        <!--<router-link :to="{path: '/member/message'}">消&nbsp;&nbsp;&nbsp;息</router-link>-->
        <el-input v-model="searchWords" icon="search" :on-icon-click="handleIconClick"/>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        searchWords: ''
      }
    },
    computed: {
      ...mapGetters([
        'memberType'
      ]),
    },
    methods: {
      handleIconClick() {}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .banner2 {
    height: 135px;
    background: url(../../assets/img/banner2.png) top center no-repeat;
    .navbar-container2 {
      width: 1156px;
      height: 135px;
      margin: 0 auto;
      clear: both;
      overflow: hidden;
      position: relative;
      .navbar2 {
        width: 700px;
        padding: 20px 0;
        position: absolute;
        right: 10px;
        top: 31px;
        a {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
          margin-left: 30px;
          line-height: 40px;
        }
        .el-input {
          width: 180px;
          float: right;
        }
      }
    }
  }
</style>
