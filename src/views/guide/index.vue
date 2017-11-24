<template>
  <el-row>
    <el-col :span="4">
      <div class="menu-title">
        <div class="svg-container"><icon-svg iconClass="department"></icon-svg></div>
        <div class="svg-text">按部门分类</div>
      </div>
      <div class="menu-item">
        <el-menu class="category" mode="vertical">
          <template v-for="item in deptList">
            <el-menu-item :index="item.name" @click="loadItemList(item.id)">{{item.name}}</el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="itemList">
        <ul>
          <li v-for="item in itemList">
            <div class="itemContent">
              <p class="p1">
                <router-link :to="{path: `/guide/detail/${item.id}`}">{{item.name}}</router-link>
              </p>
              <p class="p2">
                办理机构：{{item.implAgency}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;咨询电话：{{item.askPhone}}
              </p>
              <p class="p3">
                <el-button v-if="isFavorite(item.id)" type="primary" @click="removeFavorite(item.id)">取消收藏</el-button>
                <el-button v-else type="primary" @click="appendFavorite(item.id)">收藏</el-button>
              </p>
            </div>
          </li>
        </ul>
      </div>
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
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getItemCategory, getItemPageByCategories } from '../../api/guide'
  import { getAllFavorites, addFavorite, delFavorite } from '../../api/member/favorite'

  export default {
    name: 'service_guide',
    data() {
      return {
        deptList: [],
        itemList: [],
        favoriteList: [],
        currentDeptId: '',
        total: 0,
        page: this.$store.state.app.page,
        pageSize: this.$store.state.app.rows,
        pageSizes: this.$store.state.app.pageSize
      }
    },
    computed: {
      ...mapGetters([
        'token', 'deptCategoryId'
      ])
    },
    created() {
      getItemCategory(this.deptCategoryId).then(response => {
        this.deptList = response.data
        this.loadItemList(response.data[0].id)
      })
      if (this.token) {
        getAllFavorites().then(response => {
          this.favoriteList = response.data
        })
      }
    },
    methods: {
      loadItemList(deptId) {
        this.currentDeptId = deptId
        this.page = 1
        this.pageSize = 10
        this.loadPage()
      },
      loadPage() {
        getItemPageByCategories(this.page, this.pageSize, this.currentDeptId).then(response => {
          this.itemList = response.data.list
          this.total = response.data.total
        })
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
      isFavorite(itemId) {
        if (this.token) {
          for (let favorite of this.favoriteList) {
            if (itemId == favorite.itemId) {
              return true
            }
          }
        }
        return false
      },
      appendFavorite(itemId) {
        if (this.token) {
          addFavorite(itemId).then(response => {
            if (response.httpCode == 200) {
              this.favoriteList.push(response.data)
            }
          })
        } else {
          this.$router.push({path: '/login'})
        }
      },
      removeFavorite(itemId) {
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
  .menu-item {
    .category {
      background: #f2f2f2;
      .el-menu-item {
        height: auto;
        line-height: 40px;
        font-size: 15px;
        text-align: left;
        padding-left: 36px !important;
        border-bottom: 1px solid #e6e6e6;
        white-space: inherit;
      }
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
  .page-container {
    text-align: center;
    margin-top: 16px;
  }
</style>
