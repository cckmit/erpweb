<template>
  <div>
    <div v-if="nodataFlag == 1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag == 2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <alert-bar :devicechartdata="alertChartData" />
            <misin-bar :devicechartdata="misinChartData" />
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div>
            <el-button size="mini" style="float:right;" type="primary" icon="el-icon-upload" @click="exportData">
              导出excel
            </el-button>
          </div>
          <devicetype-table :devicetabledata="tableDatalist" :alltablelabel="allTableLabel" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import AlertBar from './components/alertBar'
import MisinBar from './components/misinBar'
import DevicetypeTable from '../components/deviceTable'
import { GetHistoryAlerts } from '@/api/iot-apis'

export default {
  name: 'AlertDevicetypeView',
  components: {
    AlertBar, MisinBar, DevicetypeTable
  },
  props: {
    selecttime: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      alertChartData: {},
      misinChartData: {},
      tableDatalist: [],
      nodataFlag: 0,
      allTableLabel: [
        {
          label: '设备类型',
          propname: 'device_type'
        }, {
          label: '报警数',
          propname: 'alert_num'
        }, {
          label: '报警占比',
          propname: 'alert_percent'
        }, {
          label: '误报数',
          propname: 'misin_num'
        }, {
          label: '误报占比',
          propname: 'misin_percent'
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
      var objdata = {}
      for (var item of data) {
        if (objdata[item.alert_device.cable_type] !== undefined) {
          objdata[item.alert_device.cable_type].push(item)
        } else {
          objdata[item.alert_device.cable_type] = []
          objdata[item.alert_device.cable_type].push(item)
        }
      }
      // chartAlert
      const x_axis = []
      const seriesData = []
      var zongAlertnum = 0
      for (var type in objdata) {
        zongAlertnum = zongAlertnum + objdata[type].length
        var obj = {
          name: objdata[type][0].alert_device.cable_name,
          value: objdata[type].length
        }
        x_axis.push(obj.name)
        seriesData.push(obj)
      }
      this.alertChartData = { x_axis, seriesData }
      // chartMisin
      const x_Maxis = []
      const seriesMData = []
      for (var m in objdata) {
        var mobj = {
          name: objdata[m][0].alert_device.cable_name,
          value: 0
        }
        if (objdata[m].length !== 0) {
          mobj.value = Math.round(this.findShortcut(objdata[m]) / objdata[m].length * 10000) / 100
        }
        x_Maxis.push(mobj.name)
        seriesMData.push(mobj)
      }
      this.misinChartData = { x_Maxis, seriesMData }
      // table
      this.tableDatalist = []
      for (var table in objdata) {
        var tobj = {
          device_type: objdata[table][0].alert_device.cable_name,
          alert_num: objdata[table].length,
          alert_percent: Math.round(objdata[table].length / zongAlertnum * 10000) / 100 + '%',
          misin_num: this.findShortcut(objdata[table]),
          misin_percent: '0%'
        }
        if (objdata[table].length !== 0) {
          tobj.misin_percent = Math.round(this.findShortcut(objdata[table]) / objdata[table].length * 10000) / 100 + '%'
        }
        this.tableDatalist.push(tobj)
      }
    },
    findShortcut(data) {
      var num = 0
      for (var item of data) {
        if (item.short_cut === '误报') {
          num++
        }
      }
      return num
    },
    exportData() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const filterVal = ['device_type', 'alert_num', 'alert_percent', 'misin_num', 'misin_percent']
        const data = this.formatJson(filterVal, this.tableDatalist)
        excel.export_json_to_excel({
          header: ['设备类型', '报警数', '报警占比', '误报数', '误报占比'],
          data,
          filename: '设备报警统计数据（按设备类型）',
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
