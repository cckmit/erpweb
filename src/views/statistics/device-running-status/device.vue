<template>
  <div>
    <div v-if="nodataFlag == 1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag == 2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <device-pie :devicechartdata="deviceChartData" />
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
import { GetTunnelDevices } from '@/api/iot-apis'

export default {
  name: 'RunningDevice',
  components: {
    DeviceTable, DevicePie
  },
  props: {
    tunnelname: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      deviceChartData: {},
      tableDatalist: [],
      nodataFlag: 0,
      allTableLabel: [
        {
          label: '设备类型',
          propname: 'device_type'
        }, {
          label: '设备总数',
          propname: 'device_count'
        }, {
          label: '在线数',
          propname: 'on_count'
        }, {
          label: '离线数',
          propname: 'off_count'
        }, {
          label: '故障数',
          propname: 'break_count'
        }, {
          label: '在线率',
          propname: 'on_percent'
        }
      ]
    }
  },
  watch: {
    tunnelname(val) {
      this.getList(val)
    }
  },
  destroyed() {
  },
  created() {
  },
  mounted() {
    this.getList(this.tunnelname)
  },
  methods: {
    getList(val) {
      if (val === '') {
        var obj = {
          limit: 0,
          skip: 0
        }
      } else {
        obj = {
          limit: 0,
          skip: 0,
          q: JSON.stringify({ 'tunnel.tunnelname': val })
        }
      }
      GetTunnelDevices(obj).then(res => {
        if (res.items.length !== 0) {
          this.nodataFlag = 2
          // charts
          this.analyseDevice(res.items)
          // table
          this.analyseDeviceType(res.items)
        } else {
          this.nodataFlag = 1
        }
      }).catch(() => {
        this.nodataFlag = 1
      })
    },
    analyseDevice(data) {
      const legendname = ['设备故障', '设备在线', '设备离线']
      const seriesData = []
      var breakNum = 0
      var onNum = 0
      var offNum = 0
      breakNum = this.findBreakline(data)
      onNum = this.findOnline(data)
      offNum = this.findOffline(data)
      var breakObj = {
        name: '设备故障',
        value: breakNum
      }
      var onObj = {
        name: '设备在线',
        value: onNum
      }
      var offObj = {
        name: '设备离线',
        value: offNum
      }
      seriesData.push(breakObj, onObj, offObj)
      var title = {
        text: '设备运行状态分布',
        subtext: '设备状态',
        left: 'center'
      }
      this.deviceChartData = { title, legendname, seriesData }
    },
    findBreakline(data) {
      var bnum = 0
      for (var item of data) {
        if (item.device_status !== 'OK') {
          bnum++
        }
      }
      return bnum
    },
    findOnline(ondata) {
      var onmum = 0
      for (var o of ondata) {
        if (o.logical_device.status === 'OnLine' && o.device_status === 'OK') {
          onmum++
        }
      }
      return onmum
    },
    findOffline(offdata) {
      var offmum = 0
      for (var o of offdata) {
        if (o.logical_device.status === 'OffLine' && o.device_status === 'OK') {
          offmum++
        }
      }
      return offmum
    },
    analyseDeviceType(data) {
      var typeobj = {}
      for (var m of data) {
        if (m.device_relation.device_group_type !== undefined && m.device_attribute.cable_id !== undefined) {
          if (typeobj[m.device_relation.device_group_type] !== undefined) {
            typeobj[m.device_relation.device_group_type].push(m)
          } else {
            typeobj[m.device_relation.device_group_type] = []
            typeobj[m.device_relation.device_group_type].push(m)
          }
        }
      }
      this.tableDatalist = []
      for (var s in typeobj) {
        var obj = {
          device_type: s,
          device_count: typeobj[s].length,
          on_count: this.findOnline(typeobj[s]),
          off_count: this.findOffline(typeobj[s]),
          break_count: this.findBreakline(typeobj[s]),
          on_percent: Math.round(this.findOnline(typeobj[s]) / typeobj[s].length * 10000) / 100 + '%'
        }
        this.tableDatalist.push(obj)
      }
    },
    exportData() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const filterVal = ['device_type', 'device_count', 'on_count', 'off_count', 'break_count', 'on_percent']
        const data = this.formatJson(filterVal, this.tableDatalist)
        excel.export_json_to_excel({
          header: ['设备类型', '设备总数', '在线数', '离线数', '故障数', '在线率'],
          data,
          filename: `设备运行状态数据统计`,
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
