<template>
  <div class="app-container">
    <span class="blue-vertical-bar">操作日志列表&nbsp;&nbsp;</span>
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
      <el-table :data="operaList" border stripe fit>
        <el-table-column label="隧道" prop="base_info.tunnel_name" />
        <el-table-column label="线路" prop="base_info.route_name">
          <template slot-scope="scope">
            <span>{{ scope.row.base_info.route_name | changeUndNullShow }}</span>
          </template>
        </el-table-column>
        <el-table-column label="监控点" prop="base_info.splice_name" />
        <el-table-column label="设备" prop="base_info.device_name" />
        <el-table-column label="操作人" prop="operater" />
        <el-table-column label="操作内容">
          <template slot-scope="scope">
            <span>{{ scope.row.operate | changeOperateShow }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            <span>{{ scope.row.updated_at | changeTimeShow }}</span>
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
import { GetOperateLogs } from '@/api/iot-apis'

export default {
  name: 'OperationLogList',
  components: {},
  filters: {
    changeOperateShow(val) {
      var ret = ''
      if (val === 'Delete Attribute') {
        ret = '此属性被删除'
      } else if (val === 'Modify Attribute') {
        ret = '此属性信息被更改'
      } else if (val === 'Delete Device') {
        ret = '此设备被删除'
      } else if (val === 'Modify Device') {
        ret = '此设备信息被更改'
      } else {
        ret = ''
      }
      return ret
    }
  },
  data() {
    return {
      searchKey: 'baseinfo.tunnelname',
      searchValue: '',
      selectOptions: [
        {
          key: 0,
          value: 'baseinfo.tunnelname',
          label: '隧道名'
        },
        {
          key: 1,
          value: 'baseinfo.routename',
          label: '线路名'
        },
        {
          key: 2,
          value: 'baseinfo.devicename',
          label: '设备名'
        }
      ],
      listTotalNum: 0,
      currentPage: 1,
      pageSize: 10,
      operaList: []
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
    this.getOperaList()
  },
  methods: {
    getOperaList() {
      var like = {}
      var obj = {
        limit: this.pageSize,
        skip: this.pageSize * (this.currentPage - 1),
        q: ''
      }
      like[this.searchKey] = { '$regex': this.searchValue, '$options': '$i' }
      obj.q = JSON.stringify(like)
      GetOperateLogs(obj).then(res => {
        this.operaList = res.items
        this.listTotalNum = res.total_count
      })
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOperaList()
    },
    searchUser() {
      this.currentPage = 1
      this.getOperaList()
    }
  }
}
</script>
<style scoped>
</style>
