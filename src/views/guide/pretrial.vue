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
          <p><!--<el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
          <b>办理该项业务，需满足以下申请条件才能进行业务的办理，请自检是否满足<!--，符合请打勾--></b></p>
          <!--<el-checkbox-group v-model="checkedConditions">-->
            <!--<p v-for="(condition, index) in conditions">
              <el-checkbox :label="condition" @change="handleCheckOneChange">{{index + 1}}、{{condition.content}}</el-checkbox>
            </p>-->
            <!--<p v-for="(condition, index) in conditions">
              &lt;!&ndash;<el-checkbox :label="condition" @change="handleCheckOneChange">{{index + 1}}、{{condition}}</el-checkbox>&ndash;&gt;
              {{index + 1}}、{{condition}}
            </p>-->
          <p class="condition-item" v-html="this.item.acceptCondition"></p>
          <!--</el-checkbox-group>-->
        </div>
      </div>
      <div class="message">
        <div class="msg-title-container">
          <div class="msg-title">
            <icon-svg iconClass="material"></icon-svg>&nbsp;&nbsp;申请材料
          </div>
        </div>
        <div class="msg-content">
          <p class="material-item" v-for="(material, index) in materials">{{index + 1}}. {{material.materialsName}}</p>
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
            <template v-if="member.infoPerson">
              <tr>
                <th>姓名：</th><td>{{member.infoPerson.customerName}}</td>
                <th>身份证号：</th><td>{{member.infoPerson.idNumber}}</td>
              </tr>
              <tr>
                <th>联系电话：</th><td>{{member.infoPerson.customerPhone}}</td>
              </tr>
              <tr>
                <th>通讯地址：</th><td colspan="3">{{member.infoPerson.customerAddress}}</td>
              </tr>
            </template>
            <template v-if="member.infoLegal">
              <tr>
                <th>企业名称：</th><td>{{member.infoLegal.enterpriseName}}</td>
                <th>企业工商注册号：</th><td>{{member.infoLegal.licenseNo}}</td>
              </tr>
              <tr>
                <th>企业法人：</th><td>{{member.infoLegal.legalName}}</td>
                <th>法人身份证号：</th><td>{{member.infoLegal.legalIdNumber}}</td>
              </tr>
              <tr>
                <th>通讯地址：</th><td colspan="3">{{member.infoLegal.enterpriseAddress}}</td>
              </tr>
            </template>
            <!--<tr v-if="item.handleType == 'blxs_wsbl' || item.handleType == 'blxs_wsys'">
              <th>取件方式：</th>
              <td colspan="3" >
                <el-radio-group v-model="itemPretrial.takeTypeInfo.takeType">
                  <el-radio v-for="item in enums['TakeType']" :key="item.code" :label="item.code">{{ item.value }}</el-radio>
                </el-radio-group>
              </td>
            </tr>-->
          </table>
          <!--<table v-if="item.handleType == 'blxs_wsbl' || item.handleType == 'blxs_wsys' " v-show="itemPretrial.takeTypeInfo.takeType == '2'">
            <tr><td colspan="4" style="text-align: center">确认取件箱地址</td></tr>
            <tr>
              <th>取件箱地址：</th>
              <td>
                <el-select style="width: 100%" v-model="itemPretrial.takeTypeInfo.mailboxInfo.mailboxId" placeholder="请选择取件箱地址">
                  <el-option v-for="item in mailboxes" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
              </td>
            </tr>
          </table>
          <table v-if="item.handleType == 'blxs_wsbl' || item.handleType == 'blxs_wsys' " v-show="itemPretrial.takeTypeInfo.takeType == '3'">
            <tr><td colspan="4" style="text-align: center">确认邮寄信息</td></tr>
            <tr>
              <th>收件人姓名：</th>
              <td><el-input type="text" v-model="itemPretrial.takeTypeInfo.postInfo.name"></el-input></td>
              <th>收件人电话：</th>
              <td><el-input type="text" v-model="itemPretrial.takeTypeInfo.postInfo.mobilephone"></el-input></td>
            </tr>
            <tr>
              <th>收件地址：</th>
              <td colspan="3"><el-input type="text" v-model="itemPretrial.takeTypeInfo.postInfo.address"></el-input></td>
            </tr>
          </table>-->
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
              <!--<icon-svg iconClass="star_fill" v-if="material.electronicMaterial"></icon-svg>
              <icon-svg iconClass="star" v-else></icon-svg>-->
              <icon-svg iconClass="star_fill"></icon-svg>
              {{material.materialsName}}
              <a v-if="material.materialsEmptyUrl" :href="'/manage/common/download?filePath=' + material.materialsEmptyUrl" :download="material.materialsName" :title="material.materialsName">（点击下载）</a>
            </p>
            <p>
              <!--<template v-if="material.form"><span>材料形式：</span>{{material.form}}</template>&nbsp;&nbsp;&nbsp;
              <template v-if="material.number"><span>需要份数：</span>{{material.number}}</template>&nbsp;&nbsp;&nbsp;
              <template v-if="material.pretrialDescription"><span>上传说明：</span>{{material.pretrialDescription}}</template>
              <template v-if="material.paperDescription"><span>材料说明：</span>{{material.paperDescription}}</template>-->
            </p>
            <!--<p v-if="material.detailRequirement">
              <span>详细要求：</span>{{material.detailRequirement}}
            </p>-->
            <p>
              <file-upload :ref='"upload"+index' name="file" :accept="acceptTypes" :action="uploadUrl" :multiple="true"
                           :auto-upload="false" :uploadId="index" :file-list="uploadFileList[index]" :with-credentials="true"
                           :before-upload="beforeUpload" :on-success="handleSuccess" :on-remove="handleRemove" on>
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
  import { getPretrialInfo, submitPretrial, getMailboxes } from '../../api/member/pretrial'

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
        item: {},
        itemPretrial: {
          id: '',
          memberId: '',
          itemId: '',
          materialsVersion: '',
          /*takeTypeInfo: {
            id: '',
            processNumber: '',
            memberId: '',
            takeType: 1,
            mailboxInfo: {
              id: '',
              processNumber: '',
              mailboxId: ''
            },
            postInfo: {
              id: '',
              processNumber: '',
              name: '',
              mobilephone: '',
              address: ''
            }
          },*/
          itemPretrialMaterialVoList: []
        },
        uploadUrl: this.$store.state.app.uploadUrl,
        acceptTypes: this.$store.state.app.fileAccepts,
        uploadFileList: [],
        loading: false,
        mailboxes: []
      }
    },
    computed: {
      ...mapGetters([
        'id', 'enums', 'member'
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
      /*getMailboxes().then(response => {
        this.mailboxes = response.data
      })*/
    },
    methods: {
      init1() {
        /*this.initConditions()*/
        this.initMaterials()
        this.initItemDetail()
        //this.itemPretrial.memberId = this.id
        this.itemPretrial.itemId = this.itemId
        //this.itemPretrial.takeTypeInfo.memberId = this.id
        this.notify1()
      },
      init2() {
        this.secondForm = true;
        getPretrialInfo(this.pretrialId).then(response => {
          if (response.status == 200) {
            copyProperties(response.data, this.itemPretrial)
            this.itemId = response.data.itemId
            this.initItemDetail()
            this.initMaterials()
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
          if (response.status === 200) {
            if (response.data && response.data.length > 0) {
              this.materials = response.data
              this.initPretrialMaterials()
            }
          } else {
            this.$message.error('初始化信息失败，请刷新页面！')
          }
        })
      },
      initItemDetail() {
        getItemDetail(this.itemId).then(response => {
          if (response.status === 200) {
            this.item = response.data
            //this.conditions = this.$options.filters.splitLines(response.data.acceptCondition).split('<br>')
          } else {
            this.$message.error('初始化信息失败，请刷新页面！')
          }
        })
      },
      initPretrialMaterials() {
        let itemPretrialMaterialList = [];
        this.itemPretrial.materialsVersion = this.materials[0].materialsVersion;
        for (let material of this.materials) {
          let itemPretrialMaterial = {
            materialsId: material.id,
            itemMaterialName: material.materialsName,
            materialsUrl: '',
            fileName: '',
            fileType: ''
          };
          let fileList = [];
          if (this.itemPretrial.itemPretrialMaterialVoList && this.itemPretrial.itemPretrialMaterialVoList.length > 0) {
            for (let filesInfo of this.itemPretrial.itemPretrialMaterialVoList) {
              if (filesInfo.materialsId === material.id) {
                itemPretrialMaterial.materialsUrl = filesInfo.materialsUrl;
                itemPretrialMaterial.fileName = filesInfo.fileName;
                itemPretrialMaterial.fileType = filesInfo.fileType;

                let urlArr = filesInfo.materialsUrl.split(',')
                let nameArr = filesInfo.fileName.split(',')
                for (let index of urlArr.keys()) {
                  if (index > 0) {
                    fileList.push({
                      'name': nameArr[index],
                      'url': urlArr[index]
                    })
                  }
                }
                break;
              }
            }
          }
          this.uploadFileList.push(fileList);
          itemPretrialMaterialList.push(itemPretrialMaterial);
        }
        this.itemPretrial.itemPretrialMaterialVoList = itemPretrialMaterialList;
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
        /*if (!this.checkAll) {
          this.$message({
            message: '请先满足审批条件再点击下一步',
            type: 'warning'
          })
          return
        }*/
        this.secondForm = true
        this.notify2()
      },
      beforeUpload(file) {
        let fileMax = 1024 * 1024 * 10;
        if (file.size > fileMax) {
          this.$message.error("文件过大，请重新选择文件！文件最大为10MB！");
          return false
        }
      },
      submitUpload(index) {
        let uploader = 'upload' + index
        this.$refs[uploader][0].submit()
      },
      handleSuccess(response, file, fileList, index) {
        this.$message.success(response.message);
        if (this.itemPretrial.itemPretrialMaterialVoList[index].materialsUrl) {
          this.itemPretrial.itemPretrialMaterialVoList[index].materialsUrl += `,${response.data.url}`
        } else {
          this.itemPretrial.itemPretrialMaterialVoList[index].materialsUrl = `${response.data.url}`
        }
        let fileName = file.name.substring(0, file.name.lastIndexOf('.'))
        let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        this.itemPretrial.itemPretrialMaterialVoList[index].fileName += `,${fileName}`
        this.itemPretrial.itemPretrialMaterialVoList[index].fileType += `,${fileType}`
      },
      handleRemove(file, fileList, index) {
        let filesInfo = this.itemPretrial.itemPretrialMaterialVoList[index]
        let urlArr = filesInfo.materialsUrl.split(',')
        let nameArr = filesInfo.fileName.split(',')
        let typeArr = filesInfo.fileType.split(',')
        // let position = urlArr.indexOf(file.response.data.url)
        let position = urlArr.indexOf(file.url)
        urlArr.splice(position, 1)
        nameArr.splice(position, 1)
        typeArr.splice(position, 1)
        filesInfo.materialsUrl = urlArr.join(',')
        filesInfo.fileName = nameArr.join(',')
        filesInfo.fileType = typeArr.join(',')
      },
      handleSubmit() {
        this.loading = true
        // if(!this.itemPretrial.takeTypeInfo.takeType) {
        //   this.$message.warning('请选择取件方式')
        //   this.loading = false
        //   return
        // }
        // if (this.itemPretrial.takeTypeInfo.takeType === 2
        //   && (!this.itemPretrial.takeTypeInfo.mailboxInfo.mailboxId
        //     )) {
        //   this.$message.warning('请选择取件箱地址')
        //   this.loading = false
        //   return
        // }
        // //若在线办理且需要邮寄，判断收件信息是否填写
        // if (this.itemPretrial.takeTypeInfo.takeType === 3
        //   && (!this.itemPretrial.takeTypeInfo.postInfo.name
        //     || !this.itemPretrial.takeTypeInfo.postInfo.mobilephone
        //     || !this.itemPretrial.takeTypeInfo.postInfo.address)) {
        //   this.$message.warning('请完善收件信息')
        //   this.loading = false
        //   return
        // }
        //判断所有预审材料是否均已上传
        for (let [index, val] of this.materials.entries()) {
          if (!this.itemPretrial.itemPretrialMaterialVoList[index].materialsUrl) {
            this.$message.warning('资料提交不全，请先上传资料！')
            this.loading = false
            return
          }
        }
        this.doSubmit()
      },
      doSubmit() {
        this.itemPretrial.memberId = this.id;
        // console.log(JSON.stringify(this.itemPretrial))
        submitPretrial(this.itemPretrial).then(response => {
          if (response.status == 200) {
            this.$message.success('申请提交成功，请耐心等待审核！')
            // this.$router.push({path: '/member'})
            setTimeout(function () {
              window.location.href = '/web/api/sso/redirect?url=/member'
            }, 1000);
          }
        })
      },
      notify1() {
        this.$notify.info({
          title: '提醒',
          message: '您本次网上申报的办件，工作人员将在预受理之后联系您。',
          duration: 10000,
          offset: 25
        })
      },
      notify2() {
        this.$notify.info({
          title: '提醒',
          message: '★为必要材料，您必须提交才能申报，☆为容缺候补材料，您可以在网上预受理后在窗口提交，其他为非必要材料，根据您实际情况选择提交。',
          duration: 10000,
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
        .condition-item {
          line-height: 2.5;
        }
        .material-item {
          line-height: 1.5;
        }
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
