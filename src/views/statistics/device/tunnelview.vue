<template>
  <div>
    <div v-if="nodataFlag == 1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag == 2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <tunnel-chart :devicechartdata="deviceChartDataTunel" />
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div>
            <el-button size="mini" style="float:right;" type="primary" icon="el-icon-upload" @click="exportData">
              导出excel
            </el-button>
          </div>
          <tunnel-table :devicetabledata="tableDatalist" :alltablelabel="allTableLabel" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import TunnelChart from './components/devicepie'
import TunnelTable from '../components/deviceTable'
import { GetTunnelDevices } from '@/api/iot-apis'

export default {
  name: 'DeviceStatisTunnel',
  components: {
    TunnelChart, TunnelTable
  },
  data() {
    return {
      deviceChartDataTunel: {},
      tableDatalist: [],
      nodataFlag: 0,
      allTableLabel: [
        {
          label: '隧道名称',
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
          label: '隧道内占比',
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
      // charts
      const legendname = []
      const seriesData = []
      var zongnum = 0
      for (var tun in objdata) {
        zongnum = zongnum + objdata[tun].length
        var obj = {
          name: tun,
          value: objdata[tun].length
        }
        legendname.push(tun)
        seriesData.push(obj)
      }
      var title = {
        text: '监控前端设备统计',
        subtext: '隧道设备',
        left: 'center'
      }
      this.deviceChartDataTunel = { title, legendname, seriesData }
      // table
      this.tableDatalist = []
      for (var table in objdata) {
        var tableObj = {
          name: table,
          device_count: objdata[table].length,
          online_count: this.findOnline(objdata[table]),
          offline_count: this.findOffline(objdata[table]),
          tunpercent: Math.round(objdata[table].length / zongnum * 10000) / 100 + '%'
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
          header: ['隧道名称', '设备数量', '在线数', '离线数', '隧道内占比'],
          data,
          filename: '隧道设备统计数据',
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
