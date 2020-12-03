<template>
  <div class="app-container">
    <span class="blue-vertical-bar">收件箱&nbsp;&nbsp;</span>
    <hr class="black-line">
    <div class="filter-container">
      <el-select v-model="searchKey" placeholder="全部" class="filter-item" style="width: 140px">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="searchValue"
        placeholder="请输入搜索内容"
        style="width: 200px;"
        class="filter-item"
        clearable
      />
      <el-button class="filter-item" type="primary" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-card>
      <el-table :data="dataList" border stripe fit>
        <el-table-column property="sender" label="发件人" />
        <el-table-column property="sendPhone" label="发送号码" />
        <el-table-column property="targetPhone" label="目标号码" />
        <el-table-column property="message_content" label="短信内容" />
        <el-table-column label="接收时间">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="listTotalNum"
        :current-page="currentPage"
        :page-size="pageSize"
        class="table-page"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Inboxlist',
  components: { },
  data() {
    return {
      searchKey: 'messagecontent',
      searchValue: '',
      selectOptions: [
        {
          key: 0,
          value: 'messagecontent',
          label: '短信内容'
        },
        {
          key: 1,
          value: 'sendPhone',
          label: '发送号码'
        }
      ],
      listTotalNum: 0,
      currentPage: 1,
      pageSize: 10,
      dataList: []
    }
  },
  watch: {

  },
  created() {
    this.getInboxList()
  },
  methods: {
    getInboxList() {
      // var like = {}
      // var obj = {
      //   limit: this.pageSize,
      //   skip: this.pageSize * (this.currentPage - 1)
      // }
      // like[this.searchKey] = { '$regex': this.searchValue, '$options': '$i' }
      // obj.q = JSON.stringify(like)
      // (obj).then(res => {
      //   this.dataList = res.items
      //   this.listTotalNum = res.total_count
      // })
    },
    handleFilter() {
      this.currentPage = 1
      this.getInboxList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getInboxList()
    }
  }
}
</script>
<style scoped>
</style>
