<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">我的办件</div>
    </div>
    <div class="data-bg">
      <div class="data-tool">
        <div class="search-container">
          <el-input type="text" v-model="itemName" placeholder="请输入事项名称进行检索" @keyup.enter.native="reloadPage"></el-input>
          <el-button typ="primary" size="small" @click="reloadPage">检&nbsp;&nbsp;索</el-button>
          <el-button type="primary" size="small" @click="resetSearch">清&nbsp;&nbsp;空</el-button>
        </div>
        <div class="search-container" style="margin-right: 10px">
          <!--<el-checkbox-group v-model="checkList" @change="reloadPage">
            <el-checkbox v-for="status in enums['HandlingStatusEnum']" :key="status.code" :label="status.var">{{status.value}}</el-checkbox>
          </el-checkbox-group>-->
          <el-select v-model="status" placeholder="办件状态">
            <el-option
              v-for = "o in enums['HandlingStatusEnum']"
              :label="o.value"
              :value="o.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <process-table :data="processData"
                     :show-delivery="true"
                     :take-type="changeTakeType"
                     :post-code="getPostCode"
                     :on-logistics="showLogistics">
      </process-table>
      <div class="page-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="prev, pager, next, total, sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="修改取件方式" :visible.sync="takeTypeVisible" :close-on-click-modal="closeOnClickModal"
               :before-close="resetTakeTypeForm">
      <el-form ref="takeTypeForm" :model="takeTypeInfo" :rules="takeTypeRules" v-loading="dialogLoading"
               label-position="right" label-width="120px">
        <el-form-item label="取件方式" prop="takeType">
          <el-select v-model="takeTypeInfo.takeType" style="width: 80%">
            <el-option v-for="item in takeTypeList" :key="item" :value="item" :label="item | enums('TakeTypeEnum')">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信包箱" prop="mailboxInfo.mailboxId" v-if="takeTypeInfo.takeType === 2">
          <el-select v-model="takeTypeInfo.mailboxInfo.mailboxId" style="width: 80%">
            <el-option v-for="item in mailboxList" :key="item.id" :value="item.id" :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取件人姓名" prop="mailboxInfo.consigneeName" v-if="takeTypeInfo.takeType === 2">
          <el-input v-model="takeTypeInfo.mailboxInfo.consigneeName"></el-input>
        </el-form-item>
        <el-form-item label="取件人手机号" prop="mailboxInfo.consigneeMobile" v-if="takeTypeInfo.takeType === 2">
          <el-input v-model="takeTypeInfo.mailboxInfo.consigneeMobile"></el-input>
        </el-form-item>
        <el-form-item label="收件人姓名" prop="postInfo.name" v-if="takeTypeInfo.takeType === 3 && !cardVisible">
          <el-input v-model="takeTypeInfo.postInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="postInfo.phone" v-if="takeTypeInfo.takeType === 3 && !cardVisible">
          <el-input v-model="takeTypeInfo.postInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="收件地址" prop="postInfo.address" v-if="takeTypeInfo.takeType === 3 && !cardVisible">
          <el-input v-model="takeTypeInfo.postInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="收件地址" prop="postInfo.addresseeId" v-if="takeTypeInfo.takeType === 3 && cardVisible">
          <el-card class="box-card">
            <div slot="header" class="clearfix card-header">
              <div class="card-item">
                <p class="p1">
                  {{cardHeader.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{cardHeader.phone}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
                <p>{{cardHeader.address}}</p>
              </div>
              <el-button type="primary" @click="showCardItems">选择地址</el-button>
              <el-button type="text" @click="showTakeTypeAddresseeForm">添加地址</el-button>
            </div>
            <div class="card-body" v-show="cardItemVisible">
              <div v-for="item in memberAddressList" :key="item.id" class="card-item">
                <el-radio v-model="takeTypeInfo.postInfo.addresseeId" :label="item.id">{{item.remark}}
                </el-radio>
                <p class="p1">
                  {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.phone}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
                <p>{{item.address}}</p>
              </div>
              <div v-if="!memberAddressList || memberAddressList.length <= 0">没有任何收件地址信息</div>
            </div>
          </el-card>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" icon="circle-cross" :loading="btnLoading" @click="resetTakeTypeForm">取 消</el-button>
        <el-button type="primary" icon="circle-check" :loading="btnLoading" @click="submitTakeType">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogTipVisible" :close-on-click-modal="false" class="dialog">
      <div v-loading="dialogLoading">
        <p style="font-size: 18px; text-indent: 2em; margin-top: 0"><b>请选择获取方式：</b></p>
        <p style="padding-left: 20%">
          <el-button type="text" size="large" @click="handleSendPostCode">直接将取件码发送至手机</el-button>
        </p>
        <p style="padding-left: 20%">
          <el-button type="text" size="large" @click="handleValidateInfo">验证个人信息在线查看取件码</el-button>
        </p>
      </div>
    </el-dialog>

    <el-dialog title="信息验证" :visible.sync="dialogVisible" :close-on-click-modal="false" class="dialog"
               :before-close="resetValidateInfoForm">
      <el-form ref="validateInfoForm" :model="validateInfo" :rules="validateInfoRules"
               class="form" v-loading="dialogFormLoading">
        <el-row>
          <el-col :span="6">
            <span class="input-label">验证码：</span>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="verifyCode">
              <el-input type="text" v-model="validateInfo.verifyCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" :disabled="sendBtn.disabled" @click.native.prevent="getVerifyCode">{{sendBtn.text}}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="12" align="center">
            <el-button type="primary" @click.native.prevent="handleSubmit">提交</el-button>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog title="物流信息" :visible.sync="logisticsVisible" :close-on-click-modal="closeOnClickModal">
      <el-card class="box-card">
        <div slot="header" class="clearfix card-header">
          <p><b>物流状态&nbsp;&nbsp;&nbsp;&nbsp;{{logistics.deliverystatus | deliveryStatusFilter}}</b></p>
          <p>承运来源：{{logistics.type | expressTypeFilter}}</p>
          <p>运单编号：{{logistics.number}}
            <!--<el-button type="text" @click="refreshLogistics(logistics)">物流信息不对</el-button>-->
          </p>
        </div>
      </el-card>
      <div class="track-list">
        <ul>
          <li v-for="(item, index) in logistics.list"
              :class="(index === 0 ? 'first' : '') + ' ' + (index === logistics.list.length - 1 ? 'last' : '')">
            <div class="node-container">
              <div class="node"></div>
            </div>
            <div class="content">
              <p class="txt">{{item.status | removeNote(' ')}}</p>
              <p class="time">{{item.time | date('YYYY-MM-DD HH:mm:ss')}}</p>
            </div>
          </li>
          <div style="clear: both"></div>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { ProcessTable } from './table'
  import { mapGetters } from 'vuex'
  import { copyProperties } from "../../utils";
  import { validMobiles } from "../../utils/validate";
  import { getPhoneVerifyCodeLogged, validateMemberInfo } from '../../api/member/member'
  import { getMyProcessPage, sendPostCode } from '../../api/member/process'
  import {
    getItemDelivery
  } from "../../api/item";
  import {
    getAllMailbox,
    findMemberAddressList,
    saveTakeType,
    getOpenCode,
    queryLogistics
  } from "../../api/accept";

  export default {
    components: {
      ProcessTable
    },
    data() {
      const validateMobile = (rule, value, callback) => {
        if (validMobiles(value)) {
          callback()
        } else {
          callback(new Error('手机号格式不正确'))
        }
      }
      return {
        itemName: '',
        status: undefined,
        processData: [],
        dialogVisible: false,
        dialogTipVisible: false,
        dialogLoading: false,
        dialogFormLoading: false,
        btnLoading: false,
        currentRow: undefined,
        takeTypeVisible: false,
        cardVisible: false,
        cardItemVisible: false,
        takeTypeList: [],
        mailboxList: [],
        memberAddressList: [],
        cardHeader: {
          name: '',
          phone: '',
          address: ''
        },
        takeTypeInfo: {
          id: undefined,
          workNo: undefined,
          memberId: undefined,
          takeType: undefined,
          mailboxInfo: {
            id: undefined,
            mailboxId: undefined,
            consigneeName: undefined,
            consigneeMobile: undefined
          },
          postInfo: {
            id: undefined,
            name: undefined,
            phone: undefined,
            address: undefined,
            addresseeId: undefined
          }
        },
        takeTypeRules: {
          takeType: [
            {required: true, type: 'number', message: '请选择取件方式', trigger: 'change'}
          ],
          'mailboxInfo.mailboxId': [
            {required: true, message: '请选择信包箱', trigger: 'change'}
          ],
          'mailboxInfo.consigneeName': [
            {required: true, message: '请输入取件人姓名', trigger: 'blur'}
          ],
          'mailboxInfo.consigneeMobile': [
            {required: true, message: '请输入取件人手机号', trigger: 'blur'},
            {validator: validateMobile, trigger: 'blur'}
          ],
          'postInfo.name': [
            {required: true, message: '请输入收件人姓名', trigger: 'blur'}
          ],
          'postInfo.phone': [
            {required: true, message: '请输入收件人手机号', trigger: 'blur'},
            {validator: validateMobile, trigger: 'blur'}
          ],
          'postInfo.address': [
            {required: true, message: '请输入收件地址', trigger: 'blur'}
          ],
          'postInfo.addresseeId': [
            {required: true, message: '请选择收件地址', trigger: 'change'}
          ]
        },
        validateInfo: {
          verifyCode: undefined,
          random: undefined,
          member: {}
        },
        validateInfoRules: {
          verifyCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
        },
        sendBtn: {
          text: '获取验证码',
          second: undefined,
          disabled: false
        },
        page: this.$store.state.app.page,
        pageSize: this.$store.state.app.rows,
        pageSizes: this.$store.state.app.pageSize,
        total: 0,
        logistics: {},
        logisticsVisible: false
      }
    },
    computed: {
      ...mapGetters([
        'id', 'enums', 'closeOnClickModal'
      ])
    },
    watch: {
      'takeTypeInfo.postInfo.addresseeId'() {
        if (this.cardVisible) {
          this.initCardHeader();
          this.cardItemVisible = false;
        }
      }
    },
    created() {
      this.loadPage()
      this.getMailboxes()
      this.getMemberAddressList(this.id)
    },
    methods: {
      resetSearch() {
        this.page = this.$store.state.app.page
        this.pageSize = this.$store.state.app.row
        this.itemName = undefined
        this.status = undefined
      },
      loadPage() {
        let query = {
          page: this.page,
          size: this.pageSize,
          itemName: this.itemName,
          status: this.status,
          memberId: this.id
        }
        getMyProcessPage(query).then(response => {
          this.processData = response.data.records
          this.total = response.data.total
        })
      },
      getMailboxes() {
        getAllMailbox({}).then(response => {
          this.mailboxList = response.data
        })
      },
      getItemTakeTypes(itemId) {
        this.takeTypeList = []
        getItemDelivery(itemId).then(response => {
          const takeTypeList = response.data.takeType.split(',')
          for (const takeType of takeTypeList) {
            this.takeTypeList.push(parseInt(takeType))
          }
        })
      },
      getMemberAddressList(memberId) {
        findMemberAddressList(memberId).then(response => {
          this.memberAddressList = response.data
        })
      },
      changeTakeType(row) {
        this.takeTypeVisible = true
        this.getItemTakeTypes(row.itemId)
        if (row.takeTypeInfo) {
          copyProperties(row.takeTypeInfo, this.takeTypeInfo)
        }
        this.takeTypeInfo.workNo = row.workNo
        this.takeTypeInfo.memberId = this.id
        this.initCardHeader()
      },
      submitTakeType() {
        this.$refs['takeTypeForm'].validate(valid => {
          if (valid) {
            this.dialogLoading = true
            this.btnLoading = true
            saveTakeType(this.takeTypeInfo).then(() => {
              this.resetTakeTypeForm()
              this.$message.success('保存成功')
              this.loadPage()
              this.getMemberAddressList(this.id)
            })
          } else {
            return false
          }
        })
      },
      resetTakeTypeForm() {
        this.takeTypeVisible = false
        this.dialogLoading = false
        this.btnLoading = false
        this.resetTakeTypeTemp()
        this.$refs['takeTypeForm'].resetFields()
      },
      resetTakeTypeTemp() {
        this.takeTypeInfo = {
          id: undefined,
          workNo: undefined,
          memberId: undefined,
          takeType: undefined,
          mailboxInfo: {
            id: undefined,
            mailboxId: undefined,
            consigneeName: undefined,
            consigneeMobile: undefined
          },
          postInfo: {
            id: undefined,
            name: undefined,
            phone: undefined,
            address: undefined,
            addresseeId: undefined
          }
        }
      },
      showCardItems() {
        this.cardItemVisible = !this.cardItemVisible;
      },
      initCardHeader() {
        if (this.memberAddressList.length <= 0) {
          this.cardVisible = false;
          this.takeTypeInfo.postInfo.addresseeId = undefined;
          return;
        }
        let addressee;
        if (this.takeTypeInfo.postInfo.addresseeId) {
          for (let item of this.memberAddressList) {
            if (item.id === this.takeTypeInfo.postInfo.addresseeId) {
              addressee = item;
              break;
            }
          }
        } else {
          addressee = this.memberAddressList[0];
        }
        this.takeTypeInfo.postInfo.addresseeId = addressee.id;
        copyProperties(addressee, this.cardHeader)
        this.cardVisible = true;
      },
      showTakeTypeAddresseeForm() {
        this.cardVisible = false;
        this.takeTypeInfo.postInfo.addresseeId = undefined;
        this.resetCardHeader();
        this.cardItemVisible = false;
      },
      resetCardHeader() {
        this.cardHeader = {
          name: '',
          phone: '',
          address: ''
        }
      },
      getPostCode(row) {
        /* this.currentRow = row;
        this.dialogTipVisible = true; */
        getOpenCode(row.workNo).then(response => {
          if (response.data) {
            this.$message({
              showClose: true,
              type: 'success',
              duration: 0,
              message: '取件码：' + response.data
            })
          } else {
            this.$message.warning('正在查询取件码，请稍后重新查看')
          }
        })
      },
      showLogistics(row) {
        const company = row.takeTypeInfo.postInfo.expressCompany;
        const number = row.takeTypeInfo.postInfo.expressNumber;
        queryLogistics(company, number).then(response => {
          this.logistics = response.data;
          this.logisticsVisible = true;
        })
      },
      handleSendPostCode() {
        this.dialogTipVisible = false;
        this.dialogLoading = true;
        sendPostCode(this.currentRow.processNumber).then(response => {
          if (response.httpCode === 200) {
            this.$message.success('取件码已发送至您的手机，请注意查收');
          } else {
            this.$message.error(response.msg || '短信发送失败，请重试');
          }
          this.dialogLoading = false;
        })
      },
      handleValidateInfo() {
        this.dialogVisible = true;
      },
      handleSubmit() {
        this.$refs.validateInfoForm.validate(valid => {
          if (valid) {
            this.dialogFormLoading = true;
            validateMemberInfo(this.validateInfo).then(response => {
              this.dialogFormLoading = false;
              if (response.httpCode === 200) {
                this.dialogTipVisible = false;
                this.resetValidateInfoForm();
                const h = this.$createElement;
                this.$msgbox({
                  title: '取件码',
                  message: h('p', { style: 'text-align: center' }, [
                    h('b', { style: 'font-size: 24px' }, this.currentRow.takeTypeInfo.mailboxInfo.openCode)
                  ]),
                  confirmButtonText: '确定'
                })
              } else {
                this.$message.error(response.msg || '信息验证不通过')
              }
            })
          }
        })
      },
      resetValidateInfoForm() {
        this.dialogVisible = false;
        this.resetValidateInfoTemp();
        this.$refs.validateInfoForm.resetFields();
      },
      resetValidateInfoTemp() {
        this.validateInfo.verifyCode = undefined;
        this.validateInfo.member = {}
      },
      getVerifyCode() {
        this.sendBtn.disabled = true;
        this.validateInfo.random = Math.random();
        getPhoneVerifyCodeLogged(this.validateInfo.random).then(response => {
          this.sendBtn.second = 60
          this.sendBtn.text = `重新发送(${this.sendBtn.second})`
          this.resendFun = setInterval(this.changeSendBtn, 1000)
          if (response.httpCode === 200) {
            this.$message.success('短信已发送，请注意查看')
          } else {
            this.$message.error(response.msg)
          }
        }).catch(err => {
          this.sendBtn.disabled = false
          this.$message.error(err)
        })
      },
      changeSendBtn() {
        this.sendBtn.second -= 1
        this.sendBtn.text = `重新发送(${this.sendBtn.second})`
        if (this.sendBtn.second <= 0) {
          this.sendBtn.disabled = false
          this.sendBtn.text = "获取验证码"
          clearInterval(this.resendFun)
        }
      },
      reloadPage() {
        this.page = 1
        this.loadPage()
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.page = 1
        this.loadPage()
      },
      handleCurrentChange(page) {
        this.page = page
        this.loadPage()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .data-box {
    border: 1px solid #e1e2e4;
    margin-bottom: 18px;
    color: #2b2b2b;
    overflow: hidden;
    .label-bg {
      height: 40px;
      padding: 0 16px;
      background: #ededf0;
      .label {
        float: left;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
      }
    }
    .data-bg {
      padding: 16px;
      min-height: 100px;
      overflow: hidden;
      .data-tool {
        height: 30px;
        overflow: hidden;
        margin-bottom: 15px;
        .search-container {
          float: right;
          .el-input {
            width: 180px;
            height: 28px;
            margin: 1px 0;
            input {
              height: 28px;
              line-height: 29px;
            }
          }
          .el-button {
            background: #f38d0a;
            color: #ffffff;
            border: none;
          }
        }
        .checkbox-container {
          float: right;
          height: 30px;
          line-height: 30px;
          margin-right: 20px;
          .el-checkbox__label {
            font-size: 14px;
            font-weight: normal;
          }
        }
      }
      .page-container {
        text-align: center;
        margin-top: 16px;
      }
    }
    .dialog {
      top: 20%;
      left: 20%;
      width: 60%;
      .form {
        font-size: 14px;
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
            padding: 6px 12px;
          }
          input[readonly], input[disabled] {
            background: #eef1f6;
            opacity: 1;
          }
        }
        .input-label {
          display: block;
          float: right;
          color: #2b2b2b;
        }
      }
    }
  }
  .card-header {
    .card-item {
      border: none;
      margin: 0;
      width: 80%;
      float: left;
    }
    .el-button {
      float: right;
    }
  }

  .card-item {
    padding: 8px;
    margin: 8px 0;
    font-size: 14px;
    border: 1px solid #d0d0d0;
    height: 80px;
    .el-radio {
      height: 64px;
      line-height: 64px;
      text-align: center;
      width: 10%;
      float: left;
    }
    p {
      margin: 0;
      height: 32px;
      line-height: 32px;
      width: 88%;
      float: left;
    }
    .p1 {
      font-size: 16px;
      font-weight: bold;
      span {
        padding: 3px 6px;
        color: #dd1100;
        font-size: 14px;
        font-weight: normal;
        border: 1px solid #dd1100;
        border-radius: 3px;
      }
    }
  }

  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    .el-card__body {
      padding: 0;
    }
    .card-body {
      padding: 12px;
    }
  }

  .track-list{
    padding: 20px;
    position: relative;
    ul {
      list-style: none;
      overflow: visible;
      margin-top: 12px;
      li{
        position: relative;
        width: 100%;
        float: left;
        padding: 0px 25px;
        line-height: 18px;
        border-left: 1px solid #d0d0d0;
        color: #666;
        .node {
          position: absolute;
          left: -5px;
          top: 0;
          width: 10px;
          height: 10px;
          background-color: #d0d0d0;
          border-radius: 10px;
        }
        .content {
          width: 100%;
          border-bottom: 1px solid #d0d0d0;
          top: -18px;
          position: relative;
        }
      }
      li.first {
        color: #dd1100;
        .node-container {
          position: absolute;
          top: -5px;
          left: -10px;
          width: 20px;
          height: 20px;
          background-color: #fbc0c2;
          border-radius: 20px;
          .node {
            top: 4px;
            left: 4px;
            width: 12px;
            height: 12px;
            background-color: #dd1100;
            border-radius: 12px;
          }
        }
      }
      li.last {
        border: none;
        .content {
          border: none;
        }
      }
    }
  }
</style>
