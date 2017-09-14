<template>
  <el-row>
    <el-col :span="4">
      <div class="left">
        <div class="typeInfo">
          <p class="p1">事项类型</p>
          <p class="p2">行政审批</p>
          <p class="p1">办理主体</p>
          <p class="p2">{{basicInfo.departmentName}}</p>
          <p class="p1">办理类型</p>
          <p class="p2">
            <template v-if="basicInfo.type == 1">即办件</template>
            <template v-if="basicInfo.type == 2">承诺件</template>
          </p>
        </div>
        <el-button type="primary">
          <div class="svg-container"><icon-svg iconClass="online"/></div>
          <p>在线预审</p>
        </el-button>
        <el-button type="primary">
          <div class="svg-container"><icon-svg iconClass="online"/></div>
          <p>现在预约</p>
        </el-button>
        <el-button type="primary">
          <div class="svg-container"><icon-svg iconClass="list"/></div>
          <p>样表查询</p>
        </el-button>
        <el-button type="primary">
          <div class="svg-container"><icon-svg iconClass="download"/></div>
          <p>表格下载</p>
        </el-button>
        <el-button type="primary">
          <div class="svg-container"><icon-svg iconClass="collect"/></div>
          <p>我要收藏</p>
        </el-button>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="right">
        <p class="title">{{basicInfo.name}}</p>
        <div class="table-container">
          <table>
            <tr>
              <th>涉及部门</th><td>{{basicInfo.departmentNames}}</td>
              <th>受理范围</th><td>{{basicInfo.acceptScope}}</td></tr>
            <tr>
              <th>承诺期限</th><td>{{basicInfo.promiseDay}} 个工作日</td>
              <th>法定期限</th><td>{{basicInfo.legalDay}} 个工作日</td>
            </tr>
            <tr>
              <th>办理时间</th><td>法定工作日 上午9:00-12:00 下午14:00-17:00</td>
              <th>咨询电话</th><td>{{basicInfo.tellphone}}</td>
            </tr>
            <tr>
              <th>办理地点</th><td>{{basicInfo.workAddress}}</td>
              <th>监督电话</th><td>{{basicInfo.superviseTellphone}}</td>
            </tr>
            <tr>
              <th>办理结果</th><td>{{basicInfo.approvalDocumentName}}</td>
              <th>核准数量</th><td>{{basicInfo.authorizedQuantity==0 ? '不限' : basicInfo.authorizedQuantity}}</td>
            </tr>
          </table>
        </div>
        <div class="message" v-show="basicInfo.legalBasis != '-'">
          <span>办理依据</span>
          <!--<div class="msg-content">{{{basicInfo.legalBasis | splitLines}}}</div>-->
        </div>
        <div class="message" v-cloak v-show="conditions.length">
          <span>办理条件</span>
          <div class="msg-content">
            <template v-for="(index, condition) in conditions">
              {{index+1}}、{{condition.content}}
            </template>
          </div>
        </div>
        <div class="message">
          <span>提交材料</span>
          <div class="msg-content">
            <el-table :data="materials" border>
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="" label="材料名称" min-width="320" align="center"></el-table-column>
              <el-table-column prop="" label="份数" min-width="80" align="center"></el-table-column>
              <el-table-column prop="" label="材料形式" min-width="160" align="center"></el-table-column>
              <el-table-column prop="" label="网上预审环节" min-width="160" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="message">
          <span>注意事项</span>
          <div class="msg-content">
            <p class="remind">1、提交的材料如为复印件须加盖单位公章，并携带原件已备核实。
              2、网上预审环节中标★的，为必要材料，没有★标记的，为网上预审非必须材料。</p>
          </div>
        </div>
        <div class="message">
          <span>办理流程</span>
          <div class="msg-content"></div>
        </div>
        <div class="message">
          <span>收费情况</span>
          <div class="msg-content"></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        basicInfo: {
          id: '',
          departmentName: '',
          type: '',
          onlineHandleMode: ''
        },
        serviceDetail: {}
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-col {
    padding: 8px;
    .left {
      text-align: center;
      font-size: 16px;
      .typeInfo {
        border: 1px solid #e5e5e5;
        p {
          margin: 0;
          line-height: 43px;
        }
        .p1 {
          color: #29588c;
          font-weight: bold;
          background: #e3e7f1;
        }
        .p2 {
          background: #f0f2f6;
        }
      }
      .el-button {
        color: #ffffff;
        font-size: 16px;
        margin-top: 5px;
        margin-left: 0;
        width: 100%;
        div, p {
          float: left;
        }
        p {
          margin: 0 10px;
          line-height: 24px;
        }
        .svg-container {
          height: 24px;
          margin-left: 20px;
          .svg-icon {
            width: 1.5em;
            height: 1.5em;
          }
        }
      }
    }
    .right {
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
        span {
          display: inline-block;
          padding: 3px 5px;
          border-bottom: 2px solid #29588c;
          color: #29588C;
          font-weight: bold;
        }
        .msg-content {
          padding: 15px 0;
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
