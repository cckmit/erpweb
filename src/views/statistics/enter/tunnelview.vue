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
import TunnelChart from './components/enterpie'
import TunnelTable from '../components/deviceTable'
import { GetAccessRecords } from '@/api/iot-apis'

export default {
  name: 'EnterTunnel',
  components: {
    TunnelChart, TunnelTable
  },
  props: {
    selecttime: {
      type: Array,
      required: true
    }
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
          label: '出入人数',
          propname: 'person_num'
        }, {
          label: '人数占比',
          propname: 'per_percent'
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
  destroyed() {
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
          'entertime': {
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
      GetAccessRecords(obj).then(res => {
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
        if (item.import_tunnel !== undefined) {
          if (objdata[item.import_tunnel] !== undefined) {
            objdata[item.import_tunnel].push(item.person_num)
          } else {
            objdata[item.import_tunnel] = []
            objdata[item.import_tunnel].push(item.person_num)
          }
        }
      }
      // chart
      const legendname = []
      const seriesData = []
      var zongnum = 0
      for (var tun in objdata) {
        var obj = {
          name: tun,
          value: this.findPersonSum(objdata[tun])
        }
        legendname.push(obj.name)
        seriesData.push(obj)
        zongnum = zongnum + obj.value
      }
      var title = {
        text: '隧道出入人数统计',
        subtext: '出入人数（个）',
        left: 'center'
      }
      this.deviceChartData = { title, legendname, seriesData }
      // table
      this.tableDatalist = []
      for (var t in objdata) {
        var tableObj = {
          tunnel_name: t,
          person_num: this.findPersonSum(objdata[t]),
          per_percent: Math.round(this.findPersonSum(objdata[t]) / zongnum * 10000) / 100 + '%'
        }
        this.tableDatalist.push(tableObj)
      }
    },
    findPersonSum(data) {
      var sum = 0
      for (var i of data) {
        sum += i
      }
      return sum
    },
    exportData() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const filterVal = ['tunnel_name', 'person_num', 'per_percent']
        const data = this.formatJson(filterVal, this.tableDatalist)
        excel.export_json_to_excel({
          header: ['隧道名称', '出入人数', '人数占比'],
          data,
          filename: '出入人数统计（按隧道）',
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
