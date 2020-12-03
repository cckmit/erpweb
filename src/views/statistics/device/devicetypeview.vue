<template>
  <div>
    <div v-if="nodataFlag == 1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag == 2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <devicetype-chart :devicechartdata="deviceChartData" />
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

import DevicetypeChart from './components/devicepie'
import DevicetypeTable from '../components/deviceTable'
import { GetTunnelDevices } from '@/api/iot-apis'

export default {
  name: 'DeviceStatisType',
  components: {
    DevicetypeChart, DevicetypeTable
  },
  data() {
    return {
      deviceChartData: {},
      tableDatalist: [],
      nodataFlag: 0,
      allTableLabel: [
        {
          label: '设备类型',
          propname: 'name'
        }, {
          label: '设备数量',
          propname: 'device_count'
        }, {
          label: '在线数',
          propname: 'online_count'
        }, {
          label: '离线数',
          propname: 'offline_count'
        }, {
          label: '不同类型占比',
          propname: 'tunpercent'
        }
      ]
    }
  },
  destroyed() {
  },
  created() {
  },
  mounted() {
    this.getdeviceList()
  },
  methods: {
    getdeviceList() {
      var obj = {
        limit: 0,
        skip: 0,
        q: JSON.stringify({ 'devicestatus': 'OK' })
      }
      GetTunnelDevices(obj).then(res => {
        if (res.items.length !== 0) {
          this.nodataFlag = 2
          this.analyseDevice(res.items)
        } else {
          this.nodataFlag = 1
        }
      })
    },
    analyseDevice(data) {
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
      // charts
      const legendname = []
      const seriesData = []
      var zongnum = 0
      for (var type in typeobj) {
        zongnum = zongnum + typeobj[type].length
        var obj = {
          name: type,
          value: typeobj[type].length
        }
        legendname.push(type)
        seriesData.push(obj)
      }
      var title = {
        text: '不同类型监控设备占比',
        subtext: '设备类型',
        left: 'center'
      }
      this.deviceChartData = { title, legendname, seriesData }
      // table
      this.tableDatalist = []
      for (var table in typeobj) {
        var tableObj = {
          name: table,
          device_count: typeobj[table].length,
          online_count: this.findOnline(typeobj[table]),
          offline_count: this.findOffline(typeobj[table]),
          tunpercent: Math.round(typeobj[table].length / zongnum * 10000) / 100 + '%'
        }
        this.tableDatalist.push(tableObj)
      }
    },
    findOnline(ondata) {
      var onmum = 0
      for (var o of ondata) {
        if (o.logical_device.status === 'OnLine') {
          onmum++
        }
      }
      return onmum
    },
    findOffline(offdata) {
      var offmum = 0
      for (var o of offdata) {
        if (o.logical_device.status === 'OffLine') {
          offmum++
        }
      }
      return offmum
    },
    exportData() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const filterVal = ['name', 'device_count', 'online_count', 'offline_count', 'tunpercent']
        const data = this.formatJson(filterVal, this.tableDatalist)
        excel.export_json_to_excel({
          header: ['设备类型', '设备数量', '在线数', '离线数', '不同类型占比'],
          data,
          filename: '设备类型统计数据',
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
