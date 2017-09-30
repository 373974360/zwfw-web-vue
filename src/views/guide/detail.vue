<template>
  <el-row>
    <el-col :span="4">
      <div class="left">
        <div class="typeInfo">
          <p class="p1">事项类型</p>
          <p class="p2">行政审批</p>
          <p class="p1">办理主体</p>
          <p class="p2">{{basicInfo.implAgency}}</p>
          <p class="p1">办理类型</p>
          <p class="p2">
            <!--<template v-if="basicInfo.processType == 'bjlx_jbj'">即办件</template>
            <template v-if="basicInfo.processType == 'bjlx_cnj'">承诺件</template>-->
            {{basicInfo.processType | dicts('bjlx')}}
          </p>
        </div>
        <el-button type="primary" :disabled="basicInfo.handleType == 'blxs_ckbl'" @click="linkToPretrial">
          <div class="svg-container"><icon-svg iconClass="online"/></div>
          <p v-if="basicInfo.handleType == 'blxs_ckbl'">不支持预审</p>
          <p v-if="basicInfo.handleType == 'blxs_wsbl'">在线办理</p>
          <!--<p v-if="basicInfo.handleType == 1">在线预审</p>-->
        </el-button>
        <el-button type="primary">
          <div class="svg-container"><icon-svg iconClass="online"/></div>
          <p>现在预约</p>
        </el-button>
        <el-button type="primary" @click="exampleShow = !exampleShow">
          <div class="svg-container"><icon-svg iconClass="list"/></div>
          <p>样表查询</p>
        </el-button>
        <div class="downloadList" v-show="exampleShow">
            <p v-for="(material, index) in exampleMaterials">
              <a>{{index + 1}}、{{material.name}}</a>
            </p>
        </div>
        <el-button type="primary" @click="originalShow = !originalShow">
          <div class="svg-container"><icon-svg iconClass="download"/></div>
          <p>表格下载</p>
        </el-button>
        <div class="downloadList" v-show="originalShow">
            <p v-for="(material, index) in originalMaterials">
              <a>{{index + 1}}、{{material.name}}</a>
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
              <th>涉及部门</th><td>{{basicInfo.unionAgency}}</td>
              <th>受理范围</th><td>{{basicInfo.handleScope | dicts('tbfw')}}</td></tr>
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
              <th>核准数量</th><td>{{basicInfo.numberLimit == 0 ? '不限' : basicInfo.numberLimit}}</td>
            </tr>
          </table>
        </div>
        <div class="message" v-show="basicInfo.setBasis != '-'">
          <span>办理依据</span>
          <div class="msg-content" v-html="$options.filters.splitLines(basicInfo.setBasis)"></div>
        </div>
        <div class="message" v-cloak v-show="conditions.length">
          <span>办理条件</span>
          <div class="msg-content">
            <p v-for="(condition, index) in conditions">
              {{index+1}}、{{condition.content}}
            </p>
          </div>
        </div>
        <div class="message" v-show="materials.length">
          <span>提交材料</span>
          <div class="msg-content">
            <el-table :data="materials" border>
              <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
              <el-table-column prop="name" label="材料名称" min-width="320" align="center"></el-table-column>
              <el-table-column prop="number" label="份数" min-width="80" align="center"></el-table-column>
              <el-table-column prop="form" label="材料形式" min-width="160" align="center"></el-table-column>
              <el-table-column v-if="basicInfo.onlineHandleMode == 1" prop="pretrialDescription" label="网上预审环节"
                               min-width="160" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="message" v-show="materials.length">
          <span>注意事项</span>
          <div class="msg-content">
            <p class="remind">1、提交的材料如为复印件须加盖单位公章，并携带原件已备核实。
              2、网上预审环节中标★的，为必要材料，没有★标记的，为网上预审非必须材料。</p>
          </div>
        </div>
        <div class="message" v-show="basicInfo.handleTaskUrl">
          <span>办理流程</span>
          <div class="msg-content">
            <img :src="resourceUrl + basicInfo.handleTaskUrl"/>
          </div>
        </div>
        <div class="message" v-show="basicInfo.chargeStandard != '-' || basicInfo.chargeBasis != '-'">
          <span>收费情况</span>
          <div class="msg-content">
            <p><b>收费标准：</b>{{basicInfo.chargeStandard}}</p>
            <p><b>收费依据：</b>{{basicInfo.chargeBasis}}</p>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getItemDetail, getItemConditions, getItemMaterials, getItemPreorderConfig } from '../../api/item'
  import { getAllFavorites, addFavorite, delFavorite } from '../../api/member/favorite'

  export default {
    data() {
      return {
        itemId: '',
        basicInfo: {},
        conditions: [],
        materials: [],
        exampleMaterials: [],
        originalMaterials: [],
        favoriteList: [],
        exampleShow: false,
        originalShow: false,
        id: undefined
      }
    },
    computed: {
      ...mapGetters([
        'token', 'resourceUrl'
      ]),
      isPreorder() {
        let flag = false
        getItemPreorderConfig(this.itemId).then(response => {
          console.log('isPreorder: ', response)
          if (response.status == 200 && response.data.ispreorder == 1) {
            flag = true
          }
        })
        return flag
      }
    },
    created() {
      this.itemId = this.$route.params.itemId
      getItemDetail(this.itemId).then(response => {
        console.log('itemDetail: ', response)
        this.basicInfo = response.data
      })
      getItemConditions(this.itemId).then(response => {
        console.log('itemConditions: ', response)
        this.conditions = response.data
      })
      getItemMaterials(this.itemId).then(response => {
        console.log('itemMaterials: ', response)
        this.materials = response.data
        let originalIndex = 0;
        let originalMaterials = [];
        let exampleIndex = 0;
        let exampleMaterials = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].exampleUrl != '') {
            exampleMaterials[exampleIndex] = response.data[i];
            exampleIndex++;
          }
          if (response.data[i].originalUrl != '') {
            originalMaterials[originalIndex] = response.data[i];
            originalIndex++;
          }
        }
        this.originalMaterials = originalMaterials;
        this.exampleMaterials = exampleMaterials;
      })
      getAllFavorites().then(response => {
        console.log('favorite: ', response)
        this.favoriteList = response.data
      })
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
            if (itemId == favorite.itemId) {
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
        //todo 如果是企业事项判断是否完善企业信息
        this.$router.push({path: `/guide/pretrial/itemId/${this.itemId}`})
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
        span {
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
