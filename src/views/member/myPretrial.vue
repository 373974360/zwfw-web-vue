<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">我的预审</div>
    </div>
    <div class="data-bg">
      <div class="data-tool">
        <span class="tips">注意：未显示事项需到陕西政务服务网个人中心查看！</span>
        <div class="search-container">
          <el-input type="text" v-model="itemName" placeholder="请输入事项名称进行检索" @keyup.enter.native="reloadPage"></el-input>
          <el-button type="primary" size="small" @click="reloadPage">检&nbsp;&nbsp;索</el-button>
          <el-button type="primary" size="small" @click="resetSearch">清&nbsp;&nbsp;空</el-button>
        </div>
        <div class="search-container" style="margin-right: 10px">
          <!--<el-checkbox-group v-model="status" @change="reloadPage">
            <el-checkbox v-for="status in enums['PreauditStatusEnum']" :key="status.code" :label="status.var">{{status.value}}</el-checkbox>
          </el-checkbox-group>-->
          <el-select v-model="status" placeholder="预审状态">
            <el-option
              v-for = "o in enums['PreauditStatusEnum']"
              :label="o.value"
              :value="o.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <pretrial-table :data="preauditRecordList" :on-hand-type="handleHandType" :on-take-type="handleTakeType"
                      :on-resv-code="showResvCode"></pretrial-table>
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

    <el-dialog title="修改交件方式" :visible.sync="handTypeVisible" :before-close="resetHandTypeForm">
      <el-form ref="handTypeForm" :model="handTypeInfo" :rules="handTypeRules" v-loading="dialogLoading"
               label-position="right" label-width="120px">
        <el-form-item label="交件方式" prop="handType">
          <el-select v-model="handTypeInfo.handType">
            <el-option v-for="item in handTypeList" :key="item" :value="item" :label="item | enums('HandTypeEnum')">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信包箱" prop="mailboxInfo.mailboxId" v-if="handTypeInfo.handType === 2">
          <el-select v-model="handTypeInfo.mailboxInfo.mailboxId">
            <el-option v-for="item in mailboxList" :key="item.id" :value="item.id" :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交件人姓名" prop="mailboxInfo.senderName" v-if="handTypeInfo.handType === 2">
          <el-input v-model="handTypeInfo.mailboxInfo.senderName"></el-input>
        </el-form-item>
        <el-form-item label="交件人手机号" prop="mailboxInfo.senderMobile" v-if="handTypeInfo.handType === 2">
          <el-input v-model="handTypeInfo.mailboxInfo.senderMobile"></el-input>
        </el-form-item>
        <el-form-item label="收件人姓名" v-if="handTypeInfo.handType === 3">
          <span>{{handAddressee.name}}</span>
        </el-form-item>
        <el-form-item label="收件人手机号" v-if="handTypeInfo.handType === 3">
          <span>{{handAddressee.phone}}</span>
        </el-form-item>
        <el-form-item label="收件地址" v-if="handTypeInfo.handType === 3">
          <span>{{handAddressee.address}}</span>
        </el-form-item>
        <el-form-item label="快递公司" prop="postInfo.expressCompany" v-if="handTypeInfo.handType === 3">
          <el-select v-model="handTypeInfo.postInfo.expressCompany">
            <el-option v-for="item in enums['ExpressCompanyEnum']" :key="item.code" :value="item.code" :label="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" prop="postInfo.expressNumber" v-if="handTypeInfo.handType === 3">
          <el-input v-model="handTypeInfo.postInfo.expressNumber"></el-input>
        </el-form-item>
        <el-form-item label="信包箱" prop="mailboxPost.mailboxDeviceId" v-if="handTypeInfo.handType === 5">
          <el-select v-model="handTypeInfo.mailboxPost.mailboxDeviceId"></el-select>
        </el-form-item>
        <el-form-item label="交件人姓名" prop="mailboxPost.senderName" v-if="handTypeInfo.handType === 5">
          <el-input v-model="handTypeInfo.mailboxPost.senderName"></el-input>
        </el-form-item>
        <el-form-item label="交件人手机号" prop="mailboxPost.senderMobile" v-if="handTypeInfo.handType === 5">
          <el-input v-model="handTypeInfo.mailboxPost.senderMobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" icon="circle-cross" :loading="btnLoading" @click="resetHandTypeForm">取 消</el-button>
        <el-button type="primary" icon="circle-check" :loading="btnLoading" @click="submitHandType">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改取件方式" :visible.sync="takeTypeVisible" :before-close="resetTakeTypeForm">
      <el-form ref="takeTypeForm" :model="takeTypeInfo" :rules="takeTypeRules" v-loading="dialogLoading"
               label-position="right" label-width="120px">
        <el-form-item label="取件方式" prop="takeType">
          <el-select v-model="takeTypeInfo.takeType">
            <el-option v-for="item in takeTypeList" :key="item" :value="item" :label="item | enums('TakeTypeEnum')">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信包箱" prop="mailboxInfo.mailboxId" v-if="takeTypeInfo.takeType === 2">
          <el-select v-model="takeTypeInfo.mailboxInfo.mailboxId">
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
        <el-form-item label="收件人姓名" prop="postInfo.name" v-if="takeTypeInfo.takeType === 3">
          <el-input v-model="takeTypeInfo.postInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="postInfo.phone" v-if="takeTypeInfo.takeType === 3">
          <el-input v-model="takeTypeInfo.postInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="收件地址" prop="postInfo.address" v-if="takeTypeInfo.takeType === 3">
          <el-input v-model="takeTypeInfo.postInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="收件地址" prop="postInfo.addresseeId" v-if="takeTypeInfo.takeType === 3">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" icon="circle-cross" :loading="btnLoading" @click="resetTakeTypeForm">取 消</el-button>
        <el-button type="primary" icon="circle-check" :loading="btnLoading" @click="submitTakeType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { PretrialTable } from './table'
  import { mapGetters } from 'vuex'
  import { copyProperties } from "../../utils";
  import { validMobiles } from "../../utils/validate";
  import { getMemberProfile } from '../../api/member/member'
  import { getPretrialPage } from '../../api/member/pretrial'
  import {
    getItemDelivery
  } from "../../api/item";
  import {
    getAllMailbox,
    getDefaultReceiveAddress,
    findMemberAddressList,
    saveHandType,
    getResvCode,
    saveTakeType
  } from "../../api/accept";

  export default {
    components: {
      PretrialTable
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
        itemName: undefined,
        memberId: undefined,
        status: undefined,
        preauditRecordList: [],
        page: this.$store.state.app.page,
        pageSize: this.$store.state.app.rows,
        pageSizes: this.$store.state.app.pageSize,
        total: 0,
        dialogLoading: false,
        btnLoading: false,
        handTypeVisible: false,
        takeTypeVisible: false,
        handTypeList: [],
        takeTypeList: [],
        mailboxList: [],
        handAddressee: {},
        closestMailboxList: [],
        memberAddressList: [],
        handTypeInfo: {
          id: undefined,
          workNo: undefined,
          handType: undefined,
          mailboxInfo: {
            id: undefined,
            mailboxId: undefined,
            senderName: undefined,
            senderMobile: undefined
          },
          postInfo: {
            id: undefined,
            expressCompany: undefined,
            expressNumber: undefined
          },
          mailboxPost: {
            id: undefined,
            mailboxDeviceId: undefined,
            mailboxLat: undefined,
            mailboxLng: undefined,
            mailboxName: undefined,
            mailboxAddress: undefined,
            senderName: undefined,
            senderMobile: undefined
          }
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
        handTypeRules: {
          handType: [
            {required: true, type: 'number', message: '请选择交件方式', trigger: 'change'}
          ],
          'mailboxInfo.mailboxId': [
            {required: true, message: '请选择信包箱', trigger: 'change'}
          ],
          'mailboxInfo.senderName': [
            {required: true, message: '请输入交件人姓名', trigger: 'blur'}
          ],
          'mailboxInfo.senderMobile': [
            {required: true, message: '请输入交件人手机号', trigger: 'blur'},
            {validator: validateMobile, trigger: 'blur'}
          ],
          'postInfo.expressCompany': [
            {required: true, message: '请选择快递公司', trigger: 'change'}
          ],
          'postInfo.expressNumber': [
            {required: true, message: '请输入快递单号', trigger: 'blur'}
          ],
          'mailboxPost.mailboxDeviceId': [
            {required: true, message: '请选择信包箱', trigger: 'change'}
          ],
          'mailboxPost.senderName': [
            {required: true, message: '请输入交件人姓名', trigger: 'blur'}
          ],
          'mailboxPost.senderMobile': [
            {required: true, message: '请输入交件人手机号', trigger: 'blur'},
            {validator: validateMobile, trigger: 'blur'}
          ]
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
        }
      }
    },
    computed: {
      ...mapGetters([
        'id', 'enums'
      ])
    },
    created() {
      this.init();
      this.getMailboxes();
      this.getReceiveAddress();
    },
    methods: {
      resetSearch(){
        this.page = this.$store.state.app.page,
        this.pageSize = this.$store.state.app.rows,
        this.itemName = undefined,
        this.status = undefined
      },
      init() {
        getMemberProfile().then(response => {
          if (response.status == 200) {
            this.memberId = response.data.infoInformation.userId;
            this.loadPage()
            this.getMemberAddressList(this.memberId)
          } else {
            this.$message.error('数据加载失败')
          }
        }).catch(error => {
          this.$message.error('未登录，请重新登录！')
          setTimeout(function () {
            window.location.href = '/web/api/sso/login?url=/member/pretrial'
          }, 1000);
        })
      },
      loadPage() {
        // this.memberId = this.id
        this.preauditRecordList = [];
        getPretrialPage(this.page, this.pageSize, this.itemName, this.status, this.memberId).then(response => {
          if (response.status == 200) {
            this.preauditRecordList = response.data.records;
            this.total = response.data.total;
          } else {
            this.$message.error('数据加载失败')
          }
        })
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
      },
      handleHandType(row) {
        this.handTypeVisible = true
        this.getItemHandTypes(row.itemId)
        if (row.handTypeInfo) {
          copyProperties(row.handTypeInfo, this.handTypeInfo)
        }
        this.handTypeInfo.workNo = row.workNo
      },
      handleTakeType(row) {
        this.takeTypeVisible = true
        this.getItemTakeTypes(row.itemId)
        if (row.takeTypeInfo) {
          copyProperties(row.takeTypeInfo, this.takeTypeInfo)
        }
        this.takeTypeInfo.workNo = row.workNo
        this.takeTypeInfo.memberId = this.memberId
      },
      showResvCode(row) {
        getResvCode(row.workNo).then(response => {
          if (response.data) {
            this.$message({
              showClose: true,
              type: 'success',
              duration: 0,
              message: '开箱码：' + response.data
            })
          } else {
            this.$message.warning('正在查询开箱码，请稍后重新查看')
          }
        })
      },
      getReceiveAddress() {
        getDefaultReceiveAddress().then(response => {
          this.handAddressee = response.data
        })
      },
      getMailboxes() {
        getAllMailbox({}).then(response => {
          this.mailboxList = response.data
        })
      },
      getItemHandTypes(itemId) {
        this.handTypeList = []
        getItemDelivery(itemId).then(response => {
          const handTypeList = response.data.handType.split(',')
          for (const handType of handTypeList) {
            this.handTypeList.push(parseInt(handType))
          }
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
      submitHandType() {
        this.$refs['handTypeForm'].validate(valid => {
          if (valid) {
            this.dialogLoading = true
            this.btnLoading = true
            saveHandType(this.handTypeInfo).then(() => {
              this.resetHandTypeForm()
              this.$message.success('保存成功')
              this.loadPage()
            })
          } else {
            return false
          }
        })
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
            })
          } else {
            return false
          }
        })
      },
      resetHandTypeForm() {
        this.handTypeVisible = false
        this.dialogLoading = false
        this.btnLoading = false
        this.resetHandTypeTemp()
        this.$refs['handTypeForm'].resetFields()
      },
      resetHandTypeTemp() {
        this.handTypeInfo = {
          id: undefined,
          workNo: undefined,
          handType: undefined,
          mailboxInfo: {
            id: undefined,
            mailboxId: undefined,
            senderName: undefined,
            senderMobile: undefined
          },
          postInfo: {
            id: undefined,
            expressCompany: undefined,
            expressNumber: undefined
          },
          mailboxPost: {
            id: undefined,
            mailboxDeviceId: undefined,
            mailboxLat: undefined,
            mailboxLng: undefined,
            mailboxName: undefined,
            mailboxAddress: undefined,
            senderName: undefined,
            senderMobile: undefined
          }
        }
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
        .tips {
          font-size: 14px;
          color: red;
          height: 28px;
          line-height: 28px;
          font-weight: bold;
        }
        .search-container {
          float: right;
          .el-input {
            width: 180px;
            height: 28px;
            margin: 1px 0;
            input {
              height: 28px;
              line-height: 29px;
              font-size: 12px;
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
  }
</style>
