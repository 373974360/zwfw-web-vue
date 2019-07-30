<template>
  <el-row>
    <el-col :span="4">
      <div class="left">
        <div class="typeInfo">
          <p class="p1">事项类型</p>
          <p class="p2">{{basicInfo.itemType | enums('ItemTypeEnum')}}</p>
          <p class="p1">办理主体</p>
          <p class="p2">{{basicInfo.dealDeptName}}</p>
          <p class="p1">办理类型</p>
          <p class="p2">{{basicInfo.dealType | enums('DealTypeEnum')}}</p>
        </div>
        <el-button type="primary" @click="linkToPretrial">
          <div class="svg-container"><icon-svg iconClass="online"/></div>
          <p>在线预审</p>
        </el-button>
        <!--<el-button type="primary" :disabled="!basicInfo.orderable" @click="linkToPreorder">
          <div class="svg-container"><icon-svg iconClass="online"/></div>
          <p v-if="basicInfo.orderable">现在预约</p>
          <p v-else>不支持预约</p>
        </el-button>-->
        <el-button type="primary" @click="exampleShow = !exampleShow">
          <div class="svg-container"><icon-svg iconClass="list"/></div>
          <p>样表查询</p>
        </el-button>
        <div class="downloadList" v-show="exampleShow">
            <p v-for="(material, index) in exampleMaterials">
              <a :href="'/manage/common/download?filePath=' + material.materialsFileUrl" :download="material.materialsName">{{index + 1}}. {{material.materialsName}}</a>
            </p>
        </div>
        <el-button type="primary" @click="originalShow = !originalShow">
          <div class="svg-container"><icon-svg iconClass="download"/></div>
          <p>表格下载</p>
        </el-button>
        <div class="downloadList" v-show="originalShow">
            <p v-for="(material, index) in originalMaterials">
              <a :href="'/manage/common/download?filePath=' + material.materialsEmptyUrl" :download="material.materialsName">{{index + 1}}. {{material.materialsName}}</a>
            </p>
        </div>
        <el-button v-if="isFavorite()" type="primary" @click="removeFavorite">
          <div class="svg-container"><icon-svg iconClass="collect"/></div>
          <p>取消收藏</p>
        </el-button>
        <el-button v-else type="primary" @click="appendFavorite">
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
              <th>联办机构</th><td>{{basicInfo.unionOrgName}}</td>
              <th>通办范围</th><td>{{basicInfo.generalRange | enums('GeneralRangeEnum')}}</td></tr>
            <tr>
              <th>承诺期限</th><td>{{basicInfo.promiseComptime}}</td>
              <th>法定期限</th><td>{{basicInfo.lawComptime}}</td>
            </tr>
            <tr>
              <th>办理时间</th><td>{{basicInfo.acceptTime}}</td>
              <th>咨询电话</th><td>{{basicInfo.askTel}}</td>
            </tr>
            <tr>
              <th>办理地点</th><td>{{basicInfo.acceptPlace}}</td>
              <th>监督电话</th><td>{{basicInfo.superviseTel}}</td>
            </tr>
            <tr>
              <th>办理结果</th><td>{{basicInfo.resultName}}</td>
              <th>数量限制</th><td>{{basicInfo.numLimit == null ? '不限' : basicInfo.numLimit}}</td>
            </tr>
          </table>
        </div>
        <div class="message" v-show="basicInfo.legalBasis">
          <span class="msg-label">办理依据</span>
          <div class="msg-content" v-html="$options.filters.splitLines(basicInfo.legalBasis)"></div>
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
              <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
              <el-table-column prop="materialsName" label="材料名称" min-width="120" align="center"></el-table-column>
              <el-table-column prop="materialsFrom" label="材料来源" min-width="100" align="center"></el-table-column>
              <el-table-column prop="materialsTypeName" label="材料类型" min-width="100" align="center"></el-table-column>
              <el-table-column prop="materialsSubTypeName" label="材料子类型" min-width="120" align="center"></el-table-column>
              <el-table-column prop="copySpecialRequirements" label="复印件特殊要求" min-width="140" align="center"></el-table-column>
              <!--<el-table-column prop="number" label="份数" min-width="80" align="center"></el-table-column>
              <el-table-column prop="form" label="材料形式" min-width="160" align="center"></el-table-column>
              <el-table-column v-if="basicInfo.handleType == 'blxs_wsbl'" prop="pretrialDescription" label="网上预审环节"
                               min-width="160" align="center"></el-table-column>
              <el-table-column prop="paperDescription" label="纸质材料说明" min-width="180" align="center"></el-table-column>
              <el-table-column prop="acceptStandard" label="受理标准" min-width="150" align="center"></el-table-column>-->
              <el-table-column prop="materialsWarn" label="填表须知" min-width="120" align="center"></el-table-column>
              <el-table-column prop="materialsNum" label="纸质材料数量" min-width="120" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="materials-item" >

        </div>
        <div class="message" v-show="materials.length">
          <span class="msg-label">注意事项</span>
          <div class="msg-content">
            <p class="remind">1、提交的材料如为复印件须加盖单位公章，并携带原件已备核实。
              2、网上预审环节中标★的，为必要材料，没有★标记的，为网上预审非必须材料。</p>
          </div>
        </div>
        <div class="message" v-show="basicInfo.handleWorkflow">
          <span class="msg-label">办理流程</span>
          <div class="msg-content">
