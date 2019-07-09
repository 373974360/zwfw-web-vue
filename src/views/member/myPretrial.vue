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
      <pretrial-table :data="preauditRecordList"
                      :show-delivery="true"
                      :on-hand-type="handleHandType"
                      :on-take-type="handleTakeType"
                      :on-resv-code="showResvCode">
      </pretrial-table>
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

    <el-dialog title="修改交件方式" :visible.sync="handTypeVisible" :close-on-click-modal="closeOnClickModal"
               :before-close="resetHandTypeForm">
      <el-form ref="handTypeForm" :model="handTypeInfo" :rules="handTypeRules" v-loading="dialogLoading"
               label-position="right" label-width="120px">
        <el-form-item label="交件方式" prop="handType">
          <el-select v-model="handTypeInfo.handType" style="width: 80%">
            <el-option v-for="item in handTypeList" :key="item" :value="item" :label="item | enums('HandTypeEnum')">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信包箱" prop="mailboxInfo.mailboxId" v-if="handTypeInfo.handType === 2">
          <el-select v-model="handTypeInfo.mailboxInfo.mailboxId" style="width: 80%">
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
        <el-form-item v-if="handTypeInfo.handType === 3">
          <span style="color: red">* 若选择邮政EMS邮寄，请联系：史美娟 029-83599258，工作时间：周一至周五 09:00 - 17:00</span>
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
          <el-select v-model="handTypeInfo.postInfo.expressCompany" style="width: 80%">
            <el-option v-for="item in enums['ExpressCompanyEnum']" :key="item.code" :value="item.code" :label="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" prop="postInfo.expressNumber" v-if="handTypeInfo.handType === 3">
          <el-input v-model="handTypeInfo.postInfo.expressNumber"></el-input>
        </el-form-item>
        <el-form-item label="信包箱" prop="mailboxPost.mailboxDeviceId" v-if="handTypeInfo.handType === 5">
          <el-select v-model="handTypeInfo.mailboxPost.mailboxDeviceId" @change="changePostMailbox" style="width: 80%">
            <el-option v-for="item in closestMailboxList" :key="item.id" :value="item.id + ''" :label="item.name">
            </el-option>
          </el-select>
          <div style="font-size: 12px;">
            <a href="javascript:;" @click="handleSelectPosition">重新定位</a>
            <span>&nbsp;|&nbsp;</span>
            <a href="javascript:;" @click="handleShowMailboxMap">从地图上选择</a>
          </div>
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

    <el-dialog :title="mapTitle" :visible.sync="baiduMapVisible" :close-on-click-modal="closeOnClickModal">
      <div id="baiduMap" style="width: 100%; height: 600px"></div>
      <div id="r-result" v-show="mapSearcherVisible" style="position: absolute;top: 80px;left: 45px;display: none">
        <input type="text" id="suggestId" size="20" placeholder="搜索地点" v-model="searchPlace"
               style="width: 300px;height: 32px;border: 1px solid #ccc;padding: 0 8px;"/>
      </div>
      <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
    </el-dialog>

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
  </div>
</template>

