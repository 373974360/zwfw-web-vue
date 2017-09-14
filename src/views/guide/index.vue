<template>
  <el-row>
    <el-col :span="4">
      <div class="menu-title">
        <div class="svg-container"><icon-svg iconClass="department"></icon-svg></div>
        <div class="svg-text">按部门分类</div>
      </div>
      <el-menu class="category" mode="vertical">
        <template v-for="item in deptList">
          <el-menu-item :index="item.deptId" @click="showService(item)">{{item.deptName}}</el-menu-item>
        </template>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <div class="itemList">
        <ul>
          <li v-for="item in serviceList">
            <!--<p>{{item.serviceName}}</p>-->
            <div class="itemContent">
              <p class="p1">
                <router-link :to="{path: '/'}">{{item.serviceName}}</router-link>
              </p>
              <p class="p2">
                办理机构：{{item.deptName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;咨询电话：{{item.deptTel}}
              </p>
              <p class="p3">
                <el-button type="primary">收藏</el-button>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="pageTool">
        <el-button size="small">首页</el-button>
        <el-button size="small">上一页</el-button>
        <el-button size="small">下一页</el-button>
        <el-button size="small">末页</el-button>
        <span class="span">共 {{serviceList.length}} 条记录</span>
        <span class="span">
          跳转到
          <!--<el-select v-model="currentPage" size="small">-->
            <!--<el-option></el-option>-->
          <!--</el-select>-->
          页
        </span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { getItemCategoryByPid } from '../../api/guide'

  export default {
    name: 'service_guide',
    data() {
      return {
        deptList: [
          {deptId: '1', deptName: '经发局', deptItems: [
            {serviceId: '1', serviceName: '食品经营许可证', deptName: '经发局', deptTel: '029-83620300/029-83620301'},
            {serviceId: '2', serviceName: '餐饮服务许可证注销', deptName: '经发局', deptTel: '029-83620300/029-83620301'},
            {serviceId: '3', serviceName: '食品经营许可证注销', deptName: '经发局', deptTel: '029-83620300/029-83620301'},
            {serviceId: '4', serviceName: '外商投资项目核准', deptName: '经发局', deptTel: '029-83620300/029-83620301'},
          ]},
          {deptId: '2', deptName: '国土局', deptItems: [
            {serviceId: '5', serviceName: '餐饮服务许可证注销', deptName: '国土局', deptTel: '029-83332253/029-83332252'},
            {serviceId: '6', serviceName: '食品经营许可证', deptName: '国土局', deptTel: '029-83332253'},
            {serviceId: '7', serviceName: '外商投资项目核准', deptName: '国土局', deptTel: '029-83332253'},
            {serviceId: '8', serviceName: '食品经营许可证注销', deptName: '国土局', deptTel: '029-83332253'},
          ]},
          {deptId: '3', deptName: '统筹城乡发展工作局'},
          {deptId: '4', deptName: '建设局'},
          {deptId: '5', deptName: '市容环保局'},
          {deptId: '6', deptName: '社会事业局'},
          {deptId: '7', deptName: '组织人事局'},
          {deptId: '8', deptName: '工商局'},
          {deptId: '9', deptName: '国税局'}
        ],
        serviceList: [],
        currentPage: 1
      }
    },
    created() {
      this.serviceList = this.deptList[0].deptItems;
      this.getItemCategory(1)
      this.getItemCategory(29)
    },
    methods: {
      showService(dept) {
        this.serviceList = dept.deptItems;
      },
      getItemCategory(id) {
        getItemCategoryByPid(id).then(response => {
          console.log(id)
          console.log(response)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
      text-align: left;
      padding-left: 36px !important;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .itemList {
    padding-left: 30px;
    ul {
      list-style: none;
      margin: 0;
      padding-left: 0;
      li {
        position: relative;
        border-bottom: 1px dashed #cccccc;
        .itemContent {
          padding: 9px;
          .p1 {
            font-size: 16px;
            color: #2b2b2b;
          }
          .p2 {
            font-size: 12px;
            color: #919191;
          }
          .p3 {
            float: right;
            position: absolute;
            top: 16px;
            right: 20px;
          }
        }
      }
    }
  }
  .pageTool {
    text-align: center;
    padding: 10px 0;
    margin: 10px 0;
    font-size: 14px;
    .span {
      margin-left: 10px;
      .el-select {
        width: 60px;
      }
    }
  }
</style>
