<template>
  <div>
    <div v-if="nodataFlag == 1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag == 2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <alerttype-chart :chart-data="panelChartDataAlertType" />
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div>
            <el-button size="mini" style="float:right;" type="primary" icon="el-icon-upload" @click="exportData">
              导出excel
            </el-button>
          </div>
          <alerttype-table :devicetabledata="tableDatalist" :alltablelabel="allTableLabel" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import AlerttypeChart from './components/alerttypeBar'
import AlerttypeTable from '../components/deviceTable'
import { GetHistoryAlerts } from '@/api/iot-apis'

export default {
  name: 'AlertAlertType',
  components: {
    AlerttypeChart, AlerttypeTable
  },
  props: {
    selecttime: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      panelChartDataAlertType: {
        allArrayData: []
      },
      tableDatalist: [],
      nodataFlag: 0,
      allTableLabel: [
        {
          label: '报警级别',
          propname: 'alert_type'
        }, {
          label: '报警数',
          propname: 'alert_num'
        }, {
          label: '级别占比',
          propname: 'alert_percent'
        }
      ]
    }
  },
  watch: {
    selecttime: {
      deep: true,
      handler(val) {
        if (val.length === 0) {
          this.getList('')
        } else {
          this.getList(val)
        }
      }
    }
  },
  created() {
  },
  mounted() {
    this.getList('')
  },
  methods: {
    getList(time) {
      var like = {}
      if (time !== '') {
        like = {
          'triggertime': {
            '$gte': time[0],
            '$lte': time[1]
          }
        }
      }
      var obj = {
        limit: 0,
        skip: 0,
        q: JSON.stringify(like)
      }
      GetHistoryAlerts(obj).then(res => {
        if (res.items.length !== 0) {
          this.nodataFlag = 2
          this.analyseDevice(res.items)
        } else {
          this.nodataFlag = 1
        }
      })
    },
    analyseDevice(data) {
      var redAlert = 0
      var orangeAlert = 0
      var yellowAlert = 0
      var blueAlert = 0
      for (var item of data) {
        if (item.alert_device.alert_info.alert_type === 'red') {
          redAlert++
        }
        if (item.alert_device.alert_info.alert_type === 'orange') {
          orangeAlert++
        }
        if (item.alert_device.alert_info.alert_type === 'yellow') {
          yellowAlert++
        }
        if (item.alert_device.alert_info.alert_type === 'blue') {
          blueAlert++
        }
      }
      // chart
      this.panelChartDataAlertType.allArrayData = []
      this.panelChartDataAlertType.allArrayData.push(redAlert, orangeAlert, yellowAlert, blueAlert)
      // table
      var zongnum = 1
      zongnum = redAlert + orangeAlert + yellowAlert + blueAlert
      this.tableDatalist = []
      var objred = {
        alert_type: '红色告警',
        alert_num: redAlert,
        alert_percent: Math.round(redAlert / zongnum * 10000) / 100 + '%'
      }
      var objO = {
        alert_type: '橙色告警',
        alert_num: orangeAlert,
        alert_percent: Math.round(orangeAlert / zongnum * 10000) / 100 + '%'
      }
      var objY = {
        alert_type: '黄色告警',
        alert_num: yellowAlert,
        alert_percent: Math.round(yellowAlert / zongnum * 10000) / 100 + '%'
      }
      var objB = {
        alert_type: '蓝色告警',
        alert_num: blueAlert,
        alert_percent: Math.round(blueAlert / zongnum * 10000) / 100 + '%'
      }
      this.tableDatalist.push(objred, objO, objY, objB)
    },
    exportData() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const filterVal = ['alert_type', 'alert_num', 'alert_percent']
        const data = this.formatJson(filterVal, this.tableDatalist)
        excel.export_json_to_excel({
          header: ['报警级别', '报警数', '级别占比'],
          data,
          filename: '报警级别统计',
          autoWidth: true
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style scoped>
</style>