<script>
  import { PretrialTable } from './table'
  import { mapGetters } from 'vuex'
  import { copyProperties } from "../../utils";
  import { validMobiles } from "../../utils/validate";
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
  import {
    queryClosestMailbox
  } from "../../api/mailbox";

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
        cardVisible: false,
        cardItemVisible: false,
        handTypeList: [],
        takeTypeList: [],
        mailboxList: [],
        handAddressee: {},
        closestMailboxList: [],
        memberAddressList: [],
        cardHeader: {
          name: '',
          phone: '',
          address: ''
        },
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
        },
        map: {},
        positionPoint: {},
        mapTitle: '',
        baiduMapVisible: true,
        mapSearcherVisible: false,
        searchPlace: '',
        lat: undefined,
        lng: undefined,
        mapLat: undefined,
        mapLng: undefined
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
      this.getReceiveAddress()
      this.getMemberAddressList(this.id)
    },
    mounted() {
      this.baiduMapVisible = false
      this.getPosition()
      this.$nextTick(() => {
        this.initBaiduMap()
      })
    },
    methods: {
      resetSearch() {
        this.page = this.$store.state.app.page
        this.pageSize = this.$store.state.app.rows
        this.itemName = undefined
        this.status = undefined
      },
      loadPage() {
        getPretrialPage(this.page, this.pageSize, this.itemName, this.status, this.id).then(response => {
          this.preauditRecordList = response.data.records
          this.total = response.data.total
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
        this.resetHandMailboxPostSelection()
      },
      handleTakeType(row) {
        this.takeTypeVisible = true
        this.getItemTakeTypes(row.itemId)
        if (row.takeTypeInfo) {
          copyProperties(row.takeTypeInfo, this.takeTypeInfo)
        }
        this.takeTypeInfo.workNo = row.workNo
        this.takeTypeInfo.memberId = this.id
        this.initCardHeader()
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
              this.getMemberAddressList(this.id)
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
      initBaiduMap() {
        this.map = new BMap.Map('baiduMap');
        this.positionPoint = new BMap.Point(108.910297, 34.239161);
        this.map.centerAndZoom(this.positionPoint, 16);
        this.map.enableScrollWheelZoom(true);
        this.initMapSearcher();
      },
      initMapSearcher() {
        let ac = new BMap.Autocomplete({
          'input': 'suggestId',
          'location': this.map
        });
        ac.addEventListener('onhighlight', e => {
          let str = '';
          let _value = e.fromitem.value;
          let value = '';
          if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
          }
          str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value;

          value = '';
          if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
          }
          str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value;
          this.G('searchResultPanel').innerHTML = str;
        });
        ac.addEventListener('onconfirm', e => {
          let _value = e.item.value;
          let result = _value.province + _value.city + _value.district + _value.street + _value.business;
          this.G('searchResultPanel').innerHTML = 'onconfirm<br />index = ' + e.item.index + '<br />result = ' + result;

          this.setPlace(result);
        });
      },
      setPlace(result) {
        this.map.clearOverlays();
        const myFun = () => {
          let pp = local.getResults().getPoi(0).point;
          this.map.centerAndZoom(pp, 16);
          this.map.addOverlay(new BMap.Marker(pp));
        };
        let local = new BMap.LocalSearch(this.map, {
          onSearchComplete: myFun
        });
        local.search(result);
      },
      G(id) {
        return document.getElementById(id);
      },
      getPosition() {
        const _this = this;
        let geolocation = new BMap.Geolocation();
        geolocation.enableSDKLocation();
        return new Promise((resolve, reject) => {
          geolocation.getCurrentPosition(function(position) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              _this.mapLat = position.point.lat;
              _this.mapLng = position.point.lng;
              _this.convertGPSToBD(_this.mapLng, _this.mapLat, _this.calGPSToQuery);
              resolve()
            } else {
              alert('获取当前位置坐标失败')
              reject()
            }
          })
        });
      },
      convertGPSToBD(lng, lat, translateCallback) {
        let convertor = new BMap.Convertor();
        let pointArr = [];
        pointArr.push(new BMap.Point(lng, lat));
        convertor.translate(pointArr, 0, 5, translateCallback);
      },
      calGPSToQuery(data) {
        if (data.status === 0) {
          let point = data.points[0];
          this.lat = this.mapLat * 2 - point.lat;
          this.lng = this.mapLng * 2 - point.lng;
          this.queryClosestMailbox(this.lat, this.lng).then(() => {
            this.resetHandMailboxPostSelection()
          })
        }
      },
      queryClosestMailbox(lat, lng) {
        return new Promise((resolve, reject) => {
          queryClosestMailbox(lat, lng).then(response => {
            this.closestMailboxList = response.data
            resolve()
          }).catch(err => {
            reject(err)
          })
        })
      },
      resetHandMailboxPostSelection() {
        if (this.handTypeInfo.mailboxPost.mailboxDeviceId) {
          for (let device of this.closestMailboxList) {
            if (device.id == this.handTypeInfo.mailboxPost.mailboxDeviceId) {
              return;
            }
          }
          this.closestMailboxList.push({
            id: this.handTypeInfo.mailboxPost.mailboxDeviceId,
            lat: this.handTypeInfo.mailboxPost.mailboxLat,
            lng: this.handTypeInfo.mailboxPost.mailboxLng,
            name: this.handTypeInfo.mailboxPost.mailboxName,
            address: this.handTypeInfo.mailboxPost.mailboxAddress
          })
        }
      },
      handleSelectPosition() {
        this.baiduMapVisible = true
        this.mapSearcherVisible = true;
        this.mapTitle = '选择您所在位置';
        this.map.clearOverlays();
        this.map.addEventListener('click', this.doSelectPosition);
        this.addPositionMarker();
        setTimeout(() => {
          this.map.panTo(this.positionPoint);
        }, 100);
      },
      doSelectPosition(e) {
        if (confirm('确定定位到所选位置吗？')) {
          this.map.clearOverlays();
          let mk = new BMap.Marker(e.point);
          this.map.addOverlay(mk);
          this.mapLng = e.point.lng;
          this.mapLat = e.point.lat;
          this.convertGPSToBD(this.mapLng, this.mapLat, this.calGPSToQuery);
          this.closeDialogMap();
        }
      },
      handleShowMailboxMap() {
        this.baiduMapVisible = true
        this.mapSearcherVisible = true
        this.mapTitle = '选择快件箱';
        this.map.clearOverlays();
        this.map.removeEventListener('click', this.doSelectPosition);
        this.addPositionMarker();
        setTimeout(() => {
          this.map.panTo(this.positionPoint);
        }, 100);
        for (let device of this.closestMailboxList) {
          this.convertGPSToBD(device.lng, device.lat, (data) => {
            if (data.status === 0) {
              let mark = this.addMailboxMarker(data.points[0], device);
              mark.addEventListener('click', e => {
                this.handTypeInfo.mailboxPost.mailboxDeviceId = device.id + '';
                this.handTypeInfo.mailboxPost.mailboxLat = device.lat;
                this.handTypeInfo.mailboxPost.mailboxLng = device.lng;
                this.handTypeInfo.mailboxPost.mailboxName = device.name;
                this.handTypeInfo.mailboxPost.mailboxAddress = device.address;
                this.closeDialogMap();
              });
            }
          });
        }
      },
      handleShowSelectedMailboxMap() {
        this.baiduMapVisible = true
        this.mapSearcherVisible = false
        this.mapTitle = '查看快件箱';
        this.map.clearOverlays();
        this.map.removeEventListener('click', this.doSelectPosition);
        this.addPositionMarker();
        setTimeout(() => {
          this.convertGPSToBD(this.handTypeInfo.mailboxPost.mailboxLng, this.handTypeInfo.mailboxPost.mailboxLat, (data) => {
            if (data.status === 0) {
              this.map.panTo(data.points[0]);
              this.addMailboxMarker(data.points[0], {
                name: this.handTypeInfo.mailboxPost.mailboxName,
                address: this.handTypeInfo.mailboxPost.mailboxAddress
              });
            }
          });
        }, 100);
      },
      addPositionMarker() {
        if (this.mapLng && this.mapLat) {
          this.positionPoint = new BMap.Point(this.mapLng, this.mapLat);
        }
        this.map.addOverlay(new BMap.Marker(this.positionPoint));
      },
      addMailboxMarker(point, device) {
        let markIcon = new BMap.Icon('../../assets/img/mb_g.png', new BMap.Size(25, 25), {imageSize: new BMap.Size(25, 25)});
        let mark = new BMap.Marker(point, {icon: markIcon});
        this.map.addOverlay(mark);
        let infoWindow = new BMap.InfoWindow(device.name + '<br>地址：' + device.address, {
          width: 320,
          height: 60
        });
        mark.addEventListener('mouseover', e => {
          mark.openInfoWindow(infoWindow);
        });
        return mark;
      },
      closeDialogMap() {
        this.baiduMapVisible = false
        this.mapSearcherVisible = false
        this.searchPlace = ''
      },
      changePostMailbox(val) {
        for (let device of this.closestMailboxList) {
          if (device.id == val) {
            this.handTypeInfo.mailboxPost.mailboxLat = device.lat;
            this.handTypeInfo.mailboxPost.mailboxLng = device.lng;
            this.handTypeInfo.mailboxPost.mailboxName = device.name;
            this.handTypeInfo.mailboxPost.mailboxAddress = device.address;
            break;
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
  .tangram-suggestion {
    z-index: 9999;
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
</style>
