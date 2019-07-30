<template>
  <div class="levelbar">
    <div class="svg-container">
      <icon-svg iconClass="location"/>
    </div>
    <div class="svg-text">当前位置：</div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if='item.redirect==="noredirect" || index==levelList.length-1' class="no-redirect">{{item.name}}</span>
        <router-link v-else :to="item.redirect || item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

  export default {
    created () {
      this.getBreadcrumb()
    },
    data () {
      return {
        levelList: null
      }
    },
    methods: {
      getBreadcrumb () {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && (first.name !== '首页' || first.path !== '')) {
          matched = [{name: '首页', path: '/'}].concat(matched)
        }
        let serviceObject = this.$route.query.serviceObject
        for (let m of matched) {
          if (m.path == '/guide') {
            switch(serviceObject) {
              case '1':
                m.name = '个人办事';
                break;
              case '2':
                m.name = '法人办事';
                break;
              default:
            }
          }
        }
        this.levelList = matched
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .levelbar {
    font-size: 14px;

    div {
      float: left;
      padding-left: 6px;
    }

    .svg-container {
      color: #29588c;
      width: 22px;
      line-height: 34px;
    }

    .svg-text {
      line-height: 30px;
    }

    .el-breadcrumb {
      line-height: 30px;
      font-size: 14px !important;
    }
  }
</style>
