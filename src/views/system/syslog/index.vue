<template>
  <div class="app-container">
    <span class="blue-vertical-bar">系统日志列表&nbsp;&nbsp;</span>
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
    </div>
    <el-card>
      <el-table :data="sysList" border stripe fit>
        <el-table-column label="用户名" prop="user.name" />
        <el-table-column label="角色" prop="user.role" />
        <el-table-column label="组织机构" prop="user.company">
          <template slot-scope="scope">
            <span>{{ scope.row.user.company | changeUndNullShow }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行为">
          <template slot-scope="scope">
            <span>{{ scope.row.operation|translateOperate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { GetSystemLogs } from '@/api/iot-apis'

export default {
  name: 'SystemLogList',
  components: {},
  filters: {
  },
  data() {
    return {
      searchKey: 'user.name',
      searchValue: '',
      selectOptions: [
        {
          key: 0,
          value: 'user.name',
          label: '用户名'
        }
      ],
      listTotalNum: 0,
      currentPage: 1,
      pageSize: 10,
      sysList: []
    }
  },
  watch: {
    searchValue(nval, oval) {
      this.searchUser()
    }
  },
  created() {
  },
  mounted() {
    this.getSysList()
  },
  methods: {
    getSysList() {
      var like = {}
      var obj = {
        limit: this.pageSize,
        skip: this.pageSize * (this.currentPage - 1)
      }
      if (this.searchValue !== '') {
        like[this.searchKey] = { '$regex': this.searchValue, '$options': '$i' }
        obj.q = JSON.stringify(like)
      }
      GetSystemLogs(obj).then(res => {
        this.sysList = res.items
        this.listTotalNum = res.total_count
      })
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSysList()
    },
    searchUser() {
      this.currentPage = 1
      this.getSysList()
    }
  }
}
</script>
<style scoped>
</style>
