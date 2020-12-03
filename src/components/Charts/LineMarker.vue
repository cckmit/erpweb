<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { convertUTCLocalTime } from '@/utils/validate'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    chartObject: {
      type: Object,
      default: function() {
        return {}
      }
    }
    // chartdata: {
    //   type: Array,
    //   default: function() {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      chart: null

    }
  },
  computed: {
  },
  watch: {
    chartObject(val) {
      this.xList = val.x_axis
      this.yList = val.y_axis
      this.title = val.title
      if (val.unit === undefined) {
        this.unit = ''
      } else {
        this.unit = val.unit
      }
      this.initChart()
    }
  },
  mounted() {
    this.initChart()
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
      this.chart.setOption({
        // backgroundColor: '#394056',
        title: {
          top: 20,
          text: this.title + '变化',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#1890ff'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis'
          // axisPointer: {
          //   lineStyle: {
          //     color: '#57617B'
          //   }
          // }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: [this.title],
          right: '4%'
          // textStyle: {
          //   fontSize: 12,
          //   color: '#F1F1F3'
          // }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 2,
            formatter: function(value) {
              return value.substring(0, 8) + '\n' + value.substring(8, 20)
            }
            // rotate: 5
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: this.xList
        }],
        yAxis: [{
          type: 'value',
          name: '(' + this.unit + ')',
          splitNumber: 5,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: this.title,
          type: 'line',
          // smooth: true,
          symbol: 'star',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          // areaStyle: {
          //   normal: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //       offset: 0,
          //       color: '#1890ff'
          //     }, {
          //       offset: 0.8,
          //       color: 'rgba(137, 189, 27, 0)'
          //     }], false),
          //     shadowColor: 'rgba(0, 0, 0, 0.1)',
          //     shadowBlur: 10
          //   }
          // },
          itemStyle: {
            normal: {
              color: '#1890ff',
              // borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12

            }
          },
          data: this.yList
        }]
      })
    },
    changeTimeShow(val) {
      if (val === undefined) {
        return ''
      } else {
        var time = convertUTCLocalTime(val * 1000)
        return time
      }
    }
  }
}
</script>
