<template>
  <div class="app-container">
    <span class="blue-vertical-bar">发件箱&nbsp;&nbsp;</span>
    <hr class="black-line">
    <div class="filter-container">
      <span class="filter-item" style="font-size:15px;color:#303133;">发送时间：</span>
      <el-date-picker
        v-model="startTime"
        :clearable="false"
        type="datetime"
        value-format="timestamp"
        format="yyyy-MM-dd HH:mm:ss"
        placeholder="开始时间"
        class="filter-item"
      />
      <el-date-picker
        v-model="endTime"
        :clearable="false"
        type="datetime"
        value-format="timestamp"
        format="yyyy-MM-dd HH:mm:ss"
        placeholder="结束时间"
        class="filter-item"
      />
      <el-input
        v-model="messagecontent"
        placeholder="短信内容"
        style="width: 200px;"
        class="filter-item"
        clearable
      />
      <el-button class="filter-item" type="primary" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" type="info" @click="handleClear">
        清空
      </el-button>
    </div>
    <el-card>
      <el-table :data="dataList" border fit>
        <el-table-column property="sender" label="收件人" />
        <el-table-column property="target_number" label="目标号码" />
        <el-table-column property="message_content" label="短信内容" min-width="300" />
        <el-table-column label="发送时间">
          <template slot-scope="scope">
            <span>{{ scope.row.send_time | changeTimeShow }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发送状态" align="center">
          <template slot-scope="scope">
            <el-button :type="scope.row.send_status | changeTypeshow" :disabled="scope.row.send_status !== '发送失败'" size="small" @click="sendFailureInfo(scope.row)">{{ scope.row.send_status }}</el-button>
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
    <!-- 失败信息弹出框 -->
    <el-dialog title="发送失败原因详情" :visible.sync="dialogVisible" top="11vh">
      <el-table :data="failureData" border>
        <el-table-column property="desc" label="失败情况" />
        <el-table-column property="content" label="失败内容" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { GetOutBoxMessages } from '@/api/iot-apis'

export default {
  name: 'Sendboxlist',
  components: { },
  filters: {
    changeTypeshow(val) {
      var ret = val
      if (val === '发送成功') {
        ret = 'success'
      } else if (val === '发送失败') {
        ret = 'danger'
      } else {
        ret = 'primary'
      }
      return ret
    }
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      messagecontent: '',
      listTotalNum: 0,
      currentPage: 1,
      pageSize: 10,
      dataList: [],
      dialogVisible: false,
      failureData: []
    }
  },
  watch: {
  },
  created() {
    this.getMessageList()
  },
  methods: {
    getMessageList() {
      var obj = {
        limit: this.pageSize,
        skip: this.pageSize * (this.currentPage - 1)
      }
      var like = {}
      if (this.messagecontent !== '' && this.startTime === '' && this.endTime === '') {
        like['messagecontent'] = { '$regex': this.messagecontent, '$options': '$i' }
      } else if (this.messagecontent !== '' && this.startTime !== '' && this.endTime === '') {
        like = {
          'messagecontent': { '$regex': this.messagecontent, '$options': '$i' },
          'sendtime': {
            '$gte': this.startTime / 1000
          }
        }
      } else if (this.messagecontent !== '' && this.startTime === '' && this.endTime !== '') {
        like = {
          'messagecontent': { '$regex': this.messagecontent, '$options': '$i' },
          'sendtime': {
            '$lte': this.endtime / 1000
          }
        }
      } else if (this.messagecontent !== '' && this.startTime !== '' && this.endTime !== '') {
        like = {
          'messagecontent': { '$regex': this.messagecontent, '$options': '$i' },
          'sendtime': {
            '$gte': this.startTime / 1000,
            '$lte': this.endTime / 1000
          }
        }
      } else if (this.messagecontent === '' && this.startTime !== '' && this.endTime === '') {
        like = {
          'sendtime': {
            '$gte': this.startTime / 1000
          }
        }
      } else if (this.messagecontent === '' && this.startTime === '' && this.endTime !== '') {
        like = {
          'sendtime': {
            '$lte': this.endTime / 1000
          }
        }
      } else if (this.messagecontent === '' && this.startTime !== '' && this.endTime !== '') {
        like = {
          'sendtime': {
            '$gte': this.startTime / 1000,
            '$lte': this.endTime / 1000
          }
        }
      }
      var lastlike = Object.assign({}, like, { 'sendstatus': { '$ne': '未发送' }})
      obj.q = JSON.stringify(lastlike)
      GetOutBoxMessages(obj).then(res => {
        this.dataList = res.items
        this.listTotalNum = res.total_count
      })
    },
    handleFilter() {
      this.currentPage = 1
      this.getMessageList()
    },
    handleClear() {
      this.startTime = ''
      this.endTime = ''
      this.messagecontent = ''
      this.handleFilter()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getMessageList()
    },
    sendFailureInfo(row) {
      this.dialogVisible = true
      if (row.info !== undefined) {
        var arrayData = row.info.split(';')
        this.failureData = [
          {
            desc: '',
            content: ''
          }
        ]
        this.failureData[0].desc = arrayData[0].split(':')[0]
        this.failureData[0].content = arrayData[0].split(':')[1]
      } else {
        this.failureData = []
      }
    }
  }
}
</script>
<style scoped>
</style>
