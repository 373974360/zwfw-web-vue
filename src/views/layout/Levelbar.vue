<template>
  <div class="levelbar">
    <span class="svg-container"><icon-svg iconClass="location"/></span>
    <span>当前位置：</span>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if='item.redirect==="noredirect" || index==levelList.length-1' class="no-redirect">{{item.name}}</span>
        <router-link v-else :to="item.redirect || item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import IconSvg from "../../components/Icon-svg/index.vue";

  export default {
    components: {IconSvg},
    created() {
      this.getBreadcrumb()
    },
    data() {
      return {
        levelList: null
      }
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && (first.name !== '首页' || first.path !== '')) {
          matched = [{name: '首页', path: '/'}].concat(matched)
        }
        this.levelList = matched
      },
      watch: {
        $route() {
          this.getBreadcrumb();
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .levelbar {
    font-size: 14px;
    color: #133188;
    .svg-container {
      width: 30px;
      padding: 1px 1px 1px 5px;
    }
    .el-breadcrumb {
      display: inline-block;
      font-size: 14px !important;
    }
    span {
      line-height: 10px;
    }
  }
</style>
