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
          <p><el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <b>办理该项业务，需满足以下申请条件才能进行业务的办理，请自检是否满足，符合请打勾</b></p>
          <el-checkbox-group v-model="checkedConditions">
            <!--<p v-for="(condition, index) in conditions">
              <el-checkbox :label="condition" @change="handleCheckOneChange">{{index + 1}}、{{condition.content}}</el-checkbox>
            </p>-->
            <p v-for="condition in conditions">
              <el-checkbox :label="condition" @change="handleCheckOneChange">{{condition}}</el-checkbox>
            </p>
          </el-checkbox-group>
        </div>
      </div>
      <div class="message">
        <div class="msg-title-container">
          <div class="msg-title">
            <icon-svg iconClass="material"></icon-svg>&nbsp;&nbsp;申请材料
          </div>
        </div>
        <div class="msg-content">
          <p v-for="(material, index) in materials">{{index + 1}}、{{material.name}}</p>
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
          <div class="table-title">{{item.name}}</div>
          <table>
            <template v-if="member.type == memberType.nature">
              <tr>
                <th>姓名：</th><td>{{member.naturePerson.name}}</td>
                <th>身份证号：</th><td>{{member.naturePerson.idcard}}</td>
              </tr>
              <tr>
                <th>联系电话：</th><td>{{member.naturePerson.phone}}</td>
              </tr>
              <tr>
                <th>通讯地址：</th><td colspan="3">{{member.naturePerson.address}}</td>
              </tr>
            </template>
            <template v-if="member.type == memberType.legal">
              <tr>
                <th>企业名称：</th><td>{{member.legalPerson.companyName}}</td>
                <th>企业工商注册号：</th><td>{{member.legalPerson.companyCode}}</td>
              </tr>
              <tr>
                <th>企业法人：</th><td>{{member.legalPerson.legalPerson}}</td>
                <th>法人身份证号：</th><td>{{member.legalPerson.idcard}}</td>
              </tr>
              <tr>
                <th>通讯地址：</th><td colspan="3">{{member.legalPerson.registerPlace}}</td>
              </tr>
            </template>
            <tr v-if="item.onlineHandleMode == 2">
              <th>取件方式：</th>
              <td colspan="3">
                <el-radio class="radio" v-model="itemPretrial.takeType" label="1">大厅自取</el-radio>
                <el-radio class="radio" v-model="itemPretrial.takeType" label="2">快递邮寄</el-radio>
              </td>
            </tr>
          </table>
          <table v-if="item.onlineHandleMode == 2" v-show="itemPretrial.takeType == 2">
            <tr><td colspan="4" style="text-align: center">确认邮寄信息</td></tr>
            <tr>
              <th>收件人姓名：</th>
              <td><el-input type="text" v-model="itemPretrial.itemPostInfo.name"></el-input></td>
              <th>收件人电话：</th>
              <td><el-input type="text" v-model="itemPretrial.itemPostInfo.tellphone"></el-input></td>
            </tr>
            <tr>
              <th>收件地址：</th>
              <td colspan="3"><el-input type="text" v-model="itemPretrial.itemPostInfo.address"></el-input></td>
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
          <div class="materials-item" v-for="(material, index) in materials">
            <p>
              <span>材料名称：</span>
              <icon-svg iconClass="star_fill" v-if="material.isPretrialSubmit == 1"></icon-svg>
              <icon-svg iconClass="star" v-else></icon-svg>
              {{material.name}}
              <a v-if="material.eform" :href="material.eform" :download="material.name" :title="material.name">（点击下载）</a>
            </p>
            <p>
              <!--<template v-if="material.form"><span>材料形式：</span>{{material.form}}</template>&nbsp;&nbsp;&nbsp;
              <template v-if="material.number"><span>需要份数：</span>{{material.number}}</template>&nbsp;&nbsp;&nbsp;
              <template v-if="material.pretrialDescription"><span>上传说明：</span>{{material.pretrialDescription}}</template>-->
              <template v-if="material.paperDescription"><span>材料说明：</span>{{material.paperDescription}}</template>
            </p>
            <!--<p v-if="material.detailRequirement">
              <span>详细要求：</span>{{material.detailRequirement}}
            </p>-->
            <p>
              <file-upload :ref='"upload"+index' name="uploadFile" :action="uploadUrl" :multiple="true" :auto-upload="false"
                           :uploadId="index" :file-list="uploadFileList[index]" :with-credentials="true"
                           :on-preview="handlePreview" :on-success="handleSuccess" :on-remove="handleRemove">
                <el-button size="small" type="primary">选取文件</el-button>
                <el-button size="small" type="success" @click.stop="submitUpload(index)">上传到服务器</el-button>
              </file-upload>
            </p>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <el-button size="large" @click="secondForm = false">上一步</el-button>
        <el-button type="primary" size="large" @click="handleSubmit" :loading="loading">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import FileUpload from '../../components/FileUpload'
  import { mapGetters } from 'vuex'
  import { copyProperties } from '../../utils'
  import { getItemDetail, /*getItemConditions,*/ getItemMaterials } from '../../api/item'
  import { getPretrialInfo, submitPretrial } from '../../api/member/pretrial'
  import { getDetailInfo } from '../../api/member/member'

  export default {
    components: {
      FileUpload
    },
    data() {
      return {
        itemId: '',
        pretrialId: '',
        conditions: [],
        materials: [],
        checkAll: false,
        checkedConditions: [],
        indeterminate: false,
        secondForm: false,
        member: {},
        memberType: this.$store.state.app.memberType,
        item: {},
        itemPretrial: {
          id: '',
          memberId: '',
          itemId: '',
          takeType: '1',
          itemPostInfo: {
            id: '',
            pretrialId: '',
            memberId: '',
            name: '',
            mobilephone: '',
            address: ''
          },
          itemPretrialMaterialVoList: []
        },
        uploadUrl: '/api/common/upload',
        uploadFileList: [],
        loading: false
      }
    },
    computed: {
      ...mapGetters([
        'resourceUrl', 'id'
      ])
    },
    created() {
      let param = this.$route.params.key
      if (param == 'itemId') {
        this.itemId = this.$route.params.value
        this.init1()
      } else if (param == 'id') {
        this.pretrialId = this.$route.params.value
        this.init2()
      }
      getDetailInfo().then(response => {
        this.member = response.data
      })
    },
    methods: {
      init1() {
        /*this.initConditions()*/
        this.initMaterials()
        this.initItemDetail()
        this.itemPretrial.memberId = this.id
        this.itemPretrial.itemId = this.itemId
        this.itemPretrial.itemPostInfo.memberId = this.id
        this.notify1()
      },
      init2() {
        this.secondForm = true
        getPretrialInfo(this.pretrialId).then(response => {
          if (response.httpCode == 200) {
            copyProperties(response.data, this.itemPretrial)
            this.itemId = response.data.itemId
            this.initItemDetail()
            this.initMaterials()
            this.initUploadFileList(response.data.itemPretrialMaterialVoList)
          } else {
            this.$message.error('初始化信息失败，请刷新页面！')
          }
        })
        this.notify2()
      },
      /*initConditions() {
        getItemConditions(this.itemId).then(response => {
          if (response.httpCode == 200) {
            this.conditions = response.data
          } else {
            this.$message.error('初始化信息失败，请刷新页面！')
          }
        })
      },*/
      initMaterials() {
        getItemMaterials(this.itemId).then(response => {
          if (response.httpCode == 200) {
            this.materials = response.data
            if (!this.pretrialId) {
              this.initPretrialMaterials()
            }
          } else {
            this.$message.error('初始化信息失败，请刷新页面！')
          }
        })
      },
      initItemDetail() {
        getItemDetail(this.itemId).then(response => {
          if (response.httpCode == 200) {
            this.item = response.data
            this.conditions = this.$options.filters.splitLines(response.data.acceptCondition).split('<br />')
          } else {
            this.$message.error('初始化信息失败，请刷新页面！')
          }
        })
      },
      initPretrialMaterials() {
        for (let val of this.materials) {
          this.itemPretrial.itemPretrialMaterialVoList.push({
            itemMaterialId: val.id,
            itemMaterialName: val.name,
            itemMaterialUrl: '',
            fileName: '',
            fileType: ''
          })
        }
      },
      initUploadFileList(itemPretrialMaterialVoList) {
        this.itemPretrial.itemPretrialMaterialVoList = []
        for (let filesInfo of itemPretrialMaterialVoList) {
          this.itemPretrial.itemPretrialMaterialVoList.push({
            itemMaterialId: filesInfo.itemMaterialId,
            itemMaterialName: filesInfo.itemMaterialName,
            itemMaterialUrl: filesInfo.itemMaterialUrl,
            fileName: filesInfo.fileName,
            fileType: filesInfo.fileType
          })
          let urlArr = filesInfo.itemMaterialUrl.split('|')
          let nameArr = filesInfo.fileName.split('|')
          let fileList = []
          for (let index of urlArr.keys()) {
            if (index > 0) {
              fileList.push({
                'name': nameArr[index],
                'url': urlArr[index]
              })
            }
          }
          this.uploadFileList.push(fileList)
        }
      },
      handleCheckAllChange(event) {
        this.checkedConditions = event.target.checked ? this.conditions : []
        this.indeterminate = false
      },
      handleCheckOneChange() {
        this.checkAll = this.checkedConditions.length === this.conditions.length
        this.indeterminate = this.checkedConditions.length > 0 && this.checkedConditions.length < this.conditions.length
      },
      nextPage() {
        if (!this.checkAll) {
          this.$message({
            message: '请先满足审批条件再点击下一步',
            type: 'warning'
          })
          return
        }
        this.secondForm = true
        this.notify2()
      },
      submitUpload(index) {
        let uploader = 'upload' + index
        this.$refs[uploader][0].submit()
      },
      handlePreview(file) {
        //todo download
      },
      handleSuccess(response, file, fileList, index) {
        this.itemPretrial.itemPretrialMaterialVoList[index].itemMaterialUrl += `|${response.url}`
        this.itemPretrial.itemPretrialMaterialVoList[index].fileName += `|${response.title}`
        let fileType = this.resolveFileType(response.title)
        this.itemPretrial.itemPretrialMaterialVoList[index].fileType += `|${fileType}`
      },
      resolveFileType(fileName) {
        let arr = fileName.split('.')
        return arr[arr.length - 1]
      },
      handleRemove(file, fileList, index) {
        let filesInfo = this.itemPretrial.itemPretrialMaterialVoList[index]
        let urlArr = filesInfo.itemMaterialUrl.split('|')
        let nameArr = filesInfo.fileName.split('|')
        let typeArr = filesInfo.fileType.split('|')
        let position = urlArr.indexOf(file.response.url)
        urlArr.splice(position, 1)
        nameArr.splice(position, 1)
        typeArr.splice(position, 1)
        filesInfo.itemMaterialUrl = urlArr.join('|')
        filesInfo.fileName = nameArr.join('|')
        filesInfo.fileType = typeArr.join('|')
      },
      handleSubmit() {
        this.loading = true
        //若在线办理且需要邮寄，判断收件信息是否填写
        if (this.item.onlineHandleMode == 2 && this.itemPretrial.takeType == 2
          && (!this.itemPretrial.itemPostInfo.name
            || !this.itemPretrial.itemPostInfo.mobilephone
            || !this.itemPretrial.itemPostInfo.address)) {
          this.$message.warning('请完善收件信息')
          this.loading = false
          return
        }
        //判断所有预审材料是否均已上传
        for (let [index, val] of this.materials.entries()) {
          if (val.isPretrialSubmit == 1 && !this.itemPretrial.itemPretrialMaterialVoList[index].itemMaterialUrl) {
            this.$message.warning('资料提交不全，请先上传资料！')
            this.loading = false
            return
          }
        }
        this.doSubmit()
      },
      doSubmit() {
        submitPretrial(this.itemPretrial).then(response => {
          if (response.httpCode == 200) {
            this.$message.success('申请提交成功，请耐心等待审核！')
            this.$router.push({path: '/member'})
          } else {
            this.$message.error(response.msg)
            this.loading = false
          }
        }).catch(error => {
          this.$message.error('系统繁忙，请稍后重试！')
          this.loading = false
        })
      },
      notify1() {
        this.$notify.info({
          title: '提醒',
          message: '您本次网上申报的办件，工作人员将在预受理之后联系您。',
          duration: 0,
          offset: 25
        })
      },
      notify2() {
        this.$notify.info({
          title: '提醒',
          message: '★为必要材料，您必须提交才能申报，☆为容缺候补材料，您可以在网上预受理后在窗口提交，其他为非必要材料，根据您实际情况选择提交。',
          duration: 0,
          offset: 25
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
              padding: 3px 25px;
              input {
                height: 32px;
              }
            }
          }
        }
        .materials-item {
          min-height: 122px;
          border: 1px solid #ccc;
          padding: 8px 20px;
          margin-bottom: 12px;
          position: relative;
          p {
            color: #565656;
            .svg-icon {
              color: red;
            }
            span {
              color: #3060cc;
            }
            a {
              color: red;
            }
            .el-button {
              span {
                color: #fff;
              }
            }
          }
          /*.p3 {
            position: absolute;
            top: 30px;
            right: 35px;
            span {
              color: #fff;
            }
          }*/
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
