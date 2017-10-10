<template>
  <div>
    <div class="data-box">
      <div class="label-bg">
        <div class="label">我的办件</div>
        <div class="more"><router-link :to="{path: '/member/process'}">更多></router-link></div>
      </div>
      <div class="data-bg">
        <process-table :data="processData"></process-table>
      </div>
    </div>
    <div class="data-box">
      <div class="label-bg">
        <div class="label">我的预审</div>
        <div class="more"><router-link :to="{path: '/member/pretrial'}">更多></router-link></div>
      </div>
      <div class="data-bg">
        <pretrial-table :data="pretrialData"></pretrial-table>
      </div>
    </div>
    <div class="data-box">
      <div class="label-bg">
        <div class="label">我的收藏</div>
        <div class="more"><router-link :to="{path: '/member/collection'}">更多></router-link></div>
      </div>
      <div class="data-bg">
        <collection-table :data="collectionData" :handle-remove="removeFavorite"></collection-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { ProcessTable, PretrialTable, CollectionTable } from './table'
  import { mapGetters } from 'vuex'
  import { getMyItem } from '../../api/member/member'
  import { delFavorite } from '../../api/member/favorite'

  export default {
    components: {
      ProcessTable, PretrialTable, CollectionTable
    },
    data() {
      return {
        pretrialData: [],
        collectionData: [],
        processData: []
      }
    },
    computed: {
      ...mapGetters([
        'id'
      ])
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        getMyItem(this.id).then(response => {
          console.log('myItems:', response)
          if (response.httpCode == 200) {
            this.pretrialData = response.data.pretrialList
            this.collectionData = response.data.favoriteList
            this.processData = response.data.processList
          } else {
            this.$message.error('数据加载失败')
          }
        })
      },
      removeFavorite(row) {
        delFavorite(row.id).then(response => {
          if (response.httpCode == 200) {
            this.init()
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
      .more {
        float: right;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
      }
    }
    .data-bg {
      padding: 16px;
      min-height: 100px;
      overflow: hidden;
    }
  }
</style>