<!--            <a :href="basicInfo.handleWorkflow" target="_blank">{{basicInfo.handleWorkflow}}</a>-->
            <img class="handle-workflow-img" :src="basicInfo.handleWorkflow">
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
    </el-col>
  </el-row>
</template>

<script>
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { getItemDetail, /*getItemConditions,*/ getItemMaterials, getItemPreorderConfig } from '../../api/item'
  import { getAllFavorites, addFavorite, delFavorite } from '../../api/member/favorite'

  export default {
    data() {
      return {
        itemId: '',
        basicInfo: {},
        /*conditions: [],*/
        materials: [],
        exampleMaterials: [],
        originalMaterials: [],
        favoriteList: [],
        exampleShow: false,
        originalShow: false,
        id: undefined,
        uploadUrl: this.$store.state.app.uploadUrl,
        acceptTypes: this.$store.state.app.fileAccepts,
      }
    },
    computed: {
      ...mapGetters([
        'token', 'resourceUrl', 'memberType'
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
          if (response.data[i].materialsFileUrl) {
            exampleMaterials[exampleIndex] = response.data[i];
            exampleIndex++;
          }
          if (response.data[i].materialsEmptyUrl) {
            originalMaterials[originalIndex] = response.data[i];
            originalIndex++;
          }
        }
        this.originalMaterials = originalMaterials;
        this.exampleMaterials = exampleMaterials;
      })
      /*if (this.token) {
        getAllFavorites().then(response => {
          this.favoriteList = response.data
        })
      }*/
    },
    methods: {
      isFavorite() {
        if (this.token) {
          for (let favorite of this.favoriteList) {
            if (this.itemId == favorite.itemId) {
              return true
            }
          }
        }
        return false
      },
      appendFavorite() {
        if (this.token) {
          addFavorite(this.itemId).then(response => {
            if (response.httpCode == 200) {
              this.favoriteList.push(response.data)
            }
          })
        } else {
          this.$router.push({path: '/login'})
        }
      },
      removeFavorite() {
        if (this.token) {
          for (let [index, favorite] of this.favoriteList.entries()) {
            if (this.itemId == favorite.itemId) {
              delFavorite(favorite.id).then(response => {
                if (response.httpCode == 200) {
                  this.favoriteList.splice(index, 1)
                }
              })
              break
            }
          }
        } else {
          this.$router.push({path: '/login'})
        }
      },
      linkToPretrial() {
        if (!this.token) {
          Message({
            message: "登录超时，请重新登录",
            type: 'error',
            duration: 5 * 1000
          })
          this.$router.push({path: `/login`})
          return
        }
        if (this.basicInfo.serviceObject.toString().indexOf(this.memberType) == -1) {
          Message({
            message: "只可以办理与登录账号相同类别的事项！",
            type: 'warning',
            duration: 5 * 1000
          })
          return
        }
        // this.$router.push({path: `/guide/pretrial/itemId/${this.itemId}`})
        window.location.href = '/web/api/sso/redirect?url=/guide/pretrial/itemId/' + this.itemId
      },
      linkToPreorder() {
        this.$router.push({path: `/guide/preorder/${this.itemId}`})
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
        font-size: 16px;
        margin-top: 5px;
        margin-left: 0;
        width: 100%;
        div, p {
          float: left;
        }
        p {
          margin: 0;
          line-height: 24px;
        }
        .svg-container {
          height: 24px;
          margin-left: 20px;
          margin-right: 10px;
          .svg-icon {
            width: 1.5em;
            height: 1.5em;
          }
        }
      }
      .downloadList {
        width: 100%;
        margin: 0;
        font-size: 14px;
        text-align: left;
        p {
          margin-bottom: 0;
          margin-top: 5px;
          text-indent: 22px;
          line-height: 25px;
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
          a { text-decoration: underline blue; color: blue }
        }
      }
    }
  }
</style>
