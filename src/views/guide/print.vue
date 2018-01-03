<template>
  <div class="print">
    <div class="btn-container">
      <el-button type="primary" @click="printPage">打印指南</el-button>
    </div>
    <div class="right">
      <p class="title">{{basicInfo.name}}</p>
      <div class="table-container">
        <table>
          <!--<tr>
            <th>联办机构</th><td>{{basicInfo.unionAgency}}</td>
            <th>通办范围</th><td>{{basicInfo.handleScope | dicts('tbfw')}}</td></tr>
          <tr>
            <th>承诺期限</th><td>{{basicInfo.promiseEndTime}} 个工作日</td>
            <th>法定期限</th><td>{{basicInfo.legalEndTime}} 个工作日</td>
          </tr>
          <tr>
            <th>办理时间</th><td>法定工作日 上午9:00-12:00 下午14:00-17:00</td>
            <th>咨询电话</th><td>{{basicInfo.askPhone}}</td>
          </tr>
          <tr>
            <th>办理地点</th><td>{{basicInfo.handlePlace}}</td>
            <th>监督电话</th><td>{{basicInfo.supervisePhone}}</td>
          </tr>
          <tr>
            <th>办理结果</th><td>{{basicInfo.resultName}}</td>
            <th>数量限制</th><td>{{basicInfo.numberLimit == 0 ? '不限' : basicInfo.numberLimit}}</td>
          </tr>-->

          <tr>
            <th>事项类型</th><td>{{basicInfo.type | dicts('sslx')}}</td>
            <th>实施机构</th><td>{{basicInfo.implAgencyDepartmentName}}</td>
          </tr>
          <tr>
            <th>办理类型</th><td>{{basicInfo.processType | dicts('bjlx')}}</td>
            <th>承诺期限</th><td>{{basicInfo.promiseEndTime}}个工作日</td>
          </tr>
          <tr>
            <th>服务对象</th><td>{{basicInfo.serviceObject | dicts('fwdx')}}</td>
            <th>办理形式</th><td>{{basicInfo.handleType | dicts('blxs')}}</td>
          </tr>
          <tr>
            <th>咨询电话</th><td>{{basicInfo.askPhone}}</td>
            <th>监督电话</th><td>{{basicInfo.supervisePhone}}</td>
          </tr>
          <tr>
            <th>办理地点、时间</th><td>{{basicInfo.handlePlace}}</td>
            <th>法定时限</th><td>{{basicInfo.legalEndTime}}个工作日</td>
          </tr>
        </table>
      </div>
      <div class="message" v-show="basicInfo.setBasis">
        <span class="msg-label">办理依据</span>
        <div class="msg-content" v-html="$options.filters.splitLines(basicInfo.setBasis)"></div>
      </div>
      <!--<div class="message" v-cloak v-show="conditions.length">
        <span>办理条件</span>
        <div class="msg-content">
          <p v-for="(condition, index) in conditions">
            {{index+1}}、{{condition.content}}
          </p>
        </div>
      </div>-->
      <div class="message" v-show="basicInfo.acceptCondition">
        <span class="msg-label">办理条件</span>
        <div class="msg-content">
          <div v-html="basicInfo.acceptCondition"></div>
        </div>
      </div>
      <div class="message" v-show="materials.length">
        <span class="msg-label">提交材料</span>
        <div class="msg-content">
          <el-table :data="materials" border>
            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="name" label="材料名称" min-width="320" align="center"></el-table-column>
            <!--<el-table-column prop="number" label="份数" min-width="80" align="center"></el-table-column>
            <el-table-column prop="form" label="材料形式" min-width="160" align="center"></el-table-column>
            <el-table-column v-if="basicInfo.handleType == 'blxs_wsbl'" prop="pretrialDescription" label="网上预审环节"
                             min-width="160" align="center"></el-table-column>-->
            <el-table-column prop="type" :formatter="formatType" label="材料类型" min-width="150" align="center"></el-table-column>
            <el-table-column prop="paperDescription" label="纸质材料份数和规格" min-width="180" align="center"></el-table-column>
            <el-table-column prop="electronicMaterial" :formatter="formatBoolean" label="是否需要电子材料" min-width="150" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="message" v-show="materials.length">
        <span class="msg-label">注意事项</span>
        <div class="msg-content">
          <p class="remind">1、提交的材料如为复印件须加盖单位公章，并携带原件已备核实。
            2、网上预审环节中标★的，为必要材料，没有★标记的，为网上预审非必须材料。</p>
        </div>
      </div>
      <div class="message" v-show="basicInfo.workflowDescription">
        <span class="msg-label">办理流程</span>
        <div class="msg-content">
          <div v-html="basicInfo.workflowDescription"></div>
        </div>
      </div>
      <div class="message" v-show="basicInfo.chargeStandard || basicInfo.chargeBasis">
        <span class="msg-label">收费情况</span>
        <div class="msg-content">
          <p><b>收费标准：</b><span v-html="basicInfo.chargeStandard"></span></p>
          <p><b>收费依据：</b><span v-html="basicInfo.chargeBasis"></span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { enums, dicts } from '../../filters'
  import { getItemDetail, /*getItemConditions,*/ getItemMaterials, getItemPreorderConfig } from '../../api/item'

  export default {
    data() {
      return {
        itemId: '',
        basicInfo: {},
        /*conditions: [],*/
        materials: [],
        exampleMaterials: [],
        originalMaterials: [],
        exampleShow: false,
        originalShow: false,
        id: undefined
      }
    },
    computed: {
      ...mapGetters([
        'resourceUrl', 'enums', 'dicts'
      ]),
    },
    created() {
      this.itemId = this.$route.params.itemId
      getItemDetail(this.itemId).then(response => {
        this.basicInfo = response.data
      })
      /*getItemConditions(this.itemId).then(response => {
        this.conditions = response.data
      })*/
      getItemMaterials(this.itemId).then(response => {
        this.materials = response.data
        let originalIndex = 0;
        let originalMaterials = [];
        let exampleIndex = 0;
        let exampleMaterials = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].example) {
            exampleMaterials[exampleIndex] = response.data[i];
            exampleIndex++;
          }
          if (response.data[i].eform) {
            originalMaterials[originalIndex] = response.data[i];
            originalIndex++;
          }
        }
        this.originalMaterials = originalMaterials;
        this.exampleMaterials = exampleMaterials;
      })
    },
    methods: {
      formatType(row, column, cellValue) {
        return dicts(cellValue, 'cllx');
      },
      formatBoolean(row, column, cellValue) {
        return enums(cellValue, 'YesNo');
      },
      addHost: function(content){
        if(content){
          content = content.replace('/upload',this.resourceUrl + '/upload');
        }
        return content;
      },
      printPage() {
        window.print();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .print {
    width: 1156px;
    margin: 0 auto;
    .btn-container {
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    .right {
      width: 80%;
      margin: 0 auto;
      padding: 12px 0 12px 20px;
      .title {
        color: #4bb2fc;
        font-size: 25px;
        text-align: center;
        margin: 0;
      }
      .table-container {
        padding: 30px 0;
        table {
          width: 100%;
          border: 1px solid #dedede;
          border-collapse: collapse;
          font-size: 14px;
          color: #333333;
          tr {
            height: 40px;
            th {
              width: 15%;
              background: #edf1f6;
              text-align: center;
              border: 1px solid #dedede;
              font-weight: bold;
            }
            td {
              width: 35%;
              background: #ffffff;
              text-align: left;
              border: 1px solid #dedede;
              padding: 5px 20px;
            }
          }
        }
      }
      .message {
        overflow: hidden;
        font-size: 16px;
        .msg-label {
          display: inline-block;
          padding: 3px 5px;
          border-bottom: 2px solid #29588c;
          color: #29588C;
          font-weight: bold;
        }
        .msg-content {
          padding: 15px 0;
          .el-table {
            th {
              font-weight: normal;
            }
          }
          p {
            margin: 0;
            line-height: 30px;
          }
          .remind {
            color: #ff0000;
            white-space: pre-line;
          }
        }
      }
    }
  }
</style>
