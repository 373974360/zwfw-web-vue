<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">我的收藏</div>
    </div>
    <div class="data-bg">
      <collection-table :data="collectionData" :handle-remove="removeFavorite"></collection-table>
      <div class="page-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="prev, pager, next, total, sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { CollectionTable } from './table'
  import { getFavoritePage, delFavorite } from '../../api/member/favorite'

  export default {
    components: {
      CollectionTable
    },
    data() {
      return {
        collectionData: [],
        page: this.$store.state.app.page,
        pageSize: 10,
        total: 0
      }
    },
    computed: {
      offset() {
        return (this.page - 1) * this.pageSize
      }
    },
    created() {
      this.loadPage()
    },
    methods: {
      loadPage() {
        getFavoritePage(this.page, this.pageSize).then(response => {
          if (response.httpCode == 200) {
            this.collectionData = response.data.list
            this.total = response.data.total
          }
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
      removeFavorite(row) {
        delFavorite(row.id).then(response => {
          if (response.httpCode == 200) {
            loadPage()
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
      .page-container {
        text-align: center;
        margin-top: 16px;
      }
    }
  }
</style>
