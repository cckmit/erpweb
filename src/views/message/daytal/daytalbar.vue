<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/components/Charts/mixins/resize'

export default {
  name: 'DayMessCharts',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'dayTotalchart'
    },
    id: {
      type: String,
      default: 'dayTotalchart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '540px'
    },
    chartdata: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartdata: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.setOptions(this.chartdata)
    },
    setOptions({ allTotalNum, legendData, xAxisTime, serieslist, series } = {}) {
      this.chart.setOption({
        title: {
          text: '',
          subtext: '(总数：' + allTotalNum + ')',
          left: 'center',
          textStyle: {
            fontSize: 24,
            color: '#60a0a8'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '4%',
          containLabel: true
        },
        legend: {
          data: legendData,
          left: '6%',
          itemWidth: 12, // 图例图标的宽
          itemHeight: 12, // 图例图标
          formatter: function(name) {
            var target = 0
            for (var item of series) {
              if (item.name === name) {
                target = item.value
              }
            }
            return '{a|' + name + '}' + '   ' + '{b|' + target + '}'
          },
          textStyle: {
            rich: {
              a: {
                color: '#3a6186',
                fontSize: 14
              },
              b: {
                color: '#000',
                fontSize: 14
              }
            }
          }
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisTime,
            splitLine: { show: false }, // 去除网格分割线
            axisTick: {// 刻度
              show: false
            },
            axisLine: {// 坐标线
              lineStyle: {
                type: 'solid',
                color: '#e7e7e7', // 轴线的颜色
                width: '2'// 坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: '#3a6186'// 坐标值的具体的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {// 线
              show: false
            },
            axisTick: {// 刻度
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#3a6186'// 坐标值的具体的颜色
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#e7e7e7']// 分割线的颜色
              }
            }
          }
        ],
        series: serieslist
      }, true)
    }
  }
}
</script>
