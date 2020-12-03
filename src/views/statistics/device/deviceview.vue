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
          <alldevice-table :devicetabledata="tableDatalist" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import DevicetypeChart from './components/devicepie'
import AlldeviceTable from './components/deviceAlltable'
import { GetTunnelDevices } from '@/api/iot-apis'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import XLSX from 'xlsx'

export default {
  name: 'DeviceStatisZong',
  components: {
    DevicetypeChart, AlldeviceTable
  },
  data() {
    return {
      deviceChartData: {},
      tableDatalist: [],
      nodataFlag: 0
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
          this.analyseDeviceType(res.items)
          this.analyseDevice(res.items)
        } else {
          this.nodataFlag = 1
        }
      })
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
    },
    analyseDevice(data) {
      const objdata = {}
      for (const item of data) {
        if (item.tunnel.tunnel_name !== undefined && item.device_attribute.cable_id !== undefined) {
          if (objdata[item.tunnel.tunnel_name] !== undefined) {
            objdata[item.tunnel.tunnel_name].push(item)
          } else {
            objdata[item.tunnel.tunnel_name] = []
            objdata[item.tunnel.tunnel_name].push(item)
          }
        }
      }
      var tunList = []
      for (var s in objdata) {
        var tunobj = {
          name: s,
          typenamelist: this.findType(objdata[s])
        }
        tunList.push(tunobj)
      }
      // table数据
      this.tableDatalist = []
      for (var tablei of tunList) {
        for (var tablej of tablei.typenamelist) {
          var objtable = {
            name: tablei.name,
            typeName: tablej.typeName,
            device_count: tablej.device_count,
            all_count: this.findAll(tablei.typenamelist),
            tunnel_percent: Math.round(this.findAll(tablei.typenamelist) / data.length * 10000) / 100 + '%'
          }
          this.tableDatalist.push(objtable)
        }
      }
    },
    findType(data) {
      var typeobj = {}
      for (var m of data) {
        if (typeobj[m.device_relation.device_group_type] !== undefined) {
          typeobj[m.device_relation.device_group_type].push(m)
        } else {
          typeobj[m.device_relation.device_group_type] = []
          typeobj[m.device_relation.device_group_type].push(m)
        }
      }
      var typeList = []
      for (var s in typeobj) {
        var tunobj = {
          typeName: s,
          device_count: typeobj[s].length
        }
        typeList.push(tunobj)
      }
      return typeList
    },
    findAll(data) {
      var allDevicenumber = 0
      for (var item of data) {
        allDevicenumber = allDevicenumber + item.device_count
      }
      return allDevicenumber
    },
    exportData() { // 导出表格数据
      var dataObj = {}
      for (const item of this.tableDatalist) {
        if (dataObj[item.name] === undefined) {
          dataObj[item.name] = [item]
        } else {
          dataObj[item.name].push(item)
        }
      }
      const results = []
      var cellList = []
      var row = 1
      for (const key in dataObj) {
        if (dataObj[key].length > 1) {
          const name = {
            s: { c: 0, r: row },
            e: { c: 0, r: row + dataObj[key].length - 1 }
          }
          const count = {
            s: { c: 3, r: row },
            e: { c: 3, r: row + dataObj[key].length - 1 }
          }
          const countpercent = {
            s: { c: 4, r: row },
            e: { c: 4, r: row + dataObj[key].length - 1 }
          }
          cellList.push(name)
          cellList.push(count)
          cellList.push(countpercent)
          row += dataObj[key].length
        }
        for (const item of dataObj[key]) {
          const arr = []
          for (const ok in item) {
            arr.push(item[ok])
          }
          results.push(arr)
        }
      }
      const merges = cellList.map(x => {
        return XLSX.utils.encode_range(x)
      })
      const obj = {
        header: ['隧道名称', '设备类型', '设备数量', '总计', '隧道占比'],
        merges: merges,
        data: results,
        filename: '设备统计数据总'
      }
      export_json_to_excel(obj)
    }
  }
}
</script>
<style scoped>
</style>
