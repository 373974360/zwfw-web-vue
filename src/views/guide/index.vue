<template>
  <el-row>
    <el-col :span="4">
      <div class="menu-title">
        <div class="svg-container"><icon-svg iconClass="department"></icon-svg></div>
        <div class="svg-text">按部门分类</div>
      </div>
      <el-menu class="category" mode="vertical">
        <template v-for="item in deptList">
          <el-menu-item :index="item.id" @click="loadItemList(item.id)">{{item.name}}</el-menu-item>
        </template>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <div class="itemList">
        <ul>
          <li v-for="item in itemList">
            <!--<p>{{item.serviceName}}</p>-->
            <div class="itemContent">
              <p class="p1">
                <router-link :to="{path: `/guide/detail/${item.id}`}">{{item.name}}</router-link>
              </p>
              <p class="p2">
                办理机构：{{item.departmentName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;咨询电话：{{item.tellphone}}
              </p>
              <p class="p3">
                <el-button v-if="isFavorite(item.id)" type="primary" @click="removeFavorite(item.id)">取消收藏</el-button>
                <el-button v-else type="primary" @click="appendFavorite(item.id)">收藏</el-button>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="pageTool">
        <el-button size="small">首页</el-button>
        <el-button size="small">上一页</el-button>
        <el-button size="small" @click="nextPage">下一页</el-button>
        <el-button size="small">末页</el-button>
        <span class="span">共 {{total}} 条记录</span>
        <span class="span">
          跳转到
          <!--<el-select v-model="currentPage" size="small">-->
            <!--<el-option></el-option>-->
          <!--</el-select>-->
          页
        </span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { getDeptCategoryByPid, getItemListByDept, getAllFavorites, addFavorite, delFavorite } from '../../api/guide'
  import { mapGetters } from 'vuex'

  export default {
    name: 'service_guide',
    data() {
      return {
        deptList: [],
        itemList: [],
        favoriteList: [],
        currentDeptId: '',
        total: 0,
        page: 1,
        pageSize: 6,
        currentPage: 1
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ]),
      totalPage() {
        if (this.total == 0) {
          return 1;
        }
        return parseInt((this.total + this.pageSize - 1) / this.pageSize);
      },
      offset() {
        return (this.page - 1) * this.pageSize;
      },
      limit() {
        return this.pageSize;
      },
      isFirstPage() {
        return this.page == 1;
      },
      isLastPage() {
        return this.page === this.totalPage;
      }
    },
    created() {
      getDeptCategoryByPid(1).then(response => {
        console.log(response)
        this.deptList = response.data
        this.loadItemList(response.data[0].id)
      })
      getAllFavorites().then(response => {
        console.log('all favorite')
        console.log(response)
        this.favoriteList = response.data
      })
    },
    methods: {
      loadItemList(deptId) {
        this.currentDeptId = deptId
        this.page = 1
        this.pageSize = 6
        this.loadPage()
      },
      nextPage() {
        if (this.page < this.totalPage) {
          this.page++
          this.loadPage()
        }
      },
//      todo 引用el分页
      loadPage() {
        getItemListByDept(this.offset, this.pageSize, this.currentDeptId).then(response => {
          console.log(response)
          this.itemList = response.rows
          this.total = response.total
        })
      },
      isFavorite(itemId) {
        if (this.token) {
          for (var i = 0; i < this.favoriteList.length; i++) {
            if (itemId == this.favoriteList[i].itemId) {
              return true
            }
          }
        }
        return false
      },
      appendFavorite(itemId) {
        if (this.token) {
          addFavorite(itemId).then(response => {
            if (response.status == 200) {
              this.favoriteList.push({itemId: itemId})
            }
          })
        } else {
          this.$router.push({path: '/login'})
        }
      },
      removeFavorite(itemId) {
        if (this.token) {
          delFavorite(itemId).then(response => {
            if (response.status == 200) {
//              todo 从列表中移除
            }
          })
        } else {
          this.$router.push({path: '/login'})
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .menu-title {
    height: 60px;
    font-size: 16px;
    font-weight: bold;
    background: #e6eaef;
    color: #29588c;
    padding: 12px;
    div {
      float: left;
    }
    .svg-container {
      width: 33px;
      margin-left: 10px;
      .svg-icon {
        width: 2em !important;
        height: 2em !important;
      }
    }
    .svg-text {
      line-height: 38px;
      padding-left: 12px;
    }
  }
  .category {
    background: #f2f2f2;
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      text-align: left;
      padding-left: 36px !important;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .itemList {
    padding-left: 30px;
    ul {
      list-style: none;
      margin: 0;
      padding-left: 0;
      li {
        position: relative;
        border-bottom: 1px dashed #cccccc;
        .itemContent {
          padding: 9px;
          .p1 {
            font-size: 16px;
            color: #2b2b2b;
          }
          .p2 {
            font-size: 12px;
            color: #919191;
          }
          .p3 {
            float: right;
            position: absolute;
            top: 16px;
            right: 20px;
          }
        }
      }
    }
  }
  .pageTool {
    text-align: center;
    padding: 10px 0;
    margin: 10px 0;
    font-size: 14px;
    .span {
      margin-left: 10px;
      .el-select {
        width: 60px;
      }
    }
  }
</style>
