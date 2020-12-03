<template>
  <div>
    <div v-if="nodataFlag == 1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag == 2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <!-- <div style="height:300px">在线设备折线图（在线率）</div> -->
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

import DevicePie from '../monitor-range/components/chartpie'
import DeviceTable from '../components/deviceTable'
import { GetTunnelDevices } from '@/api/iot-apis'

export default {
  name: 'RunningOnDevice',
  components: {
    DeviceTable, DevicePie
  },
  props: {
    type: {
      type: String,
      default: function() {
        return 'on'
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
          label: '数量',
          propname: 'count'
        }, {
          label: '设备占比',
          propname: 'percent'
        }
      ],
      title: {
        OnLine: '在线',
        OffLine: '离线'
      }
    }
  },
  watch: {
    type(val) {
      this.getList(val)
    }
  },
  destroyed() {
  },
  created() {
  },
  mounted() {
    this.getList(this.type)
  },
  methods: {
    getList(val) {
      var obj = {
        limit: 0,
        skip: 0,
        q: JSON.stringify({ 'devicestatus': 'OK' })
      }
      GetTunnelDevices(obj).then(res => {
        if (res.items.length !== 0) {
          this.nodataFlag = 2
          this.analyseOffDevice(res.items, val)
        } else {
          this.nodataFlag = 1
        }
      }).catch(() => {
        this.nodataFlag = 1
      })
    },
    analyseOffDevice(data, status) {
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
      var title = {
        text: `${this.title[status]}设备占比`,
        subtext: '设备类型',
        left: 'center'
      }
      const seriesName = `${this.title[status]}设备数`
      // table
      this.tableDatalist = []

      for (const type in typeobj) {
        const cs = this.findline(typeobj[type], status)
        const obj = {
          name: type,
          value: cs
        }
        if (obj.value !== 0) {
          legendname.push(type)
          seriesData.push(obj)
        }
        if (seriesData.length === 0) {
          this.nodataFlag = 1
        } else {
          this.nodataFlag = 2
          const tableObj = {
            device_type: type,
            count: cs,
            percent: '0%'
          }
          tableObj.percent = Math.round(cs / data.length * 10000) / 100 + '%'
          this.tableDatalist.push(tableObj)
          this.deviceChartData = { title, legendname, seriesData, seriesName }
        }
      }
    },
    findline(data, status) {
      var num = 0
      for (var o of data) {
        if (o.logical_device.status === status) {
          num++
        }
      }
      return num
    },
    exportData() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const filterVal = ['device_type', 'count', 'percent']
        const data = this.formatJson(filterVal, this.tableDatalist)
        excel.export_json_to_excel({
          header: ['设备类型', '数量', '设备占比'],
          data,
          filename: `设备${this.title[this.type]}数据统计`,
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
