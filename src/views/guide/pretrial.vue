<template>
  <div class="pretrial">
    <div v-show="!secondForm">
      <div class="message">
        <div class="msg-title-container">
          <div class="msg-title">
            <icon-svg iconClass="condition"></icon-svg>&nbsp;&nbsp;审批条件
          </div>
        </div>
        <div class="msg-content">
          <el-checkbox :indeterminate="isSelectAll">全选</el-checkbox>
          <b>办理该项业务，需满足以下申请条件才能进行业务的办理，请自检是否满足，符合请打勾</b>
          <div v-for="(condition, index) in conditions">
            <el-checkbox v-model="conditionsCheck"></el-checkbox>
            {{index}}、{{condition.content}}
          </div>
        </div>
      </div>
      <div class="message">
        <div class="msg-title-container">
          <div class="msg-title">
            <icon-svg iconClass="material"></icon-svg>&nbsp;&nbsp;申请材料
          </div>
        </div>
        <div class="msg-content">
          <p></p>
        </div>
      </div>
      <p class="remind">注：本人对办理该事项所提交的材料实质内容的真实性负责。</p>
      <div class="btn-container">
        <el-button type="primary" size="large" @click="nextPage">下一步</el-button>
      </div>
    </div>
    <div v-show="secondForm">
      <div class="message">
        <div class="msg-title-container">
          <div class="msg-title2">
            <icon-svg iconClass="order"></icon-svg>&nbsp;&nbsp;基本信息
          </div>
        </div>
        <div class="msg-content">
          <div class="table-title">事项名称</div>
          <table>
            <tr>
              <th>企业名称：</th><td></td>
              <th>企业工商注册号：</th><td></td>
            </tr>
            <tr>
              <th>企业法人：</th><td></td>
              <th>法人身份证号：</th><td></td>
            </tr>
            <tr>
              <th>联系人姓名：</th><td></td>
              <th>联系人身份证号：</th><td></td>
            </tr>
            <tr>
              <th>联系人电话：</th><td></td>
              <th>电子邮箱：</th><td></td>
            </tr>
            <tr>
              <th>通讯地址：</th><td colspan="3"></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="message">
        <div class="msg-title-container">
          <div class="msg-title2">
            <icon-svg iconClass="news"></icon-svg>&nbsp;&nbsp;申报材料
          </div>
        </div>
        <div class="msg-content">
          <div class="materials-item">
            <p>
              <span>材料名称：</span>
              <icon-svg iconClass="star"></icon-svg><icon-svg iconClass="star_fill"></icon-svg>
              {{}}
              <a>（点击下载）</a>
            </p>
            <p>
              <span>材料形式：</span>{{}}
              <span>需要份数：</span>{{}}
              <span>上传说明：</span>{{}}
            </p>
            <p>上传材料：</p>
            <p class="p3"><el-button type="primary">上传</el-button></p>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <el-button size="large" @click="secondForm = false">上一步</el-button>
        <el-button type="primary" size="large" @click="">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getItemConditions, getItemMaterials } from '../../api/guide'

  export default {
    data() {
      return {
        itemId: 24,
        conditions: [],
        materials: [],
        conditionsCheck: '',
        isSelectAll: false,
        secondForm: false
      }
    },
    created() {
      getItemConditions(this.itemId).then(response => {
        this.conditions = response.data
      })
      getItemMaterials(this.itemId).then(response => {
        this.materials = response.data
      })
      this.$notify.info({
        title: '提醒',
        message: '您本次网上申报的办件，工作人员将在预受理之后联系您。',
        duration: 0,
        offset: 200
      })
    },
    methods: {
      nextPage() {
        if (!this.conditions) {
          this.$message({
            showClose: true,
            message: '请先满足审批条件再点击下一步',
            type: 'warning'
          })
          return
        }
        this.secondForm = true
        this.secondPageNotify()
      },
      secondPageNotify() {
        this.$notify.info({
          title: '提醒',
          message: '★为必要材料，您必须提交才能申报，☆为容缺候补材料，您可以在网上预受理后在窗口提交， 为非必要材料， 根据您实际情况选择提交。',
          duration: 0,
          offset: 200
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .pretrial {
    width: 85%;
    margin: 30px auto;
    font-size: 14px;
    .message {
      .msg-title-container {
        height: 39px;
        line-height: 39px;
        font-size: 16px;
        color: #3060cc;
        border-bottom: 1px solid #acacac;
        .msg-title {
          line-height: 35px;
          border-bottom: 4px solid #3060cc;
          float: left;
          padding: 0 20px 0 3px;
          .svg-icon {
            width: 1.1em;
            height: 1.1em;
          }
        }
        .msg-title2 {
          font-size: 20px;
          font-weight: bold;
          line-height: 35px;
          border-bottom: 4px solid #3060cc;
          float: left;
          padding: 0 20px 0 3px;
        }
      }
      .msg-content {
        font-size: 14px;
        padding: 10px 0 30px 0;
        .el-checkbox {
          font-size: 14px;
          font-weight: normal;
          color: #3066cc;
        }
        .table-title {
          font-size: 25px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          margin: 15px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          tr {
            font-size: 16px;
            height: 40px;
            th {
              width: 20%;
              background: #edf1f6;
              font-weight: normal;
              text-align: right;
              padding-right: 15px;
              border: 1px solid #dedede;
            }
            td {
              width: 30%;
              border: 1px solid #dedede;
              text-align: left;
            }
          }
        }
        .materials-item {
          min-height: 130px;
          border: 1px solid #ccc;
          padding: 8px 20px;
          margin-bottom: 12px;
          position: relative;
          .svg-icon {
            color: red;
          }
          span {
            color: #3060cc;
          }
          a {
            color: red;
          }
          .p3 {
            position: absolute;
            top: 30px;
            right: 35px;
          }
        }
      }
    }
    .remind {
      color: red;
    }
    .btn-container {
      text-align: center;
      padding-top: 50px;
      .el-button {
        width: 150px;
      }
    }
  }
</style>
