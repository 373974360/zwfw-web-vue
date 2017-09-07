<template>
  <el-row>
    <el-col :span="4">
      <div class="menu-title">
        <div class="svg-container"><icon-svg iconClass="time"></icon-svg></div>
        <div class="svg-text">按时间分类</div>
      </div>
      <el-menu class="category" mode="vertical">
        <template v-for="item in batchList">
          <el-menu-item :index="item.batchId" @click="showItems(item)">{{item.batchName}}</el-menu-item>
        </template>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <div class="itemList">
        <div class="itemContent">
          <div class="itemTitle">
            <p class="p1">西安国际港务区<br/><br/>第{{batchIdCN}}批企业和群众“最多跑一次”办事事项清单</p>
            <p class="p2">{{publishDate}}发布</p>
          </div>
          <div class="table-container">
            <el-table :data="itemList" border>
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="deptName" label="部门" min-width="160"></el-table-column>
              <el-table-column prop="itemName" label="事项" min-width="360"></el-table-column>
              <el-table-column v-if="showTel" prop="deptTel" label="电话" min-width="120"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>

  export default {
    created() {
      this.itemList = this.batchList[0].batchItems;
      this.batchIdCN = this.batchList[0].batchId == 1 ? '一' : '二'
      this.publishDate = this.batchList[0].pubDate
      this.showTel = this.batchList[0].batchId == 1 ? false : true
    },
    name: 'service_guide',
    data() {
      return {
        batchList: [
          {batchId: 1, batchName: '第一批清单', pubDate: '2017年3月15日', batchItems: [
            {deptId: 10, deptName: '综合执法局', itemName: '门头牌匾备案'},
            {deptId: 10, deptName: '综合执法局', itemName: '临时户外宣传设置许可'},
            {deptId: 11, deptName: '港口局', itemName: '国际货运代理企业备案'},
            {deptId: 11, deptName: '港口局', itemName: '对外贸易经营者备案登记'},
            {deptId: 12, deptName: '房管局', itemName: '前期物业招标备案'},
            {deptId: 12, deptName: '房管局', itemName: '前期物业服务合同备案'},
            {deptId: 12, deptName: '统筹城乡发展工作局', itemName: '前期物业承接和查验备案'},
          ]},
          {batchId: 2, batchName: '第二批清单', pubDate: '2017年6月28日', batchItems: [
            {deptId: 1, deptName: '经发局', itemName: '企业投资项目备案变更', deptTel: '83332155'},
            {deptId: 1, deptName: '经发局', itemName: '企业投资项目备案延期', deptTel: '83332155'},
            {deptId: 1, deptName: '经发局', itemName: '外商企业投资项目备案变更', deptTel: '83332155'},
            {deptId: 1, deptName: '经发局', itemName: '外商企业投资项目备案延期', deptTel: '83332155'},
            {deptId: 4, deptName: '建设局', itemName: '项目招标进场登记备案', deptTel: '83332316'},
            {deptId: 4, deptName: '建设局', itemName: '招标公告审批', deptTel: '83332316'},
          ]}
        ],
        batchIdCN: '',
        publishDate: '',
        showTel: false,
        itemList: []
      }
    },
    methods: {
      showItems(batch) {
        this.itemList = batch.batchItems;
        this.batchIdCN = batch.batchId == 1 ? '一' : '二'
        this.publishDate = batch.pubDate
        this.showTel = batch.batchId == 1 ? false : true
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
      text-align: center;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .itemList {
    padding-left: 30px;
    .itemContent {
      border: 1px solid #e5e5e5;
      background: #ffffff;
      padding: 20px;
      .itemTitle {
        text-align: center;
        line-height: 25px;
        margin: 15px auto;
        .p1 {
          color: #4bb2fc;
          font-size: 25px;
          line-height: 25px;
          margin: 0;
        }
        .p2 {
          font-size: 14px;
          font-weight: 100;
          color: #2b2b2b;
        }
      }
      .table-container {
        margin: 0 30px;
      }
    }
  }
</style>
