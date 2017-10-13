<template>
  <div class="menubar">
    <div class="menu-title">
      <div class="svg-container"><icon-svg iconClass="person"></icon-svg></div>
      <div class="svg-text">个人中心</div>
    </div>
    <el-menu class="category" mode="vertical" router>
      <!--<template v-for="item in menuList">
        <el-menu-item :index="item.menuRouter">{{item.menuName}}</el-menu-item>
      </template>-->
      <el-menu-item index="/member/process">我的办件</el-menu-item>
      <el-menu-item index="/member/pretrial">我的预审</el-menu-item>
      <el-menu-item index="/member/collection">我的收藏</el-menu-item>
      <el-menu-item index="/member/message">我的消息</el-menu-item>
      <el-menu-item v-if="type === memberType.nature" index="/member/personInfo">修改资料</el-menu-item>
      <el-menu-item v-if="type === memberType.legal" index="/member/companyInfo">修改资料</el-menu-item>
      <el-menu-item index="/member/changePw">修改密码</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        menuList: [
          {menuId: 1, menuName: '我的办件', menuRouter: '/member/process'},
          {menuId: 2, menuName: '我的预审', menuRouter: '/member/pretrial'},
          {menuId: 3, menuName: '我的收藏', menuRouter: '/member/collection'},
          {menuId: 4, menuName: '我的消息', menuRouter: '/member/message'},
          /*{menuId: 5, menuName: '个人信息', menuRouter: '/member/personInfo'},
          {menuId: 6, menuName: '企业信息', menuRouter: '/member/companyInfo'},*/
          {menuId: 8, menuName: '修改资料', menuRouter: '/member/updateInfo'},
          {menuId: 7, menuName: '修改密码', menuRouter: '/member/changePw'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'type', 'memberType'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .menubar {
    border: 1px solid #e1e2e4;
    .menu-title {
      height: 60px;
      font-size: 16px;
      font-weight: bold;
      background: #e6eaef;
      color: #29588c;
      padding: 12px;
      div {
        float: left;
      }
      .svg-container {
        width: 33px;
        margin-left: 10px;
        .svg-icon {
          width: 2em !important;
          height: 2em !important;
        }
      }
      .svg-text {
        line-height: 38px;
        padding-left: 12px;
      }
    }
    .category {
      background: #f2f2f2;
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        text-align: center;
        border-bottom: 1px solid #e6e6e6;
      }
    }
  }
</style>
