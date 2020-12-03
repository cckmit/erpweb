<template>
  <div>
    <div v-if="nodataFlag == 1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag == 2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <tunnel-chart :devicechartdata="deviceChartData" />
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

import TunnelChart from './components/chartpie'
import TunnelTable from '../components/deviceTable'
import { GetTunnels } from '@/api/iot-apis'

export default {
  name: 'MonitorRangeTunnel',
  components: {
    TunnelChart, TunnelTable
  },
  data() {
    return {
      deviceChartData: {},
      tableDatalist: [],
      nodataFlag: 0,
      allTableLabel: [
        {
          label: '隧道名称',
          propname: 'tunnel_name'
        }, {
          label: '里程数',
          propname: 'mileage'
        }, {
          label: '里程占比',
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
    this.getList()
  },
  methods: {
    getList() {
      var obj = {
        limit: 0,
        skip: 0
      }
      GetTunnels(obj).then(res => {
        if (res.items.length !== 0) {
          this.nodataFlag = 2
          this.analyseDevice(res.items)
        } else {
          this.nodataFlag = 1
        }
      })
    },
    analyseDevice(data) {
      // charts
      const legendname = []
      const seriesData = []
      var zongnum = 0
      for (var item of data) {
        zongnum = zongnum + Number(item.mileage)
        var obj = {
          name: item.tunnel_name,
          value: item.mileage
        }
        legendname.push(obj.name)
        seriesData.push(obj)
      }
      var title = {
        text: '电缆隧道里程统计',
        subtext: '隧道里程',
        left: 'center'
      }
      const seriesName = '里程数(km)'
      this.deviceChartData = { title, legendname, seriesData, seriesName }
      // table
      this.tableDatalist = []
      for (var table of data) {
        var tableObj = {
          tunnel_name: table.tunnel_name,
          mileage: table.mileage + 'km',
          tunpercent: Math.round(Number(table.mileage) / zongnum * 10000) / 100 + '%'
        }
        this.tableDatalist.push(tableObj)
      }
    },
    exportData() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const filterVal = ['tunnel_name', 'mileage', 'tunpercent']
        const data = this.formatJson(filterVal, this.tableDatalist)
        excel.export_json_to_excel({
          header: ['隧道名称', '里程数', '里程占比'],
          data,
          filename: '隧道里程统计数据',
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
