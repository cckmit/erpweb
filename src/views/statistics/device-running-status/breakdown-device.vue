<template>
  <div>
    <div v-if="nodataFlag==1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag==2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <device-pie v-if="type=='type'" :devicechartdata="deviceChartData" />
            <tunnel-bar v-if="type=='tunnel'" :devicechartdata="deviceBarData" />

          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div>
            <el-button size="mini" style="float:right;" type="primary" icon="el-icon-upload" @click="exportData">
              导出excel
            </el-button>
          </div>
          <device-table :devicetabledata="tableDatalist" :alltablelabel="allTableLabel" :height="'calc(72vh - 60px)'" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import DevicePie from '../device/components/devicepie'
import DeviceTable from '../components/deviceTable'
import { GetTypeMalfunctions, GetTunMalfunctions } from '@/api/iot-apis'
import TunnelBar from './components/breaktunnelbar'

export default {
  name: 'RunningBreakDeviceType',
  components: {
    DeviceTable, DevicePie, TunnelBar
  },
  props: {
    selecttime: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: function() {
        return 'type'
      }
    }
  },
  data() {
    return {
      deviceChartData: {},
      deviceBarData: {},
      tableDatalist: [],
      nodataFlag: 0,
      allTableLabel: [
        {
          label: '设备类型',
          propname: 'device_type'
        }, {
          label: '故障数',
          propname: 'break_num'
        }, {
          label: '故障占比',
          propname: 'break_percent'
        }
      ]
    }
  },
  watch: {
    selecttime: {
      deep: true,
      handler(val) {
        this.getList(val)
      }
    },
    type(val) {
      this.getList('')
    }
  },
  destroyed() {
  },
  created() {
  },
  mounted() {
    this.getList('')
  },
  methods: {
    getList(val) {
      if (this.type === 'type') {
        this.getTypeList(val)
        this.allTableLabel[0] = {
          label: '设备类型',
          propname: 'device_type'
        }
      } else if (this.type === 'tunnel') {
        this.allTableLabel[0] = {
          label: '隧道名称',
          propname: 'tunnel_name'
        }
        this.getTunnelList(val)
      }
    },
    getTypeList(time) {
      var like = {}
      if (time !== '') {
        like = {
          'time': time
        }
      }
      var obj = {
        limit: 0,
        skip: 0,
        q: JSON.stringify(like)
      }
      GetTypeMalfunctions(obj).then(res => {
        if (res.items.length !== 0) {
          this.nodataFlag = 2
          this.analyseDevice(res.items)
        } else {
          this.nodataFlag = 1
        }
      }).catch(() => {
        this.nodataFlag = 1
      })
    },
    analyseDevice(data) {
      const legendname = []
      const seriesData = []
      this.tableDatalist = []
      for (var item of data) {
        var obj = {
          name: item.device_type,
          value: item.count
        }
        legendname.push(obj.name)
        seriesData.push(obj)
        var tableObj = {
          device_type: item.device_type,
          break_num: item.count,
          break_percent: this.findPercent(data, item.count)
        }
        this.tableDatalist.push(tableObj)
      }
      var title = {
        text: '设备类型故障占比',
        subtext: '',
        left: 'center'
      }
      this.deviceChartData = { title, legendname, seriesData }
    },

    findPercent(data, count) {
      var Sum = 0
      for (var item of data) {
        Sum += item.count
      }
      if (Sum !== 0) {
        return Math.round(count / Sum * 10000) / 100 + '%'
      } else {
        return '0%'
      }
    },
    getTunnelList(time) {
      var like = {}
      if (time !== '') {
        like = {
          'time': time
        }
      }
      var obj = {
        limit: 0,
        skip: 0,
        q: JSON.stringify(like)
      }
      GetTunMalfunctions(obj).then(res => {
        if (res.items.length !== 0) {
          this.nodataFlag = 2
          this.analyseTunnelDevice(res.items)
        } else {
          this.nodataFlag = 1
        }
      }).catch(() => {
        this.nodataFlag = 1
      })
    },
    analyseTunnelDevice(data) {
      const x_axis = []
      const seriesData = []
      this.tableDatalist = []
      for (var item of data) {
        var obj = {
          name: item.tunnel_name,
          value: item.count
        }
        x_axis.push(obj.name)
        seriesData.push(obj)
        var tableObj = {
          tunnel_name: item.tunnel_name,
          break_num: item.count,
          break_percent: this.findPercent(data, item.count)
        }
        this.tableDatalist.push(tableObj)
      }
      this.deviceBarData = { x_axis, seriesData }
    },
    exportData() {
      const keys = this.allTableLabel.map((item) => {
        return item.label
      })
      const values = this.allTableLabel.map((item) => {
        return item.propname
      })
      import('@/vendor/Export2Excel').then(async(excel) => {
        const data = this.formatJson(values, this.tableDatalist)
        excel.export_json_to_excel({
          header: keys,
          data,
          filename: '故障设备统计数据',
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
