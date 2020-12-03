<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/components/Charts/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'BreakBar'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    },
    devicechartdata: {
      type: Object,
      required: true,
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
    devicechartdata: {
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.devicechartdata)
    },
    setOptions({ x_axis, seriesData } = {}) {
      this.chart.setOption({
        title: {
          text: '隧道故障统计',
          subtext: '',
          left: 'center'
        },
        toolbox: {
          show: true,
          right: 23,
          iconStyle: {
            color: '#1890ff',
            borderColor: '#1890ff'
          },
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          data: x_axis,
          type: 'category',
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '故障数',
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            label: {
              show: true,
              position: 'top',
              color: '#666',
              fontSize: 14
            },
            barWidth: '35%',
            data: seriesData,
            color: ['#2989e2'],
            animationDuration: 2800
          }
        ]
      })
    }
  }
}
</script>
