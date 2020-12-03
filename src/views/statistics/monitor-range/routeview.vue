<template>
  <div>
    <div v-if="nodataFlag == 1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag == 2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <route-chart :devicechartdata="deviceChartData" />
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div>
            <el-button size="mini" style="float:right;" type="primary" icon="el-icon-upload" @click="exportData">
              导出excel
            </el-button>
          </div>
          <route-table :devicetabledata="tableDatalist" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import RouteChart from './components/chartpie'
import RouteTable from './components/routetable'
import { GetRoutes } from '@/api/iot-apis'

export default {
  name: 'MonitorRangeRoute',
  components: {
    RouteChart, RouteTable
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
    this.getRoutelist()
  },
  methods: {
    getRoutelist() {
      var obj = {
        limit: 0,
        skip: 0
      }
      GetRoutes(obj).then(res => {
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
        if (objdata[item.voltage] !== undefined) {
          objdata[item.voltage].push(item)
        } else {
          objdata[item.voltage] = []
          objdata[item.voltage].push(item)
        }
      }
      // charts
      const legendname = []
      const seriesData = []
      var zongnum = 0
      for (var v in objdata) {
        zongnum = zongnum + objdata[v].length
        var obj = {
          name: v + 'kv',
          value: objdata[v].length,
          routeslist: this.findRoute(objdata[v])
        }
        legendname.push(obj.name)
        seriesData.push(obj)
      }
      var title = {
        text: '电压等级统计',
        subtext: '线路电压',
        left: 'center'
      }
      const seriesName = '电压'
      this.deviceChartData = { title, legendname, seriesData, seriesName }
      // table
      this.tableDatalist = []
      for (var all of seriesData) {
        for (var route of all.routeslist) {
          var tableobj = {
            volage: all.name,
            routename: route.name,
            routepercent: Math.round(all.value / zongnum * 10000) / 100 + '%'
          }
          this.tableDatalist.push(tableobj)
        }
      }
    },
    findRoute(data) {
      var list = []
      for (var route of data) {
        var obj = {
          name: route.route_name
        }
        list.push(obj)
      }
      return list
    },
    exportData() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const filterVal = ['volage', 'routename', 'routepercent']
        const data = this.formatJson(filterVal, this.tableDatalist)
        excel.export_json_to_excel({
          header: ['电压', '线路名称', '电压等级占比'],
          data,
          filename: '线路电压等级统计数据',
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
