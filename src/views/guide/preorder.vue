<template>
  <el-form class="order-form" ref="orderForm" :model="orderForm" :rules="orderRules" autoComplete="on" label-position="left">
    <div class="title">在线预约</div>
    <el-row>
      <el-col :span="6">
        <span class="input-label">预约事项：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="itemName">
          <el-input readonly type="text" v-model="orderForm.itemName" autoComplete="on"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">预约编号：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="pretrialNumber">
          <el-input type="text" v-model="orderForm.pretrialNumber" autoComplete="on"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请输入已预审的办件号</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">联系电话：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="mobile">
          <el-input type="password" v-model="orderForm.mobile" autoComplete="on"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请输入联系电话</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">预约日期：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="date">
          <el-date-picker :editable="false" v-model="orderForm.date" type="date" placeholder="请选择预约日期" :picker-options="pickerOption">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请选择预约日期</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">预约时间：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="time">
          <el-select v-model="orderForm.time" placeholder="请选择预约时间">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请选择预约时间</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">注意事项：</span>
      </el-col>
      <el-col :span="10">
        <div class="">
          <span class="remind">预约成功之后，会给您留的手机号码发送一条短信，短信内容中包含预约码，请您在预约时间的提前一小时到大厅根据预约码抽取排队号，过期不可取号。</span>
        </div>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="10" align="center">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleSubmit">提交</el-button>
        <el-button type="primary" @click.native.prevent="resetForm">重置</el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </el-form>
</template>

<script>
  import { getItemDetail } from '../../api/item'
  import { getHoliday } from '../../api/common'
  import { date } from '../../filters'

  export default {
    data() {
      return {
        loading: false,
        holiday: [],
        orderForm: {
          itemId: undefined,
          itemName: undefined,
          pretrialNumber: undefined,
          mobile: undefined,
          date: undefined,
          time: undefined
        },
        orderRules: {

        }
      }
    },
    computed: {
      pickerOption() {
        let _this = this
        return {
          disabledDate(time) {
            return (time.getTime() < Date.now() - 8.64e7) || _this.holiday.includes(date(time, 'YYYY-MM-DD'));
          }
        }
      }
    },
    created() {
      this.orderForm.itemId = this.$route.params.itemId
      getItemDetail(this.orderForm.itemId).then(response => {
        this.orderForm.itemName = response.data.name
      })
      getHoliday(new Date().getFullYear()).then(response => {
        if (response.httpCode == 200) {
          for (let holiday of response.data) {
            this.holiday.push(holiday.date)
          }
        } else {
          this.$message.error('数据加载错误，请重载页面！')
        }
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .order-form {
    font-size: 14px;
    padding-top: 20px;
    .title {
      font-size: 25px;
      color: #4bb2fc;
      text-align: center;
      margin: 20px auto;
    }
    .el-row {
      margin-bottom: 15px;
      .el-col {
        min-height: 1px;
      }
    }
    .el-form-item {
      margin: 0 25px;
      input {
        border: 1px solid #cccccc;
        background: #ffffff;
        border-radius: 4px;
        height: 34px;
        padding: 3px 12px;
      }
      input[readonly] {
        background: #eef1f6;
        opacity: 1;
      }
    }
    .input-label {
      display: block;
      float: right;
      color: #2b2b2b;
    }
    .input-tip {
      line-height: 40px;
      font-size: 12px;
      color: #8c8f91;
      span {
        color: red;
        font-weight: bold;
      }
    }
  }
</style>
