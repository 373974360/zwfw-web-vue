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
            <p v-for="(condition, index) in conditions">
              <el-checkbox :label="condition" @change="handleCheckOneChange">{{index + 1}}、{{condition.content}}</el-checkbox>
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
            <tr>
              <th>企业名称：</th><td><!--{{user.company.name}}--></td>
              <th>企业工商注册号：</th><td><!--{{user.company.unifyCode}}--></td>
            </tr>
            <tr>
              <th>企业法人：</th><td><!--{{user.company.legalPerson}}--></td>
              <th>法人身份证号：</th><td><!--{{user.company.legalPersonCard}}--></td>
            </tr>
            <tr>
              <th>联系人姓名：</th><td>{{user.name}}</td>
              <th>联系人身份证号：</th><td>{{user.loginName}}</td>
            </tr>
            <tr>
              <th>联系人电话：</th><td>{{user.mobilephone}}</td>
              <th>电子邮箱：</th><td>{{user.email}}</td>
            </tr>
            <tr>
              <th>通讯地址：</th><td colspan="3">{{user.address}}</td>
            </tr>
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
              <a v-if="material.originalUrl" :href="resourceUrl + material.originalUrl" :download="material.name" :title="material.name">（点击下载）</a>
            </p>
            <p>
              <template v-if="material.form"><span>材料形式：</span>{{material.form}}</template>&nbsp;&nbsp;&nbsp;
              <template v-if="material.number"><span>需要份数：</span>{{material.number}}</template>&nbsp;&nbsp;&nbsp;
              <template v-if="material.pretrialDescription"><span>上传说明：</span>{{material.pretrialDescription}}</template>
            </p>
            <p v-if="material.detailRequirement">
              <span>详细要求：</span>{{material.detailRequirement}}
            </p>
            <p>
              <!--<el-upload :ref='"upload"+index' name="upfile" :action="uploadUrl" :multiple="true" :auto-upload="false"
                         :on-preview="handlePreview" :on-success="handleSuccess" :on-remove="handleRemove">
                <el-button size="small" type="primary">选取文件</el-button>
                <el-button size="small" type="success" @click.stop="submitUpload(index)">上传到服务器</el-button>
              </el-upload>-->
              <file-upload :ref='"upload"+index' name="upfile" :action="uploadUrl" :multiple="true" :auto-upload="false" :uploadId="index"
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
        <el-button type="primary" size="large" @click="">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getItemConditions, getItemMaterials, getItemDetail, getItemPretrial } from '../../api/guide'
  import { mapGetters } from 'vuex'
  import FileUpload from '../../components/FileUpload'

  export default {
    data() {
      return {
        itemId: '',
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
          companyId: '',
          itemId: '',
          itemName: '',
          takeType: '',
          itemPostInfo: {
            pretrialId: '',
            name: '',
            mobilephone: '',
            address: ''
          },
          itemPretrialMaterialVoList: []
        },
        uploadUrl: ''
      }
    },
    computed: {
      ...mapGetters([
        'user', 'resourceUrl'
      ])
    },
    components: {
      FileUpload
    },
    created() {
      this.itemId = this.$route.params.itemId
      this.uploadUrl = `${process.env.ZWFW_API}/ueditor/pretrialUpload`
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
        offset: 25
      })
    },
    methods: {
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
            showClose: true,
            message: '请先满足审批条件再点击下一步',
            type: 'warning'
          })
          return
        }
        this.showSecondForm()
      },
      showSecondForm() {
        getItemDetail(this.itemId).then(response => {
          this.item = response.data
        })
        for (let i=0; i<this.materials.length; i++) {
          this.itemPretrial.itemPretrialMaterialVoList.push({
            itemMaterialId: this.materials[i].id,
            itemMaterialName: this.materials[i].name,
            itemMaterialUrl: '',
            fileName: '',
            fileType: ''
          })
        }
        this.itemPretrial.takeType = '1'
        this.secondForm = true
        this.secondPageNotify()
      },
      secondPageNotify() {
        this.$notify.info({
          title: '提醒',
          message: '★为必要材料，您必须提交才能申报，☆为容缺候补材料，您可以在网上预受理后在窗口提交， 为非必要材料， 根据您实际情况选择提交。',
          duration: 0,
          offset: 25
        })
      },
      submitUpload(index) {
        let uploader = 'upload' + index
        console.log(this.$refs[uploader])
        this.$refs[uploader][0].submit()
      },
      handlePreview(file) {
        console.log(file.response)
//        window.open('E:\\deya\\zwfw' + file.response.url)
        var aLink = document.createElement('a');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
        aLink.download = file.response.title;
        aLink.href = 'E:\\deya\\zwfw' + file.response.url;
        aLink.dispatchEvent(evt);
      },
      handleSuccess(response, file, fileList, index) {
        this.itemPretrial.itemPretrialMaterialVoList[index].itemMaterialUrl += `|${response.url}`
        this.itemPretrial.itemPretrialMaterialVoList[index].fileName += `|${response.title}`
        this.itemPretrial.itemPretrialMaterialVoList[index].fileType += `|${file.ext}`
      },
      handleRemove(file, fileList, index) {
        console.log(file, fileList)
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
