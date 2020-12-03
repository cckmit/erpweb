<template>
  <div class="app-container">
    <span class="blue-vertical-bar">按日统计</span>
    <hr class="black-line">
    <div class="filter-container" style="margin-left:10px;">
      <span class="filter-item" style="font-size:15px;color:#303133;">日期：</span>
      <el-date-picker
        v-model="time"
        type="date"
        value-format="timestamp"
        :clearable="false"
        format="yyyy-MM-dd"
        class="filter-item"
        placeholder="选择日"
      />
      <el-button class="filter-item" type="primary" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <el-card>
          <div class="echart-title">按日统计</div>
          <div v-if="nodataflag === 1" class="nodataStatis">
            暂无数据
          </div>
          <div v-if="nodataflag === 2">
            <message-chart :id="'myChart'" :chartdata="chartDataObect" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
    </el-row>
  </div>
</template>
<script>

import MessageChart from './daytalbar'
import { Aggregate } from '@/api/iot-apis'

export default {
  name: 'Daytalist',
  components: { MessageChart },
  data() {
    return {
      time: new Date().getTime(),
      chartDataObect: {
        legendData: [],
        xAxisTime: [],
        seriesData: []
      },
      nodataflag: 0
    }
  },
  mounted() {
    var currentStart = new Date(new Date().toLocaleDateString()).getTime() / 1000
    var currentEnd = parseInt((new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1) / 1000)
    this.drawBar(currentStart, currentEnd)
  },
  methods: {
    handleFilter() {
      if (this.time !== null) {
        var start = this.time / 1000
        var end = start + 24 * 60 * 60
        this.drawBar(start, end)
      }
    },
    drawBar(start, end) {
      var obj = {
        collection: 'out_box',
        pipeline: [
          {
            '$match': {
              'sendtime': { '$gte': start, '$lte': end }
            }
          },
          {
            '$project': {
              '_id': 1,
              'operator': '$operator',
              'date': {
                '$dateToString': {
                  'format': '%H:00',
                  'date': {
                    '$toDate': { '$add': [0, 28800000, { '$multiply': ['$sendtime', 1000] }] }
                  }
                }
              }
            }
          },
          {
            '$group': { '_id': { 'operator': '$operator', 'date': '$date' },
              'count': { '$sum': 1 }
            }
          },
          {
            '$sort': {
              '_id.date': 1
            }
          },
          {
            '$group': {
              '_id': '$_id.operator',
              'series': {
                '$push': {
                  'date': '$_id.date',
                  'count': '$count'
                }
              }
            }
          },
          {
            '$project': {
              '_id': 0,
              'operator': '$_id',
              'series': 1
            }
          }
        ]
      }
      Aggregate(obj).then(
        res => {
          if (res.length !== 0) {
            this.nodataflag = 2
            this.initData(res)
          } else {
            this.nodataflag = 1
          }
        }
      )
    },
    initData(data) {
      var series = this.getTotalcount(data)
      var allTotalNum = 0
      for (var count of series) {
        allTotalNum += count.value
      }
      var xAxisTime = []
      for (var t = 0; t < 24; t++) {
        var timeString = ''
        if (t < 10) {
          timeString = '0' + t + ':00'
        } else {
          timeString = t + ':00'
        }
        xAxisTime.push(timeString)
      }
      // var legendData = []
      const legendData = ['联通', '移动', '电信', '其他']
      var seriesData = []
      var seriesL = []
      var seriesY = []
      var seriesD = []
      var seriesO = []
      for (var i = 0; i < data.length; i++) {
        // legendData.push(data[i].operator)
        // seriesData.push(this.getSeries(data[i].operator, data[i].series))
        if (data[i].operator === '联通') {
          for (var l of data[i].series) {
            seriesL.push([l.date, l.count])
          }
          continue
        }
        if (data[i].operator === '移动') {
          for (var y of data[i].series) {
            seriesY.push([y.date, y.count])
          }
          continue
        }
        if (data[i].operator === '电信') {
          for (var d of data[i].series) {
            seriesD.push([d.date, d.count])
          }
          continue
        }
        if (!(data[i].operator === '联通' && data[i].operator === '联通' && data[i].operator === '联通')) {
          for (var O of data[i].series) {
            seriesO.push([O.date, O.count])
          }
          continue
        }
      }
      var seriesObjL = {
        name: '联通',
        type: 'bar',
        stack: '总量',
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'insideTop',
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          }
        },
        data: seriesL
      }
      var seriesObjY = {
        name: '移动',
        type: 'bar',
        stack: '总量',
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'insideTop',
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          }
        },
        data: seriesY
      }
      var seriesObjD = {
        name: '电信',
        type: 'bar',
        stack: '总量',
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'insideTop',
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          }
        },
        data: seriesD
      }
      var seriesObjO = {
        name: '其他',
        type: 'bar',
        stack: '总量',
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'insideTop',
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          }
        },
        data: seriesO
      }
      seriesData.push(seriesObjL, seriesObjY, seriesObjD, seriesObjO)
      var TotalNum = [{
        name: '总和',
        type: 'bar',
        barGap: '-100%',
        zlevel: -1,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#494b4e',
                fontSize: 16
              },
              formatter: function(params) {
                if (params.value[1] > 0) {
                  return params.value[1]
                } else {
                  return ''
                }
              }
            }
          }
        },
        data: this.getTotalNum(xAxisTime, data)
      }]
      var serieslist = seriesData.concat(TotalNum)
      this.chartDataObect = { allTotalNum, legendData, xAxisTime, serieslist, series }
    },
    getTotalcount(data) {
      var list = []
      for (var item of data) {
        var obj = {
          name: item.operator,
          value: this.findOpercount(item.series)
        }
        list.push(obj)
      }
      return list
    },
    findOpercount(data) {
      var sum = 0
      for (var item of data) {
        sum += item.count
      }
      return sum
    },
    getSeries(operator, data) {
      var list = []
      for (var item of data) {
        list.push([item.date, item.count])
      }
      var obj = {
        name: operator,
        type: 'bar',
        stack: '总量',
        itemStyle: {
          normal: {
            label: {
              show: false, // 柱子上显示值
              position: 'insideTop', // 值在柱子上方显示
              textStyle: {
                color: '#fff', // 值的颜色
                fontSize: 12
              }
            }
          }
        },
        data: list
      }
      return obj
    },
    getTotalNum(time, data) {
      var list = []
      for (var i = 0; i < time.length; i++) {
        var sum = 0
        for (var m of data) {
          for (var j = 0; j < m.series.length; j++) {
            if (time[i] === m.series[j].date) {
              sum += m.series[j].count
            }
          }
        }
        list.push([time[i], sum])
      }
      return list
    }
  }
}
</script>
<style lang="scss" scoped>
      </style>
