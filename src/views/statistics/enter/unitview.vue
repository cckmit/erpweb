<template>
  <div>
    <div v-if="nodataFlag == 1" class="nodataStatis">
      暂无数据
    </div>
    <div v-if="nodataFlag == 2">
      <el-row>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div style="margin-top:40px;">
            <unit-chart :devicechartdata="deviceChartData" />
          </div>
        </el-col>
        <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div>
            <el-button size="mini" style="float:right;" type="primary" icon="el-icon-upload" @click="exportData">
              导出excel
            </el-button>
          </div>
          <unit-table :devicetabledata="tableDatalist" :alltablelabel="allTableLabel" />
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import UnitChart from './components/enterpie'
import UnitTable from '../components/deviceTable'
import { GetAccessRecords } from '@/api/iot-apis'

export default {
  name: 'EnterUnit',
  components: {
    UnitChart, UnitTable
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
          label: '单位名称',
          propname: 'unit_name'
        }, {
          label: '出入次数',
          propname: 'enter_num'
        }, {
          label: '次数占比',
          propname: 'ci_percent'
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
        if (item.unit !== undefined) {
          if (objdata[item.unit] !== undefined) {
            objdata[item.unit]++
          } else {
            objdata[item.unit] = 1
          }
        }
      }
      // chart
      const legendname = []
      const seriesData = []
      var zongnum = 0
      for (var unit in objdata) {
        var obj = {
          name: unit,
          value: objdata[unit]
        }
        legendname.push(obj.name)
        seriesData.push(obj)
        zongnum = zongnum + obj.value
      }
      var title = {
        text: '单位出入次数统计',
        subtext: '出入次数（次）',
        left: 'center'
      }
      this.deviceChartData = { title, legendname, seriesData }
      // table
      this.tableDatalist = []
      for (var t in objdata) {
        var tableObj = {
          unit_name: t,
          enter_num: objdata[t],
          ci_percent: Math.round(objdata[t] / zongnum * 10000) / 100 + '%'
        }
        this.tableDatalist.push(tableObj)
      }
    },
    exportData() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const filterVal = ['unit_name', 'enter_num', 'ci_percent']
        const data = this.formatJson(filterVal, this.tableDatalist)
        excel.export_json_to_excel({
          header: ['单位名称', '出入次数', '次数占比'],
          data,
          filename: '出入次数统计(按单位)',
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
